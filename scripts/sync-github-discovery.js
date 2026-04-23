#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT_DIR, "data", "ai-skills-links.json");
const CONFIG_FILE = path.join(ROOT_DIR, "data", "discovery-config.json");
const GITHUB_API_BASE = "https://api.github.com";
const SEARCH_RESULTS_PER_PAGE = 100;
const SEARCH_RESULT_CAP = 1000;
const CATEGORY_ORDER = [
  "official_collections",
  "specialized_skill_libraries",
  "discovery_hubs",
  "ecosystem_standards",
  "management_tools",
  "topic_pages",
];
const OFFICIAL_OWNERS = new Set([
  "anthropics",
  "openai",
  "vercel-labs",
  "github",
  "huggingface",
  "microsoft",
  "trailofbits",
  "VapiAI",
  "block",
]);

function getToday() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date());
}

function parseArgs(argv) {
  const options = {
    maxPages: null,
    dryRun: false,
    queryIds: null,
    help: false,
  };

  for (const argument of argv) {
    if (argument === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (argument === "--help" || argument === "-h") {
      options.help = true;
      continue;
    }

    if (argument.startsWith("--max-pages=")) {
      const value = Number.parseInt(argument.slice("--max-pages=".length), 10);
      if (Number.isNaN(value) || value < 1) {
        throw new Error(`Invalid --max-pages value: ${argument}`);
      }

      options.maxPages = value;
      continue;
    }

    if (argument.startsWith("--query=")) {
      options.queryIds = argument
        .slice("--query=".length)
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);
      continue;
    }

    throw new Error(`Unsupported argument: ${argument}`);
  }

  return options;
}

function printHelp() {
  console.log(`
Usage:
  node scripts/sync-github-discovery.js [--max-pages=N] [--query=id1,id2] [--dry-run]

Options:
  --max-pages=N    Override the per-query page limit from discovery-config.json
  --query=...      Only run a subset of discovery query ids
  --dry-run        Print the sync summary without writing data/ai-skills-links.json
  --help           Show this help text
`.trim());
}

function compactObject(value) {
  if (Array.isArray(value)) {
    return value.map(compactObject);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => {
      if (entryValue === null || entryValue === undefined) {
        return false;
      }

      if (typeof entryValue === "string" && entryValue.length === 0) {
        return false;
      }

      if (Array.isArray(entryValue) && entryValue.length === 0) {
        return false;
      }

      return true;
    }),
  );
}

function parseRepoUrl(url) {
  const match = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)\/?$/.exec(url || "");
  if (!match) {
    return null;
  }

  return {
    owner: match[1],
    repo: match[2],
    fullName: `${match[1]}/${match[2]}`,
  };
}

function buildHeaders() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ai-skills-github-index-discovery",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function searchRepositories(queryDefinition, page) {
  const url = new URL(`${GITHUB_API_BASE}/search/repositories`);
  url.searchParams.set("q", queryDefinition.query);
  url.searchParams.set("per_page", String(SEARCH_RESULTS_PER_PAGE));
  url.searchParams.set("page", String(page));

  if (queryDefinition.sort) {
    url.searchParams.set("sort", queryDefinition.sort);
  }

  if (queryDefinition.order) {
    url.searchParams.set("order", queryDefinition.order);
  }

  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }

  return response.json();
}

function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function normalizeText(...values) {
  return values
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function inferCompatibleAgents(repository, queryIds) {
  const text = normalizeText(
    repository.full_name,
    repository.name,
    repository.description,
    ...(queryIds || []),
  );
  const agents = [];

  if (/claude/.test(text)) {
    agents.push("Claude Code");
  }

  if (/codex|openai/.test(text)) {
    agents.push("Codex");
  }

  if (/copilot/.test(text)) {
    agents.push("GitHub Copilot");
  }

  if (/gemini/.test(text)) {
    agents.push("Gemini CLI");
  }

  if (/cursor/.test(text)) {
    agents.push("Cursor");
  }

  if (/openclaw/.test(text)) {
    agents.push("OpenClaw");
  }

  if (/opencode/.test(text)) {
    agents.push("OpenCode");
  }

  if (/goose/.test(text)) {
    agents.push("Goose");
  }

  if (agents.length === 0) {
    if (queryIds.some((queryId) => queryId.includes("copilot"))) {
      agents.push("GitHub Copilot");
    } else if (queryIds.some((queryId) => queryId.includes("codex"))) {
      agents.push("Codex");
    } else if (queryIds.some((queryId) => queryId.includes("claude"))) {
      agents.push("Claude Code");
    } else {
      agents.push("Other compatible agents");
    }
  }

  return uniqueValues(agents);
}

function isRelevantRepository(repository, queryDefinition) {
  const text = normalizeText(repository.full_name, repository.name, repository.description);

  if (queryDefinition?.id?.startsWith("topic-")) {
    return true;
  }

  return /\b(skill|skills|skillset|skillshare|skillfile|claude|codex|copilot|openclaw|opencode|mcp|plugin|plugins|agent skills|claude code|copilot cli)\b/.test(
    text,
  );
}

function inferCategory(repository, queryDefinition) {
  const owner = repository.owner?.login || "";
  const text = normalizeText(repository.full_name, repository.name, repository.description);

  if (OFFICIAL_OWNERS.has(owner)) {
    return "official_collections";
  }

  if (repository.full_name === "agentskills/agentskills" || /specification|documentation for agent skills|standard/.test(text)) {
    return "ecosystem_standards";
  }

  if (/awesome|curated|directory|catalog|hub|marketplace|registry|list of/.test(text)) {
    return "discovery_hubs";
  }

  if (/manager|manage|sync|scanner|toolkit|builder|cli|extension|installer|install and manage|desktop application/.test(text)) {
    return "management_tools";
  }

  if (queryDefinition?.default_category) {
    return queryDefinition.default_category;
  }

  return "specialized_skill_libraries";
}

function inferInstallable(repository, category) {
  const text = normalizeText(repository.full_name, repository.name, repository.description);

  if (category === "ecosystem_standards") {
    return false;
  }

  if (/awesome|directory|catalog|hub|list of/.test(text)) {
    return /installable|installer|template|marketplace|registry/.test(text);
  }

  return true;
}

function buildNotes(repository, queryDefinition, existingItem) {
  if (existingItem?.notes) {
    return existingItem.notes;
  }

  if (repository.description) {
    return repository.description;
  }

  if (queryDefinition?.description) {
    return `Discovered automatically from GitHub search: ${queryDefinition.description}`;
  }

  return "Discovered automatically from GitHub search.";
}

function categoryWeight(category) {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

function sortItems(items) {
  return [...items].sort((left, right) => {
    const categoryDelta = categoryWeight(left.category) - categoryWeight(right.category);
    if (categoryDelta !== 0) {
      return categoryDelta;
    }

    const leftStars = typeof left.stars === "number" ? left.stars : -1;
    const rightStars = typeof right.stars === "number" ? right.stars : -1;
    if (leftStars !== rightStars) {
      return rightStars - leftStars;
    }

    return left.name.localeCompare(right.name);
  });
}

function buildItem(existingItem, repository, queryDefinition, discoveredFrom) {
  const today = getToday();
  const category = existingItem?.category || inferCategory(repository, queryDefinition);
  const compatibleAgents =
    existingItem?.compatible_agents || inferCompatibleAgents(repository, discoveredFrom);
  const installable =
    typeof existingItem?.installable === "boolean"
      ? existingItem.installable
      : inferInstallable(repository, category);

  return compactObject({
    ...existingItem,
    name: existingItem?.name || repository.full_name,
    category,
    kind: "github_repo",
    url: repository.html_url,
    repo_full_name: repository.full_name,
    compatible_agents: compatibleAgents,
    installable,
    notes: buildNotes(repository, queryDefinition, existingItem),
    description: repository.description || existingItem?.description,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    open_issues: repository.open_issues_count,
    watchers: repository.watchers_count,
    license: repository.license ? repository.license.spdx_id || repository.license.name : existingItem?.license || "NOASSERTION",
    archived: repository.archived,
    default_branch: repository.default_branch,
    visibility: repository.visibility,
    created_at: repository.created_at,
    updated_at: repository.updated_at,
    pushed_at: repository.pushed_at,
    last_checked: today,
    source: existingItem?.source || (existingItem ? "manual" : "github_search"),
    discovered_from: uniqueValues(discoveredFrom),
  });
}

async function main() {
  const today = getToday();
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const [dataRaw, configRaw] = await Promise.all([
    fs.readFile(DATA_FILE, "utf8"),
    fs.readFile(CONFIG_FILE, "utf8"),
  ]);
  const data = JSON.parse(dataRaw);
  const config = JSON.parse(configRaw);

  const queryDefinitions = (config.queries || []).filter((queryDefinition) => {
    if (!options.queryIds) {
      return true;
    }

    return options.queryIds.includes(queryDefinition.id);
  });

  if (queryDefinitions.length === 0) {
    throw new Error("No discovery queries matched the current options.");
  }

  const existingRepoItems = data.items.filter((item) => item.kind === "github_repo");
  const passthroughItems = data.items.filter((item) => item.kind !== "github_repo");
  const repoMap = new Map();
  const previousRepoMap = new Map();

  for (const item of existingRepoItems) {
    const fullName = item.repo_full_name || parseRepoUrl(item.url)?.fullName || item.name;
    previousRepoMap.set(fullName, { ...item });
  }

  for (const item of existingRepoItems.filter((entry) => entry.source !== "github_search")) {
    const fullName = item.repo_full_name || parseRepoUrl(item.url)?.fullName || item.name;
    repoMap.set(fullName, {
      ...item,
      source: item.source || "manual",
    });
  }

  let addedCount = 0;
  let updatedCount = 0;

  for (const queryDefinition of queryDefinitions) {
    const maxPages = options.maxPages || queryDefinition.max_pages || 1;
    console.log(`Running ${queryDefinition.id}: ${queryDefinition.query}`);

    for (let page = 1; page <= maxPages; page += 1) {
      const searchResult = await searchRepositories(queryDefinition, page);
      const repositories = searchResult.items || [];

      if (repositories.length === 0) {
        break;
      }

      for (const repository of repositories) {
        if (!isRelevantRepository(repository, queryDefinition)) {
          continue;
        }

        const fullName = repository.full_name;
        const existingItem = repoMap.get(fullName) || previousRepoMap.get(fullName);
        const discoveredFrom = [
          ...(existingItem?.discovered_from || []),
          queryDefinition.id,
        ];
        const nextItem = buildItem(existingItem, repository, queryDefinition, discoveredFrom);

        if (existingItem) {
          updatedCount += 1;
        } else {
          addedCount += 1;
        }

        repoMap.set(fullName, nextItem);
      }

      console.log(`  page ${page}: ${repositories.length} repositories`);

      if (repositories.length < SEARCH_RESULTS_PER_PAGE) {
        break;
      }

      const visibleResultCount = Math.min(searchResult.total_count || 0, SEARCH_RESULT_CAP);
      if (page * SEARCH_RESULTS_PER_PAGE >= visibleResultCount) {
        break;
      }
    }
  }

  const output = {
    updated_at: today,
    description: data.description,
    refresh_command: "node scripts/refresh-all.js",
    discovery_command: "node scripts/sync-github-discovery.js",
    discovery_sources: queryDefinitions.map((queryDefinition) => ({
      id: queryDefinition.id,
      description: queryDefinition.description,
      query: queryDefinition.query,
      max_pages: options.maxPages || queryDefinition.max_pages || 1,
    })),
    items: sortItems([...repoMap.values(), ...passthroughItems]),
  };

  console.log(
    `Discovery summary: ${output.items.length} total items, ${addedCount} added, ${updatedCount} refreshed from search queries.`,
  );

  if (options.dryRun) {
    return;
  }

  await fs.writeFile(`${DATA_FILE}.tmp`, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await fs.rename(`${DATA_FILE}.tmp`, DATA_FILE);
  console.log(`Wrote ${DATA_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT_DIR, "data", "ai-skills-links.json");
const TODAY = new Date().toISOString().slice(0, 10);
const GITHUB_API_BASE = "https://api.github.com";

function parseRepoUrl(url) {
  const match = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)\/?$/.exec(url);
  if (!match) {
    return null;
  }

  return {
    owner: match[1],
    repo: match[2],
    fullName: `${match[1]}/${match[2]}`,
  };
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

      return true;
    }),
  );
}

async function fetchRepoMetadata(fullName) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ai-skills-github-index-updater",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}/repos/${fullName}`, {
    headers,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }

  return response.json();
}

function buildRepoItem(existingItem, repoData) {
  return compactObject({
    name: existingItem.name,
    category: existingItem.category,
    kind: existingItem.kind,
    url: existingItem.url,
    repo_full_name: repoData.full_name,
    compatible_agents: existingItem.compatible_agents,
    installable: existingItem.installable,
    notes: existingItem.notes,
    description: repoData.description || existingItem.description,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    open_issues: repoData.open_issues_count,
    watchers: repoData.subscribers_count,
    license: repoData.license ? repoData.license.spdx_id || repoData.license.name : "NOASSERTION",
    archived: repoData.archived,
    default_branch: repoData.default_branch,
    visibility: repoData.visibility,
    created_at: repoData.created_at,
    updated_at: repoData.updated_at,
    pushed_at: repoData.pushed_at,
    last_checked: TODAY,
  });
}

function buildPassthroughItem(existingItem) {
  return compactObject({
    ...existingItem,
    last_checked: existingItem.last_checked || TODAY,
  });
}

async function main() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const data = JSON.parse(raw);

  const updatedItems = [];

  for (const item of data.items) {
    if (item.kind !== "github_repo") {
      updatedItems.push(buildPassthroughItem(item));
      continue;
    }

    const parsed = parseRepoUrl(item.url);
    if (!parsed) {
      updatedItems.push(
        compactObject({
          ...item,
          last_checked: TODAY,
          check_error: "Unsupported GitHub repository URL format",
        }),
      );
      continue;
    }

    try {
      const repoData = await fetchRepoMetadata(parsed.fullName);
      updatedItems.push(buildRepoItem(item, repoData));
      console.log(`Updated ${parsed.fullName}`);
    } catch (error) {
      updatedItems.push(
        compactObject({
          ...item,
          last_checked: TODAY,
          check_error: error.message,
        }),
      );
      console.warn(`Failed ${parsed.fullName}: ${error.message}`);
    }
  }

  const output = {
    updated_at: TODAY,
    description: data.description,
    refresh_command: "node scripts/update-github-metadata.js",
    items: updatedItems,
  };

  await fs.writeFile(`${DATA_FILE}.tmp`, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await fs.rename(`${DATA_FILE}.tmp`, DATA_FILE);
  console.log(`Wrote ${DATA_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

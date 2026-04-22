#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT_DIR, "data", "ai-skills-links.json");
const CURATION_FILE = path.join(ROOT_DIR, "data", "skill-curation.json");
const OUTPUT_FILE = path.join(ROOT_DIR, "docs", "skill-views.md");

function formatNumber(value) {
  if (typeof value !== "number") {
    return "-";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

function repoLink(item) {
  return `[${item.name}](${item.url})`;
}

function categoryLabel(item) {
  return item.category.replace(/_/g, " ");
}

function renderTable(headers, rows) {
  const headerLine = `| ${headers.join(" | ")} |`;
  const separatorLine = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return [headerLine, separatorLine, body].join("\n");
}

async function main() {
  const [dataRaw, curationRaw] = await Promise.all([
    fs.readFile(DATA_FILE, "utf8"),
    fs.readFile(CURATION_FILE, "utf8"),
  ]);

  const data = JSON.parse(dataRaw);
  const curation = JSON.parse(curationRaw);
  const itemMap = new Map(data.items.map((item) => [item.name, item]));

  const installableItems = data.items
    .filter((item) => item.kind === "github_repo" && item.installable)
    .sort((a, b) => (b.stars || 0) - (a.stars || 0) || a.name.localeCompare(b.name));

  const chineseRows = curation.chinese_priority
    .map((entry) => {
      const item = itemMap.get(entry.name);
      if (!item) {
        return null;
      }

      return [
        repoLink(item),
        item.compatible_agents.join(", "),
        formatNumber(item.stars),
        entry.why,
      ];
    })
    .filter(Boolean);

  const installableRows = installableItems.map((item) => [
    repoLink(item),
    formatNumber(item.stars),
    categoryLabel(item),
    item.notes || item.description || "-",
  ]);

  const domainSections = curation.domain_views
    .map((domain) => {
      const rows = domain.repos
        .map((name) => itemMap.get(name))
        .filter(Boolean)
        .map((item) => [
          repoLink(item),
          formatNumber(item.stars),
          item.compatible_agents.join(", "),
          item.notes || item.description || "-",
        ]);

      if (rows.length === 0) {
        return "";
      }

      return [
        `## ${domain.title}`,
        "",
        domain.description,
        "",
        renderTable(["仓库", "Stars", "适配", "备注"], rows),
      ].join("\n");
    })
    .filter(Boolean);

  const output = [
    "# Skills 快速视图",
    "",
    `更新时间：${data.updated_at}`,
    "",
    `当前索引共 \`${data.items.length}\` 个条目，其中可直接安装的 GitHub 仓库约 \`${installableItems.length}\` 个。`,
    "",
    "这页是从主数据集里再切出来的 3 个实用视角：",
    "",
    "- 中文优先",
    "- 可直接安装",
    "- 垂直领域",
    "",
    "## 中文优先",
    "",
    renderTable(["仓库", "适配", "Stars", "为什么先看"], chineseRows),
    "",
    "## 可直接安装",
    "",
    renderTable(["仓库", "Stars", "分类", "备注"], installableRows),
    "",
    ...domainSections.flatMap((section) => [section, ""]),
  ].join("\n");

  await fs.writeFile(OUTPUT_FILE, `${output.trim()}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

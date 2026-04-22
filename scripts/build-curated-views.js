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
  const labels = {
    official_collections: "官方技能仓库",
    specialized_skill_libraries: "专业领域技能库",
    discovery_hubs: "聚合目录 / 发现型仓库",
    ecosystem_standards: "标准 / 规范",
    management_tools: "管理工具 / 构建器",
    topic_pages: "GitHub Topics 入口页",
  };

  return labels[item.category] || item.category.replace(/_/g, " ");
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
    "这是主索引之外的一份筛选型文档，用来帮助你更快地定位值得优先查看的 skills 仓库与目录。",
    "",
    `当前索引共 \`${data.items.length}\` 个条目，其中可直接安装的 GitHub 仓库约 \`${installableItems.length}\` 个。`,
    "",
    "## 视图概览",
    "",
    renderTable(
      ["维度", "当前情况"],
      [
        ["总条目数", `\`${data.items.length}\``],
        ["可直接安装仓库", `\`${installableItems.length}\``],
        ["中文优先视图", `\`${curation.chinese_priority.length}\` 个重点仓库`],
        ["垂直领域视图", `\`${curation.domain_views.length}\` 个专题分组`],
      ],
    ),
    "",
    "## 使用建议",
    "",
    "| 你现在想做什么 | 建议先看哪里 |",
    "| --- | --- |",
    "| 找中文社区常用资源 | `中文优先` |",
    "| 找能直接安装的 skills | `可直接安装` |",
    "| 按方向找仓库 | `垂直领域` 下的专题分组 |",
    "| 做二次加工或自动化 | 回到 `data/ai-skills-links.json` |",
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

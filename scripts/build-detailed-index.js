#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT_DIR, "data", "ai-skills-links.json");
const OUTPUT_FILE = path.join(ROOT_DIR, "docs", "ai-skills-github-index.md");
const CATEGORY_ORDER = [
  "official_collections",
  "specialized_skill_libraries",
  "discovery_hubs",
  "ecosystem_standards",
  "management_tools",
  "topic_pages",
];
const CATEGORY_LABELS = {
  official_collections: "官方与高质量原生仓库",
  specialized_skill_libraries: "专业领域技能库",
  discovery_hubs: "聚合与发现型仓库",
  ecosystem_standards: "标准与规范",
  management_tools: "管理工具与构建器",
  topic_pages: "GitHub Topics 入口",
};

function formatNumber(value) {
  if (typeof value !== "number") {
    return "-";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

function repoLink(item) {
  return `[${item.name}](${item.url})`;
}

function renderTable(headers, rows) {
  const headerLine = `| ${headers.join(" | ")} |`;
  const separatorLine = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return [headerLine, separatorLine, body].join("\n");
}

function sortByStars(items) {
  return [...items].sort((left, right) => {
    const leftStars = typeof left.stars === "number" ? left.stars : -1;
    const rightStars = typeof right.stars === "number" ? right.stars : -1;
    if (leftStars !== rightStars) {
      return rightStars - leftStars;
    }

    return left.name.localeCompare(right.name);
  });
}

function yesNo(value) {
  return value ? "是" : "否";
}

function categoryRows(items) {
  return sortByStars(items).map((item) => [
    repoLink(item),
    (item.compatible_agents || []).join(", ") || "-",
    yesNo(Boolean(item.installable)),
    item.notes || item.description || "-",
    `\`${formatNumber(item.stars)}\``,
  ]);
}

function topRowsForAgent(items, agentName, limit) {
  return sortByStars(
    items.filter((item) => (item.compatible_agents || []).includes(agentName)),
  )
    .slice(0, limit)
    .map((item) => [
      repoLink(item),
      CATEGORY_LABELS[item.category] || item.category,
      item.notes || item.description || "-",
      `\`${formatNumber(item.stars)}\``,
    ]);
}

async function main() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const data = JSON.parse(raw);

  const items = data.items || [];
  const repoItems = items.filter((item) => item.kind === "github_repo");
  const topicItems = items.filter((item) => item.kind === "github_topic");
  const installableCount = repoItems.filter((item) => item.installable).length;

  const counts = Object.fromEntries(
    CATEGORY_ORDER.map((category) => [
      category,
      items.filter((item) => item.category === category).length,
    ]),
  );

  const officialItems = repoItems.filter((item) => item.category === "official_collections");
  const specializedItems = repoItems.filter(
    (item) => item.category === "specialized_skill_libraries",
  );
  const discoveryItems = repoItems.filter((item) => item.category === "discovery_hubs");
  const standardsItems = repoItems.filter((item) => item.category === "ecosystem_standards");
  const managementItems = repoItems.filter((item) => item.category === "management_tools");

  const topRecommended = sortByStars(repoItems)
    .slice(0, 12)
    .map((item, index) => [
      String(index + 1),
      repoLink(item),
      CATEGORY_LABELS[item.category] || item.category,
      `\`${formatNumber(item.stars)}\``,
    ]);

  const sections = [
    "# AI Skills GitHub 详细索引",
    "",
    `更新时间：${data.updated_at}`,
    "",
    "这是仓库的完整目录页，适合系统浏览整个 AI skills 生态，也适合在首页之外按分类继续深挖。",
    "",
    `当前索引共 \`${items.length}\` 个条目，其中 GitHub 仓库 \`${repoItems.length}\` 个，GitHub Topics 入口 \`${topicItems.length}\` 个，可直接安装的仓库约 \`${installableCount}\` 个。`,
    "",
    "## 文档导航",
    "",
    renderTable(
      ["入口", "用途"],
      [
        ["[仓库首页](../README.md)", "查看项目概览、核心入口与快速开始"],
        ["[快速视图](skill-views.md)", "按中文优先、可直接安装、垂直领域快速筛选"],
        ["[JSON 数据](../data/ai-skills-links.json)", "读取结构化数据做二次加工"],
      ],
    ),
    "",
    "## 索引概览",
    "",
    renderTable(
      ["指标", "当前情况"],
      [
        ["总条目数", `\`${items.length}\``],
        ["GitHub 仓库", `\`${repoItems.length}\``],
        ["可直接安装仓库", `\`${installableCount}\``],
        ["官方与高质量原生仓库", `\`${counts.official_collections}\``],
        ["专业领域技能库", `\`${counts.specialized_skill_libraries}\``],
        ["聚合与发现型仓库", `\`${counts.discovery_hubs}\``],
        ["标准与规范", `\`${counts.ecosystem_standards}\``],
        ["管理工具与构建器", `\`${counts.management_tools}\``],
        ["GitHub Topics 入口", `\`${counts.topic_pages}\``],
      ],
    ),
    "",
    "## 快速定位",
    "",
    renderTable(
      ["你现在想做什么", "建议先看哪里"],
      [
        ["先按 Agent 找入口", "`按 Agent 速查`"],
        ["先看官方与原生仓库", "`官方与高质量原生仓库`"],
        ["找具体领域的可用 skills", "`专业领域技能库`"],
        ["找大型聚合目录和市场", "`聚合与发现型仓库`"],
        ["找同步、安装、规范和管理工具", "`标准与规范`、`管理工具与构建器`"],
      ],
    ),
    "",
    "## 1. 按 Agent 速查",
    "",
    "### Codex",
    "",
    renderTable(["仓库", "分类", "说明", "Stars"], topRowsForAgent(repoItems, "Codex", 12)),
    "",
    "### Claude Code",
    "",
    renderTable(
      ["仓库", "分类", "说明", "Stars"],
      topRowsForAgent(repoItems, "Claude Code", 12),
    ),
    "",
    "### GitHub Copilot",
    "",
    renderTable(
      ["仓库", "分类", "说明", "Stars"],
      topRowsForAgent(repoItems, "GitHub Copilot", 10),
    ),
    "",
    "## 2. 官方与高质量原生仓库",
    "",
    renderTable(["仓库", "适配", "可安装", "说明", "Stars"], categoryRows(officialItems)),
    "",
    "## 3. 专业领域技能库",
    "",
    renderTable(["仓库", "适配", "可安装", "说明", "Stars"], categoryRows(specializedItems)),
    "",
    "## 4. 聚合与发现型仓库",
    "",
    renderTable(["仓库", "适配", "可安装", "说明", "Stars"], categoryRows(discoveryItems)),
    "",
    "## 5. 标准与规范",
    "",
    renderTable(["仓库", "适配", "可安装", "说明", "Stars"], categoryRows(standardsItems)),
    "",
    "## 6. 管理工具与构建器",
    "",
    renderTable(["仓库", "适配", "可安装", "说明", "Stars"], categoryRows(managementItems)),
    "",
    "## 7. GitHub Topics 入口",
    "",
    renderTable(
      ["入口", "说明"],
      topicItems.map((item) => [repoLink(item), item.notes || "-"]),
    ),
    "",
    "## 8. 当前星标最高的 12 个入口",
    "",
    renderTable(["排名", "仓库", "分类", "Stars"], topRecommended),
    "",
  ];

  await fs.writeFile(OUTPUT_FILE, `${sections.join("\n").trim()}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

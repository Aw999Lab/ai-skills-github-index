#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT_DIR, "data", "ai-skills-links.json");
const README_FILE = path.join(ROOT_DIR, "README.md");

function replaceTableValue(content, label, value) {
  const pattern = new RegExp(`(\\| ${escapeRegExp(label)} \\| )\\\`[^\\\`]+\\\`( \\|)`);
  return content.replace(pattern, `$1\`${value}\`$2`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  const [dataRaw, readmeRaw] = await Promise.all([
    fs.readFile(DATA_FILE, "utf8"),
    fs.readFile(README_FILE, "utf8"),
  ]);
  const data = JSON.parse(dataRaw);
  const repoItems = data.items.filter((item) => item.kind === "github_repo");
  const counts = data.items.reduce((accumulator, item) => {
    accumulator[item.category] = (accumulator[item.category] || 0) + 1;
    return accumulator;
  }, {});
  const installableCount = repoItems.filter((item) => item.installable).length;
  const updatedAt = data.updated_at;
  const encodedDate = updatedAt.replace(/-/g, "--");

  let nextContent = readmeRaw;
  nextContent = nextContent.replace(
    /github-links%20\d+-111827/g,
    `github-links%20${data.items.length}-111827`,
  );
  nextContent = nextContent.replace(
    /updated-\d{4}--\d{2}--\d{2}-f59e0b/g,
    `updated-${encodedDate}-f59e0b`,
  );
  nextContent = nextContent.replace(/更新时间：\d{4}-\d{2}-\d{2}/, `更新时间：${updatedAt}`);

  const replacements = {
    条目总数: data.items.length,
    可直接安装仓库: installableCount,
    官方技能仓库: counts.official_collections || 0,
    专业领域技能库: counts.specialized_skill_libraries || 0,
    "聚合目录 / 发现型仓库": counts.discovery_hubs || 0,
    "标准 / 规范": counts.ecosystem_standards || 0,
    "管理工具 / 构建器": counts.management_tools || 0,
    "GitHub Topics 入口页": counts.topic_pages || 0,
    最近刷新: updatedAt,
  };

  for (const [label, value] of Object.entries(replacements)) {
    nextContent = replaceTableValue(nextContent, label, value);
  }

  await fs.writeFile(README_FILE, nextContent, "utf8");
  console.log(`Updated ${README_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

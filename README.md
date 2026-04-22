# AI Skills GitHub 索引

![skills curated](https://img.shields.io/badge/skills-curated-2563eb)
![github links](https://img.shields.io/badge/github-links%2050-111827)
![agents](https://img.shields.io/badge/agents-Codex%20%7C%20Claude%20%7C%20Copilot-16a34a)
![status](https://img.shields.io/badge/status-active-22c55e)
![updated](https://img.shields.io/badge/updated-2026--04--22-f59e0b)

![仓库侦探系看板娘](assets/repo-guide-detective-banner.png)

> 这是我们仓库的原创侦探系看板娘“技能导航娘”，用更像“整理线索”的方式带你快速找到适合 `Codex`、`Claude Code`、`GitHub Copilot` 等代理的 skills、目录和工具。

更新时间：2026-04-22

这是一个面向 `Codex`、`Claude Code`、`GitHub Copilot`、`Gemini CLI`、`Cursor` 等 AI 编码代理的 GitHub skill 资源整理仓库。

当前已整理 `50` 个 GitHub 条目，覆盖：

| 类型 | 说明 |
| --- | --- |
| 官方技能仓库 | 官方或高质量原生 skills 仓库 |
| 专业领域技能库 | 安全、科研、产品、测试、中文工作流等垂直方向 |
| 大型技能目录 / 聚合仓库 | 用来批量发现和筛选 skills |
| 标准、构建器与管理工具 | 适合安装、同步、管理、审计、生成视图 |
| GitHub Topics 入口页 | 用来继续往外扩搜更多仓库 |

## 目录导航

- [快速开始](#快速开始)
- [快速视图](#快速视图)
- [这次新增的重点仓库](#这次新增的重点仓库)
- [仓库内容](#仓库内容)
- [元数据字段](#元数据字段)
- [刷新方式](#刷新方式)
- [备注](#备注)

## 快速视图

如果你不想先看完整索引，可以直接看这页：

- [中文优先 / 可直接安装 / 垂直领域视图](docs/skill-views.md)

## 快速开始

### 按 Agent 选仓库

| Agent | 优先仓库 | 适合场景 |
| --- | --- | --- |
| Codex | [openai/skills](https://github.com/openai/skills), [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills), [huggingface/skills](https://github.com/huggingface/skills), [microsoft/skills](https://github.com/microsoft/skills), [trailofbits/skills](https://github.com/trailofbits/skills), [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills), [GitHub Topics: codex-skills](https://github.com/topics/codex-skills) | 官方目录、工程流、AI/ML、审计、安全、继续扩展 |
| Claude Code | [anthropics/skills](https://github.com/anthropics/skills), [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), [trailofbits/skills](https://github.com/trailofbits/skills), [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills), [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code), [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills), [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills), [GitHub Topics: claude-code-skills](https://github.com/topics/claude-code-skills) | 官方 skills、聚合目录、生态市场、安全研究 |
| GitHub Copilot | [github/awesome-copilot](https://github.com/github/awesome-copilot), [microsoft/skills](https://github.com/microsoft/skills), [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills), [VikashLoomba/copilot-mcp](https://github.com/VikashLoomba/copilot-mcp), [runkids/skillshare](https://github.com/runkids/skillshare) | Copilot 生态、工程流程、MCP 发现、跨工具同步 |

### 按领域选仓库

| 领域 | 优先仓库 | 说明 |
| --- | --- | --- |
| 科研 / AI / 分析 | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills), [huggingface/skills](https://github.com/huggingface/skills) | 科研、论文、数据集、训练与分析 |
| 产品 / PM / 增长 | [phuryn/pm-skills](https://github.com/phuryn/pm-skills), [Bhanunamikaze/Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill) | 产品发现、策略、增长、SEO |
| 安全 / 审计 / IaC | [trailofbits/skills](https://github.com/trailofbits/skills), [LukasNiessen/terrashark](https://github.com/LukasNiessen/terrashark), [cisco-ai-defense/skill-scanner](https://github.com/cisco-ai-defense/skill-scanner) | 安全研究、Terraform、skills 扫描 |
| iOS / 前端 / 测试 | [dpearson2699/swift-ios-skills](https://github.com/dpearson2699/swift-ios-skills), [smnandre/symfony-ux-skills](https://github.com/smnandre/symfony-ux-skills), [testdino-hq/playwright-skill](https://github.com/testdino-hq/playwright-skill) | iOS、Symfony UX、Playwright |
| 中文工作流 | [JimLiu/baoyu-skills](https://github.com/JimLiu/baoyu-skills), [geekjourneyx/md2wechat-skill](https://github.com/geekjourneyx/md2wechat-skill), [baidu-netdisk/bdpan-storage](https://github.com/baidu-netdisk/bdpan-storage) | 中文技能集、公众号、网盘流程 |

## 这次新增的重点仓库

| 仓库 | 方向 | 说明 |
| --- | --- | --- |
| [openai/skills](https://github.com/openai/skills) | 官方 | OpenAI 官方 Codex skills 目录 |
| [microsoft/skills](https://github.com/microsoft/skills) | 官方 / 平台生态 | skills、MCP、AGENTS.md 资源集合 |
| [trailofbits/skills](https://github.com/trailofbits/skills) | 安全 | 偏安全研究与漏洞审计 |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | 聚合目录 | Claude skills 高热度导航 |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 聚合目录 | Claude Code 生态大目录 |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | 科研 / 分析 | 科研、工程、分析方向技能库 |
| [JimLiu/baoyu-skills](https://github.com/JimLiu/baoyu-skills) | 中文优先 | 中文社区里较有代表性的 skills 集合 |
| [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | 多领域市场 | 工程、营销、产品、合规等多方向 |
| [phuryn/pm-skills](https://github.com/phuryn/pm-skills) | 产品 / 增长 | 产品经理、增长、策略方向技能库 |
| [dpearson2699/swift-ios-skills](https://github.com/dpearson2699/swift-ios-skills) | iOS / Swift | SwiftUI 与 Apple 框架工作流 |
| [testdino-hq/playwright-skill](https://github.com/testdino-hq/playwright-skill) | 测试 | Playwright 测试技能 |
| [baidu-netdisk/bdpan-storage](https://github.com/baidu-netdisk/bdpan-storage) | 中文工作流 | 百度网盘文件工作流 skill |

## 仓库内容

- [详细索引](docs/ai-skills-github-index.md)
- [快速视图](docs/skill-views.md)
- [JSON 数据](data/ai-skills-links.json)
- [更新脚本](scripts/update-github-metadata.js)
- [视图生成脚本](scripts/build-curated-views.js)

## 元数据字段

`data/ai-skills-links.json` 会尽量为 GitHub 仓库类条目补这些字段：

- `stars`
- `forks`
- `open_issues`
- `watchers`
- `license`
- `archived`
- `default_branch`
- `created_at`
- `updated_at`
- `pushed_at`
- `last_checked`

## 刷新方式

直接运行：

```bash
node scripts/update-github-metadata.js
node scripts/build-curated-views.js
```

说明：

- 脚本会读取 `data/ai-skills-links.json`
- 仅对 `kind = github_repo` 的条目请求 GitHub API
- `GitHub Topics` 这类入口页会保留原始信息
- 如果设置了 `GITHUB_TOKEN` 或 `GH_TOKEN`，请求配额会更稳
- `build-curated-views.js` 会生成中文优先、可安装、垂直领域视图

## 备注

- 本仓库偏“资源整理 + 可更新索引”，不是单一 skill 安装包。
- 现在不只是精选入口，也开始覆盖更多真实可装的技能仓库。
- 星标、License 和仓库活跃度字段可以通过更新脚本刷新。
- 后续如果继续扩容，最值得做的是：
  - 增加中文优先分组
  - 增加“按可直接安装排序”
  - 加 GitHub Actions 定时自动刷新

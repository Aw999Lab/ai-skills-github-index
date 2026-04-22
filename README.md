# AI Skills GitHub 索引

![skills curated](https://img.shields.io/badge/skills-curated-2563eb)
![github links](https://img.shields.io/badge/github-links%2018-111827)
![agents](https://img.shields.io/badge/agents-Codex%20%7C%20Claude%20%7C%20Copilot-16a34a)
![status](https://img.shields.io/badge/status-active-22c55e)
![updated](https://img.shields.io/badge/updated-2026--04--22-f59e0b)

更新时间：2026-04-22

这是一个面向 `Codex`、`Claude Code`、`Gemini CLI`、`Cursor`、`GitHub Copilot` 等 AI 编码代理的 GitHub skill 资源整理仓库。

我优先收录了这几类项目：

- 直接包含 `SKILL.md`、`skills/` 目录或标准化 skill 包
- 可以直接安装给 AI agent 使用
- 能帮助你发现、同步、管理、筛选 skills
- 近期仍在维护，且社区活跃度较高

## 目录导航

- [快速开始](#快速开始)
- [按 Agent 分组速查](#按-agent-分组速查)
- [推荐先看](#推荐先看)
- [仓库内容](#仓库内容)
- [使用建议](#使用建议)
- [备注](#备注)

## 快速开始

### 如果你主要用 Codex

优先看这些：

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
- [huggingface/skills](https://github.com/huggingface/skills)
- [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills)
- [GitHub Topics: codex-skills](https://github.com/topics/codex-skills)

### 如果你主要用 Claude Code

优先看这些：

- [anthropics/skills](https://github.com/anthropics/skills)
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)
- [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills)
- [GitHub Topics: claude-code-skills](https://github.com/topics/claude-code-skills)

### 如果你主要用 GitHub Copilot

优先看这些：

- [github/awesome-copilot](https://github.com/github/awesome-copilot)
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
- [VikashLoomba/copilot-mcp](https://github.com/VikashLoomba/copilot-mcp)
- [runkids/skillshare](https://github.com/runkids/skillshare)

## 按 Agent 分组速查

| Agent | 建议先看 | 说明 |
| --- | --- | --- |
| Codex | `vercel-labs/agent-skills` / `addyosmani/agent-skills` / `huggingface/skills` / `ComposioHQ/awesome-codex-skills` | 偏工程工作流、Web 项目、AI/ML 任务和 Codex 定向能力 |
| Claude Code | `anthropics/skills` / `vercel-labs/agent-skills` / `VoltAgent/awesome-agent-skills` / `sickn33/antigravity-awesome-skills` | 适合先看官方 skill 规范，再看大规模聚合库 |
| GitHub Copilot | `github/awesome-copilot` / `addyosmani/agent-skills` / `VikashLoomba/copilot-mcp` | 偏 Copilot 生态资源、工程流程技能和工具发现 |
| 通用跨工具 | `runkids/skillshare` / `vercel-labs/skills` / `jiweiyeah/Skills-Manager` | 适合同时维护多套 AI CLI / IDE 助手的技能体系 |

## 推荐先看

| 项目 | 定位 | 适合谁 |
| --- | --- | --- |
| [anthropics/skills](https://github.com/anthropics/skills) | Anthropic 官方 Agent Skills 仓库 | 想看官方 skill 范式、模板、文档能力技能的人 |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Vercel 官方技能集合 | 做 React / Next.js / Web 质量审查 / 部署的人 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 工程工作流技能库 | 想把 spec / plan / build / test / review 流程标准化的人 |
| [huggingface/skills](https://github.com/huggingface/skills) | Hugging Face 官方技能库 | 做模型、数据集、论文、Gradio、训练任务的人 |
| [github/awesome-copilot](https://github.com/github/awesome-copilot) | GitHub Copilot 生态资源库 | 想收集 Copilot agents / skills / instructions / hooks 的人 |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 高质量聚合目录 | 想快速横向扫一遍主流 skill 仓库的人 |
| [runkids/skillshare](https://github.com/runkids/skillshare) | 跨工具同步与管理 | 想把 skill 在 Codex、Claude Code 等工具里共用的人 |

## 仓库内容

- [详细索引](docs/ai-skills-github-index.md)
- [JSON 数据](data/ai-skills-links.json)
- [更新脚本](scripts/update-github-metadata.js)

## 元数据字段

`data/ai-skills-links.json` 现在会尽量为 GitHub 仓库类条目补这些字段：

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
```

说明：

- 脚本会读取 `data/ai-skills-links.json`
- 仅对 `kind = github_repo` 的条目请求 GitHub API
- `GitHub Topics` 这类入口页会保留原始信息
- 如果设置了 `GITHUB_TOKEN` 或 `GH_TOKEN`，请求配额会更稳

## 使用建议

1. 如果你想直接安装高质量 skills，优先看 `anthropics/skills`、`vercel-labs/agent-skills`、`huggingface/skills`。
2. 如果你想批量找资源，优先看 `VoltAgent/awesome-agent-skills`、`sickn33/antigravity-awesome-skills`、GitHub Topics 页。
3. 如果你想把 skills 长期整理成自己的体系，优先看 `runkids/skillshare`、`jiweiyeah/Skills-Manager`、`vercel-labs/skills`。

## 备注

- 本仓库偏“资源整理”，不是单一 skill 安装包。
- 星标、License 和仓库活跃度字段可以通过更新脚本刷新。
- 后续如果你要，我可以继续帮你补一版：
  - 按中文资源优先筛选
  - 按“可直接安装”排序
  - 做一个自动更新脚本，定期同步最新 skill 仓库

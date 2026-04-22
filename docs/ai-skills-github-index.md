# AI Skills GitHub 详细索引

更新时间：2026-04-22

## 1. 官方 / 高质量原生技能仓库

| 名称 | 分类 | 适配 | 链接 | 备注 |
| --- | --- | --- | --- | --- |
| anthropics/skills | 官方技能仓库 | Claude Code / Claude.ai / Claude API | https://github.com/anthropics/skills | Anthropic 官方公开仓库，含 `skills/`、`spec/`、`template/`，适合看标准和官方示例 |
| vercel-labs/agent-skills | 官方技能仓库 | Claude Code / Codex / Cursor 等 | https://github.com/vercel-labs/agent-skills | Vercel 官方技能集合，偏 React、Next.js、Web 设计与部署 |
| addyosmani/agent-skills | 工程工作流技能库 | Claude Code / Codex / Copilot / Gemini CLI 等 | https://github.com/addyosmani/agent-skills | 把研发流程拆成 spec、plan、build、test、review、ship 等技能链 |
| huggingface/skills | 官方 AI/ML 技能仓库 | Codex / Claude Code / Gemini CLI / Cursor | https://github.com/huggingface/skills | 偏模型训练、数据集、论文、Gradio、Trackio、Hub CLI |
| github/awesome-copilot | GitHub 生态资源库 | GitHub Copilot | https://github.com/github/awesome-copilot | 官方 GitHub 组织下的 Copilot 资源库，含 agents、instructions、skills、plugins |
| block/agent-skills | 通用技能市场 | Goose / Claude Desktop / 兼容 Agent Skills 的工具 | https://github.com/block/agent-skills | Block 维护，强调可移植、易安装、易扩展 |

## 2. 聚合 / 发现型仓库

| 名称 | 分类 | 适配 | 链接 | 备注 |
| --- | --- | --- | --- | --- |
| VoltAgent/awesome-agent-skills | 高质量聚合目录 | Claude Code / Codex / Gemini CLI / Cursor 等 | https://github.com/VoltAgent/awesome-agent-skills | 偏“精选官方 + 社区”路线，适合做总入口 |
| sickn33/antigravity-awesome-skills | 大型安装式技能库 | Claude Code / Codex / Gemini CLI / Cursor 等 | https://github.com/sickn33/antigravity-awesome-skills | 超大规模 skill 库，覆盖广，适合一站式批量收集 |
| skillmatic-ai/awesome-agent-skills | 生态导航 | 通用 | https://github.com/skillmatic-ai/awesome-agent-skills | 更偏“什么是 Agent Skills、如何学习、如何构建和评估” |
| ComposioHQ/awesome-codex-skills | Codex 定向技能集 | Codex CLI / Codex API | https://github.com/ComposioHQ/awesome-codex-skills | 明确面向 Codex，偏自动化工作流和实用任务 |
| runkids/skillshare-hub | 目录型 hub | 多 agent | https://github.com/runkids/skillshare-hub | 可作为组织内部自建 hub 的参考模板 |

## 3. 安装 / 同步 / 管理工具

| 名称 | 分类 | 适配 | 链接 | 备注 |
| --- | --- | --- | --- | --- |
| vercel-labs/skills | 开放技能 CLI | OpenCode / Claude Code / Codex / Cursor / 40+ | https://github.com/vercel-labs/skills | `npx skills add ...` 路线，适合安装开放 Agent Skills 仓库 |
| runkids/skillshare | 跨工具同步平台 | Codex / Claude Code / OpenClaw / 50+ | https://github.com/runkids/skillshare | 一处维护，多处同步；还支持审计、UI、团队共享 |
| jiweiyeah/Skills-Manager | 桌面 GUI 管理器 | Claude Code / Codex / Opencode 等 | https://github.com/jiweiyeah/Skills-Manager | 图形界面管理 skills，适合日常整理和同步 |
| VikashLoomba/copilot-mcp | VS Code 扩展 / 资源入口 | GitHub Copilot / Claude Code / Codex CLI | https://github.com/VikashLoomba/copilot-mcp | 偏 MCP 与资源发现，但对技能和工具生态整理也很有帮助 |

## 4. GitHub Topics / 入口页

| 名称 | 分类 | 链接 | 备注 |
| --- | --- | --- | --- |
| GitHub Topics: agent-skills | 总入口 | https://github.com/topics/agent-skills | 最适合先总览整个 Agent Skills 生态 |
| GitHub Topics: codex-skills | Codex 入口 | https://github.com/topics/codex-skills | 想专门找 Codex 可用 skills 时先看这里 |
| GitHub Topics: claude-code-skills | Claude Code 入口 | https://github.com/topics/claude-code-skills | 想找 Claude Code 相关 skills 时先看这里 |

## 5. 我建议你优先收藏的顺序

1. `anthropics/skills`
2. `vercel-labs/agent-skills`
3. `huggingface/skills`
4. `addyosmani/agent-skills`
5. `VoltAgent/awesome-agent-skills`
6. `runkids/skillshare`
7. `github/awesome-copilot`

## 6. 如果你要继续扩展这个仓库

可以继续往下加这些维度：

- 按 `Codex` / `Claude Code` / `Copilot` / `Gemini CLI` 分组
- 按“可直接安装”与“仅作参考”分组
- 加 `stars`、`updated_at`、`license` 字段
- 做一个自动更新脚本，定期同步最新仓库列表

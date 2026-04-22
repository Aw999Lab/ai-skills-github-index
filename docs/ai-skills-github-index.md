# AI Skills GitHub 详细索引

更新时间：2026-04-22

当前索引共 `40` 个条目。

## 0. 数据维护方式

当前仓库已经包含一个可重复运行的更新脚本：

```bash
node scripts/update-github-metadata.js
```

它会自动为 `github_repo` 条目刷新：

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

## 1. 按 Agent 分组速查

### Codex

| 名称 | 链接 | 备注 |
| --- | --- | --- |
| openai/skills | https://github.com/openai/skills | OpenAI 官方 Codex skills 目录 |
| vercel-labs/agent-skills | https://github.com/vercel-labs/agent-skills | 适合 Web、React、Next.js、设计审查和部署 |
| addyosmani/agent-skills | https://github.com/addyosmani/agent-skills | 适合 spec、plan、build、test、review 等工程流 |
| huggingface/skills | https://github.com/huggingface/skills | 适合 AI/ML、论文、数据集、训练与 Gradio |
| microsoft/skills | https://github.com/microsoft/skills | 技能、MCP、Custom Agents、AGENTS.md 资源集合 |
| trailofbits/skills | https://github.com/trailofbits/skills | 偏安全审计与漏洞研究 |
| ComposioHQ/awesome-codex-skills | https://github.com/ComposioHQ/awesome-codex-skills | 明确面向 Codex 的定向资源 |
| GitHub Topics: codex-skills | https://github.com/topics/codex-skills | 想批量继续往下挖时先看这里 |

### Claude Code

| 名称 | 链接 | 备注 |
| --- | --- | --- |
| anthropics/skills | https://github.com/anthropics/skills | 官方 skill 范式、模板和示例入口 |
| vercel-labs/agent-skills | https://github.com/vercel-labs/agent-skills | 除 Codex 外，对 Claude Code 也很友好 |
| trailofbits/skills | https://github.com/trailofbits/skills | 安全研究方向很强 |
| ComposioHQ/awesome-claude-skills | https://github.com/ComposioHQ/awesome-claude-skills | 高热度 Claude skills 聚合目录 |
| hesreallyhim/awesome-claude-code | https://github.com/hesreallyhim/awesome-claude-code | Claude Code 技能、命令、插件总入口 |
| alirezarezvani/claude-skills | https://github.com/alirezarezvani/claude-skills | 大型多领域技能市场 |
| VoltAgent/awesome-agent-skills | https://github.com/VoltAgent/awesome-agent-skills | 精选型聚合目录，适合做总入口 |
| GitHub Topics: claude-code-skills | https://github.com/topics/claude-code-skills | 想继续扩展时最方便的主题入口 |

### GitHub Copilot

| 名称 | 链接 | 备注 |
| --- | --- | --- |
| github/awesome-copilot | https://github.com/github/awesome-copilot | GitHub 官方组织下的 Copilot 资源库 |
| microsoft/skills | https://github.com/microsoft/skills | 对 Copilot 生态也很有帮助 |
| addyosmani/agent-skills | https://github.com/addyosmani/agent-skills | 对 Copilot 也适用的工程流程能力集合 |
| VikashLoomba/copilot-mcp | https://github.com/VikashLoomba/copilot-mcp | 偏 MCP 与工具发现，对 Copilot 生态尤其有用 |
| runkids/skillshare | https://github.com/runkids/skillshare | 想做跨工具同步时很好用 |

### 通用跨工具

| 名称 | 链接 | 备注 |
| --- | --- | --- |
| runkids/skillshare | https://github.com/runkids/skillshare | 一处维护，多处同步 |
| vercel-labs/skills | https://github.com/vercel-labs/skills | 适合统一安装开放 Agent Skills |
| jiweiyeah/Skills-Manager | https://github.com/jiweiyeah/Skills-Manager | 图形化技能管理器 |
| refly-ai/refly | https://github.com/refly-ai/refly | 开源技能构建器 |

## 2. 官方 / 高质量原生技能仓库

| 名称 | 分类 | 适配 | 链接 | 备注 |
| --- | --- | --- | --- | --- |
| anthropics/skills | 官方技能仓库 | Claude Code / Claude.ai / Claude API | https://github.com/anthropics/skills | Anthropic 官方公开仓库，含 `skills/`、`spec/`、`template/` |
| openai/skills | 官方技能仓库 | Codex / OpenAI API-based agents | https://github.com/openai/skills | OpenAI 官方 skills catalog for Codex |
| vercel-labs/agent-skills | 官方技能仓库 | Claude Code / Codex / Cursor 等 | https://github.com/vercel-labs/agent-skills | Vercel 官方技能集合，偏 React、Next.js、Web 设计与部署 |
| huggingface/skills | 官方 AI/ML 技能仓库 | Codex / Claude Code / Gemini CLI / Cursor | https://github.com/huggingface/skills | 偏模型训练、数据集、论文、Gradio、Trackio、Hub CLI |
| microsoft/skills | 官方 / 平台生态仓库 | GitHub Copilot / Codex / Claude Code 等 | https://github.com/microsoft/skills | Skills、MCP servers、Custom Agents、AGENTS.md 资源集合 |
| trailofbits/skills | 官方 / 安全技能仓库 | Claude Code / Codex / 安全研究 agent | https://github.com/trailofbits/skills | 安全研究、漏洞检测、审计工作流 |
| github/awesome-copilot | GitHub 生态资源库 | GitHub Copilot | https://github.com/github/awesome-copilot | 官方 GitHub 组织下的 Copilot 资源库，含 agents、instructions、skills、plugins |
| block/agent-skills | 通用技能市场 | Goose / Claude Desktop / 兼容 Agent Skills 的工具 | https://github.com/block/agent-skills | Block 维护，强调可移植、易安装、易扩展 |
| VapiAI/skills | 官方垂直技能仓库 | Claude Code / Codex / Voice agents | https://github.com/VapiAI/skills | 面向 Vapi 语音 agent 的官方 skills 与 MCP 连接器 |

## 3. 专业领域 / 专项技能库

| 名称 | 分类 | 适配 | 链接 | 备注 |
| --- | --- | --- | --- | --- |
| K-Dense-AI/scientific-agent-skills | 科研 / 分析 | Claude Code / Codex / 科研 agents | https://github.com/K-Dense-AI/scientific-agent-skills | 覆盖 research、science、engineering、analysis、finance、writing |
| OthmanAdi/planning-with-files | 规划工作流 | Claude Code / Codex | https://github.com/OthmanAdi/planning-with-files | Persistent markdown planning skill |
| JimLiu/baoyu-skills | 中文社区技能集 | Claude Code / Codex 等 | https://github.com/JimLiu/baoyu-skills | 中文社区里较有代表性的 skills 集合 |
| alirezarezvani/claude-skills | 多领域市场 | Claude Code / Codex / Gemini CLI / Cursor | https://github.com/alirezarezvani/claude-skills | 工程、营销、产品、合规、咨询等多领域 skills |
| phuryn/pm-skills | 产品 / PM | Claude Code / Codex / PM agents | https://github.com/phuryn/pm-skills | 适合 discovery、strategy、launch、growth |
| antfu/skills | 通用技能集 | Claude Code / Codex 等 | https://github.com/antfu/skills | Anthony Fu 的 curated skills 集合 |
| RKiding/Awesome-finance-skills | 金融分析 | Claude Code / Codex / Finance agents | https://github.com/RKiding/Awesome-finance-skills | 开源金融分析 Agent Skills |
| dpearson2699/swift-ios-skills | iOS / Swift | Claude Code / Codex / Swift agents | https://github.com/dpearson2699/swift-ios-skills | iOS、SwiftUI、Apple frameworks 技能集 |
| testdino-hq/playwright-skill | 测试 / Playwright | Claude Code / Codex / Test agents | https://github.com/testdino-hq/playwright-skill | Playwright 最佳实践 skill |
| geekjourneyx/md2wechat-skill | 中文内容发布 | Codex / Claude Code | https://github.com/geekjourneyx/md2wechat-skill | Markdown 转微信公众号发布工作流 |
| baidu-netdisk/bdpan-storage | 中文文件工作流 | Claude Code / Codex | https://github.com/baidu-netdisk/bdpan-storage | 百度网盘 upload、download、share、search 技能 |

## 4. 聚合 / 发现型仓库

| 名称 | 分类 | 适配 | 链接 | 备注 |
| --- | --- | --- | --- | --- |
| VoltAgent/awesome-agent-skills | 高质量聚合目录 | Claude Code / Codex / Gemini CLI / Cursor 等 | https://github.com/VoltAgent/awesome-agent-skills | 偏“精选官方 + 社区”路线 |
| sickn33/antigravity-awesome-skills | 大型安装式技能库 | Claude Code / Codex / Gemini CLI / Cursor 等 | https://github.com/sickn33/antigravity-awesome-skills | 超大规模 skill 库，覆盖广 |
| ComposioHQ/awesome-claude-skills | Claude skills 聚合目录 | Claude Code / Claude 生态 | https://github.com/ComposioHQ/awesome-claude-skills | 高热度、适合快速扩容 |
| hesreallyhim/awesome-claude-code | Claude Code 聚合目录 | Claude Code | https://github.com/hesreallyhim/awesome-claude-code | skills、hooks、slash commands、plugins 一起收录 |
| VoltAgent/awesome-openclaw-skills | OpenClaw 聚合目录 | OpenClaw / Codex / Claude Code | https://github.com/VoltAgent/awesome-openclaw-skills | 从 registry 过滤整理出来的大型目录 |
| skillmatic-ai/awesome-agent-skills | 生态导航 | 通用 | https://github.com/skillmatic-ai/awesome-agent-skills | 更偏“什么是 Agent Skills、如何学习、如何构建和评估” |
| ComposioHQ/awesome-codex-skills | Codex 定向技能集 | Codex CLI / Codex API | https://github.com/ComposioHQ/awesome-codex-skills | 明确面向 Codex，偏自动化工作流和实用任务 |
| runkids/skillshare-hub | 目录型 hub | 多 agent | https://github.com/runkids/skillshare-hub | 可作为组织内部自建 hub 的参考模板 |
| jeremylongshore/claude-code-plugins-plus-skills | 市场型目录 | Claude Code | https://github.com/jeremylongshore/claude-code-plugins-plus-skills | plugins、skills、agents 一起整理 |
| mxyhi/ok-skills | 通用 curated skills | Codex / Claude Code / Cursor / OpenClaw | https://github.com/mxyhi/ok-skills | 适合配合 AGENTS.md 一起看 |

## 5. 标准 / 构建器 / 管理工具

| 名称 | 分类 | 适配 | 链接 | 备注 |
| --- | --- | --- | --- | --- |
| agentskills/agentskills | Agent Skills 标准 | 整个 Agent Skills 生态 | https://github.com/agentskills/agentskills | Specification and documentation for Agent Skills |
| vercel-labs/skills | 开放技能 CLI | OpenCode / Claude Code / Codex / Cursor / 40+ | https://github.com/vercel-labs/skills | `npx skills add ...` 路线 |
| runkids/skillshare | 跨工具同步平台 | Codex / Claude Code / OpenClaw / 50+ | https://github.com/runkids/skillshare | 一处维护，多处同步 |
| jiweiyeah/Skills-Manager | 桌面 GUI 管理器 | Claude Code / Codex / Opencode 等 | https://github.com/jiweiyeah/Skills-Manager | 图形界面管理 skills |
| VikashLoomba/copilot-mcp | VS Code 扩展 / 资源入口 | GitHub Copilot / Claude Code / Codex CLI | https://github.com/VikashLoomba/copilot-mcp | 偏 MCP 与资源发现 |
| refly-ai/refly | 技能构建器 | Claude Code / Cursor / Codex | https://github.com/refly-ai/refly | 开源技能 builder |

## 6. GitHub Topics / 入口页

| 名称 | 分类 | 链接 | 备注 |
| --- | --- | --- | --- |
| GitHub Topics: agent-skills | 总入口 | https://github.com/topics/agent-skills | 最适合先总览整个 Agent Skills 生态 |
| GitHub Topics: codex-skills | Codex 入口 | https://github.com/topics/codex-skills | 想专门找 Codex 可用 skills 时先看这里 |
| GitHub Topics: claude-code-skills | Claude Code 入口 | https://github.com/topics/claude-code-skills | 想找 Claude Code 相关 skills 时先看这里 |

## 7. 我建议你优先收藏的顺序

1. `anthropics/skills`
2. `openai/skills`
3. `vercel-labs/agent-skills`
4. `huggingface/skills`
5. `microsoft/skills`
6. `trailofbits/skills`
7. `VoltAgent/awesome-agent-skills`
8. `ComposioHQ/awesome-claude-skills`

## 8. 如果你要继续扩展这个仓库

可以继续往下加这些维度：

- 按“可直接安装”与“仅作参考”分组
- 增加中文优先分组
- 增加更多垂直领域 skills
- 增加 GitHub Actions 定时自动刷新

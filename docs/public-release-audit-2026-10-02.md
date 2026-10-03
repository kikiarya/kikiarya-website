# GitHub 公开前审查

> 此报告记录此前的完整审查范围。当前仅源码公开的结论见 [current-source-public-review.md](current-source-public-review.md)，历史、真实性与授权不属于当前检查范围。

审查日期：2026 年 10 月 2 日（Asia/Singapore）。结论：**暂不建议直接将当前仓库及其历史公开**。需要先处理历史手机号、存在安全公告的依赖、内容事实一致性，并明确素材和代码的授权范围。

本轮仅审查，未修改业务代码、提交、推送、删除文件、清理历史或改变仓库可见性。新增了本报告及本地审计证据。

## 覆盖范围与限制

- 当前工作区：144 个已跟踪文件和 11 个未跟踪文件，包含这轮尚未提交的内容发布实现。审计自身产物不计入被审源码。
- 本地所有 refs 可达的 20 个提交、594 个独立历史 blob；包括 main、origin/main 的本地记录和 Codex 本地 refs。检查了旧 `.next`、配置、源码、文档、环境变量示例及素材。
- 34 个历史 gzip 对象做了解压；二进制和解压内容另用字节模式查标准密钥及隐私标记。二进制图片并未做完整 OCR，二进制内容也不能等同于逐字语义审查。
- 标准密钥前缀、私钥头和常见凭据赋值规则未命中疑似有效密钥。没有安装 gitleaks/trufflehog；这不是任意编码、任意供应商凭据均被排除的保证。
- 当前 4 个 `resume/` PDF/DOCX 被忽略，未在当前跟踪清单或历史文件名中找到 PDF/DOCX。只核对其路径、忽略与跟踪状态，没有解析私人简历正文。
- GitHub CLI 不可用，匿名页面读取未成功，未确认远端当前可见性，也未拉取远端最新 refs。本报告对本地可见历史负责，不覆盖 GitHub 已删除分支、远端隐藏 refs、缓存、fork、Actions 日志和部署平台设置。
- 未扫描 `node_modules` 全部源码；依赖采用 lockfile、安装版本和 npm 在线安全审计。未做真实漏洞利用、负载测试或法律授权认证。

## 需要优先处理

### 1. 历史手机号与真实姓名：公开旧历史会暴露

旧 `app/resume/page.tsx` 包含姓名和手机号，旧 `components/Footer.tsx` 包含 `tel:` 电话链接。部分历史 `.next/server/app/*.js` 同时保留了这些内容；压缩缓存也有姓名/电话相关标记。

可核对的历史简历 blob：`1c61dedc1623f296d73102f6238e38e36796b24b`，第 20 行。其变化记录关联 `40da1c6`（2026-01-02）和 `78b75cd`（2026-08-18）。报告不复写号码。

当前源码没有确认的手机号；`tsconfig.tsbuildinfo` 的手机号规则命中属于编译哈希中的数字串，是误报。联系邮箱及提交作者邮箱与现有公开联系方式一致，不按泄露密钥处理。论文作者姓名本来就是公开资料；历史手机号则需要独立处理。

处理选择：

- 推荐从审查后的源码建立干净公开仓库，不把旧 `.git` 带过去；旧仓库保留原状态供恢复。
- 如需保留历史，则需对源码与构建产物一起清理历史，并复扫所有准备推送的 refs。历史改写和强推不在本轮执行范围。
- 若手机号已经通过曾经公开的远端传播，后续清理不能保证其他人已有副本消失。

### 2. 当前依赖存在严重与高危公告

lockfile 和当前安装均为 `next 16.3.1`、`sharp 0.35.3`。在线 `npm audit --omit=dev` 返回 2 个有问题的包：Next.js critical、sharp high；全量审计共 4 个包，额外涉及 browserslist high、postcss-selector-parser low。

Next.js 的命中包括 Windows 托管服务器的未认证 RCE、AVIF 图像优化相关 RCE、`next/og ImageResponse` 相关 RCE。仓库确实使用 `next/og` 生成分享图，但本轮没有证明该站点满足具体漏洞利用条件。

[Next.js 2026 年 9 月安全发布](https://nextjs.org/blog/september-2026-security-release) 已提供 16.3.8 修复版本；8 月和 9 月 22 日公告也比当前安装版本更新。应升级到包含这些修复的受支持版本，更新 lockfile，并重新做生产/全量 audit、构建和接口检查，不能只改 package.json 中的版本范围。

证据：`audit/dependency-audit.json`。sharp 的报告修复边界为 0.35.4；应通过兼容的依赖更新验证实际安装结果。

### 3. 项目事实与展示存在冲突

- `lib/projects.ts:310` 和 `lib/assistant/knowledge.ts:127` 把 HSC 写成四个 LangGraph Agent。当前可读参考项目 `E:/workspace/code review-multi-agent/Multi-Agent Learning Assistant/backend/agent/orchestrator/learningWorkflow.js` 使用自定义 runner、状态机和 Diagnoser/Planner；不能据此支持已完成四 Agent LangGraph。要引用对应已实现版本的源码，或收窄展示。
- `components/CommandPalette.tsx:52` 仍称 OpenClaw 更好恢复；项目正文与图谱则已经收窄为静态上下文压缩，明确动态恢复未经验证。快捷回答会继续把旧结论展示给访客。
- Coding Agent 的 +6pp、约 +10pp、工具调用减少 15% 在网站和快捷回答出现。本轮未定位能支撑这些数字的冻结任务清单、原始输出与评估报告；不能把工程实现和本地测试通过当成这些指标的证据。建议先补报告，或标为历史报告结果并给来源，无法提供则移除数字。
- LAR 的第三作者身份能由 [arXiv 作者列表](https://arxiv.org/abs/2605.18597) 核对。主结果和吞吐量可在 [论文 v3](https://arxiv.org/html/2605.18597v3) 表 1、表 8 找到，属于论文报告结果，本轮未复现实验。NeurIPS 官方 2026 下载列表收录该标题，但单篇 poster 页面本轮未成功读取，不把列表当成完整展示类型核验。
- `lib/projects.ts:105` BibTeX 仅写 `author={Kikiarya}`，与论文完整作者列表不同，且 `primaryClass={cs.LG}` 与 arXiv 当前 cs.AI 元数据不一致。应使用官方完整引用信息。

## 授权与素材

仓库没有根级 LICENSE 或第三方 NOTICE。公开浏览源码与授予他人复用许可是不同决定；尚未选择许可证本身不意味着不能公开，但不能把这个仓库宣称为授权清楚的开源模板。


`public/assistant/kiki-assistant.webp` 有内部素材路径和导出脚本可追溯，但没有随仓库保存创作/授权记录；检查到图片尺寸 1152×624、动画元数据 loop/background，未发现 EXIF 位置字段。需要明确个人角色图片、品牌身份与博客正文是否包含在源码许可证内，避免开放源码被理解为允许复制个人形象或文章。

15 个图谱 SVG 可由脚本生成，主要有可读来源说明。PixVerse 图谱明确属于历史笔记重建与设计推演；不包含可证明已授权公开的公司原始源码。本轮没有检查雇佣协议，不能替代公司信息披露授权确认。

锁文件包含 sharp/libvips 的 LGPL 相关声明，以及 caniuse-lite 的 CC-BY-4.0。仅公开自己的源码不会自动把整个站点代码变成 LGPL；如分发包含这些依赖的二进制包，需要另核对相应通知与义务。

## 接口与发布实现

| 问题 | 证据 | 建议 |
| --- | --- | --- |
| JSON `null` 请求返回 500 | 本地 POST `/api/portfolio-assistant` 实测；route.ts:47 直接读取 body.question | 在读取属性前验证非空对象，非法请求返回 400 |
| 访客限流可通过换 session 重置 | 相同 session 请求状态 200、200、429；换 session 得到 200；rate-limit.ts:65 | IP 与 session 分别设限；代理头仅在可信代理环境解释。全局模型预算仍提供另一层成本限制 |
| 本地限流和缓存 Map 无容量上限 | rate-limit.ts 无全局逐出策略，新 identifier 和新问题会长期增加键 | TTL 清理与容量上限，避免公开流量造成内存增长 |
| 多轮缓存键不包含上一轮文本 | API cacheKey 仅纳入 sourceIds；模型却接收 previousTurn.question/answer | 对全部影响答案的上下文做摘要或禁用多轮共享缓存，避免同问题同来源但上下文不同得到别人的缓存回答 |
| Notion 来源 URL 校验晚于建模，且来源标题缺失可丢链接 | sync-notion.mjs 中 safeUrl 后仅在 SourceTitle 存在时输出 source | 对摘抄来源字段做成组校验，避免发布摘抄却丢失出处 |
| Notion 同步未做真实联调 | 没有 NOTION_TOKEN；现有测试使用模拟 API | 配置只读集成后验证新建、修改、撤回、空库与失败保留；线上更新仍需重新部署 |
| 图谱脚本写入仓库外路径 | build-project-atlas.py:7、104、113；写 Obsidian 与其他项目 docs | 改为显式参数，默认仅生成当前仓库内容，外部导出需主动选择 |
| lint 命令失效 | npm run lint 实测把 lint 当项目目录 | Next.js 16 下配置独立 ESLint 命令，新增相应配置后验证 |

这些是公开运行与可复现性的问题，不能全部等同于源码公开即会被利用。此次没有修改实现。

## 可以保留与应排除的内容

可以保留已审查的 app/components/lib 源码、公开项目数据、只包含允许公开文章的快照、package-lock、配置示例、图谱和导出说明。

以下不应作为公开发布文件：真实 `.env`、resume 目录、`.next`、node_modules、临时审计缓存、Python 缓存和 tsconfig.tsbuildinfo。当前 `tsconfig.tsbuildinfo` 仍被 Git 跟踪，`scripts/__pycache__` 是未跟踪文件；历史 `.next` 仍然可达。停止跟踪和忽略只能影响新提交，不能消除旧历史。

README 和 `.env.example` 含私人 Notion 数据库链接、数据源 ID。它们不是认证密钥，单凭 ID 不会授予读取权限，但公开模板没必要绑定个人库，建议换成占位符，把实际配置保存在 `.env.local`。当前邮箱是用户已使用的公开联系方式，可按个人网站目的保留。

本轮产生 `audit/` 审查证据和 `.audit-npm-cache/` 查询缓存。后者为 npm 查询产物，不要加入发布提交；未删除。

## 检查结果

- 内容同步测试：5/5 通过。
- `npm run build`：通过，包含 TypeScript 检查。
- `npm run lint`：失败。
- `git diff --check`：检查的源码范围未报告空白错误；存在 Windows 换行提示。
- 当前及历史模式扫描：未发现标准密钥命中；发现历史手机号/姓名和本地路径。未确认当前手机号泄露。
- 生产依赖 audit：1 critical + 1 high。
- 全量依赖 audit：1 critical + 2 high + 1 low。
- 实际 Notion 同步、远端可见性、线上部署配置、素材最终授权：未验证。

## 发布路径

先升级依赖并复核报告，再统一项目事实、修复公开接口和脚本副作用，整理源码与素材的许可边界。确认需保留的公开文件后，优先建立没有旧隐私历史的干净公开仓库。若继续使用原仓库，先完成历史清理复扫，不能仅提交“删除手机号”后就改可见性。

公开前复核标准：历史隐私处理完成；依赖审计没有未处理的 critical/high；项目数字有出处；源码/素材许可边界明确；构建、lint 和相关接口检查通过；Notion 发布流程至少完成一次真实联调。

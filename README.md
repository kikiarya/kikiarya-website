# Kikiarya

**个人网站 · 研究与工程作品集**

一个展示项目、记录思考，也留一点日常的个人空间。围绕 LLM Agent、后训练与 AI 系统，把研究问题、实现方法和项目经历串起来，让访客既能快速了解我，也能沿着感兴趣的项目继续读下去。

[GitHub](https://github.com/kikiarya) · [联系我](mailto:kikiarya@163.com)

## 关于这个网站

网站从一张带有花瓣与打字机效果的封面开始，进入后依次呈现个人介绍、精选项目、实践经历和技术机制。以樱花粉、衬线标题和留白为主要视觉语言，支持浅色与深色主题。转场、卡片和图谱的交互围绕阅读展开，并为减少动态效果的系统偏好提供适配。

项目页除了介绍做了什么，也展示问题背景、核心实现和验证结果。博客记录做项目时遇到的问题与思考，阅读札记则留给摘抄、读书笔记和个人感想。

## 可以在这里看到什么

### 项目与研究

首页精选项目提供快速入口，项目索引支持搜索和分类筛选。详情页串联技术栈、实现过程、架构图和相关链接，关联文章也会出现在对应项目下，方便从作品展示继续读到具体思考。

### 可以探索的技术图谱

首页通过“感知、决策、执行、验证、恢复”几个环节介绍 Agent 系统，并链接到相关项目。LAR 流程支持滚动阅读和节点切换，项目架构图提供文字说明、依据和 SVG 下载，让技术内容有更直观的阅读方式。

### 博客与阅读札记

博客位于 `/notes`，阅读札记位于 `/bookshelf`。文章支持标签筛选、章节目录和项目关联，摘抄可保留原文标题、作者、链接与页码。两类内容共用 `/rss.xml` 订阅入口。

Notion 同步脚本把已发布内容转换为网站使用的快照，写作与页面展示各自保持熟悉的方式。每次同步后重新构建，就能生成新的列表和文章详情。

### 陪你浏览的个人助手

页面上的小助手可以拖动，也可以通过 💬 提示气泡打开。访客可以问项目做了什么、用了哪些方法，或我关注的技术方向；回答附上相关资料链接，文章引用可以直接定位到章节。

助手默认使用本地检索整理答案，也支持配置模型后组织回答。项目资料与允许引用的公开文章组成知识库，检索采用关键词和中文字符匹配。

### 一些细节

- 桌面与移动端导航，以及快速搜索入口。
- 浅色 / 深色主题切换，并记住浏览偏好。
- 页面封面、章节阅读与路由转场。
- 简历、联系方式和项目之外的生活页面。

## 技术栈

| 部分 | 使用的技术 |
| --- | --- |
| 页面与路由 | Next.js App Router、React、TypeScript |
| 样式与交互 | Tailwind CSS、Framer Motion、Lucide |
| 内容发布 | Notion API、构建时 JSON 快照 |
| 个人助手 | 本地检索、AI SDK、可选模型网关 |
| 限流与缓存 | Upstash Redis、本地回退 |

页面、项目数据和文章内容集中在同一个 Next.js 项目中。内容同步在构建前执行，助手问答通过服务端 Route Handler 提供。

## 本地运行

使用 Node.js 22.14 或更新版本。

```powershell
npm.cmd install
npm.cmd run dev
```

打开 [localhost:3000](http://localhost:3000)。本地检索助手和已有内容可以直接运行；接入 Notion 或模型时再配置相应变量。

```powershell
npm.cmd run build
npm.cmd run start
```

## 项目结构

```text
app/          页面、文章详情、RSS 与助手接口
components/   导航、项目展示、图谱、动画与个人助手
lib/          项目资料、文章数据、内容快照与助手检索
public/       角色动画和项目图谱
scripts/      Notion 同步、内容测试与素材导出
```

<details>
<summary><strong>内容发布与助手配置</strong></summary>

### 在 Notion 写作

将 `.env.example` 复制为 `.env.local`。为网站创建只读 Notion 集成，将内容数据库共享给它，配置 `NOTION_TOKEN` 和 `NOTION_DATA_SOURCE_ID`；`NEXT_PUBLIC_SITE_URL` 填网站正式地址，用于 RSS 链接。

数据库字段保持以下名称：

| 字段 | 类型与用途 |
| --- | --- |
| Title、Slug | 标题、文本；Slug 使用小写英文、数字和连字符，保持唯一 |
| Kind、Status | 单选；类型为博客 / 阅读札记，状态为草稿 / 已发布 / 归档 |
| Summary、Tags | 摘要文本、标签多选 |
| Published | 发布日期 |
| Project | 文本；关联网站项目的 slug，可留空 |
| AllowAssistant | 复选框；允许助手引用此文章 |
| SourceTitle、SourceAuthor、SourceLocation | 文本；摘抄来源、作者和章节或页码 |
| SourceURL、Updated | 原文 URL、最后编辑时间 |

在 Notion 新建条目，填写标题、固定链接、类型、发布日期与正文，准备好后将状态设为“已发布”。

```powershell
npm.cmd run content:sync
npm.cmd run content:build
```

前者只同步，后者同步后构建。部署时可使用 `npm run content:build` 作为构建命令。文章新增、修改和撤回后，需要重新同步并部署；聊天中的 Notion 授权不能代替网站自己的集成令牌。

同步支持标题、段落、引用、列表、代码、提示块和分隔线，输出纯文本段落。富文本样式和内嵌链接不保留；图片、表格和嵌入等块会报错。同步会校验固定链接、日期、项目关联与正文，全部成功后才替换快照，失败保留上一份内容。

首次同步前使用已有博客数据；首次成功同步后，以 Notion 已发布条目为准，空库对应空快照。

### 配置模型回答

配置 `AI_GATEWAY_API_KEY`、`AI_MODEL`、`UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN` 后，助手在预算允许时调用模型整理检索结果。模型或 Redis 异常时回退到本地回答。

助手保留当前标签页最近 20 轮问答，支持清空、复制、停止和失败重试；检索最多参考最近 3 轮已完成对话。指定项目会切换话题，含糊的跨项目追问会先确认对象。

Notion 内容只有在「已发布」且勾选 `AllowAssistant` 时进入助手知识库。运行 `npm run content:build` 同步并构建，再部署构建结果，页面与助手资料一起更新；撤回、删除或取消勾选的文章会在下次成功同步后退出知识库。同步失败会保留旧快照。

草稿和未勾选 `AllowAssistant` 的同步文章不进入助手知识库。密钥只放在服务端环境变量中；公开快照应只包含允许公开的文章。

</details>

## 检查

```powershell
npm.cmd run test:content
npx.cmd tsc --noEmit --incremental false
npm.cmd run build
```

## README 参考

参考 [Brittany Chiang](https://github.com/bchiang7/v4)、[Takuya](https://github.com/craftzdog/craftzdog-homepage) 与 [Lee Robinson](https://github.com/leerob/next-mdx-blog) 的项目介绍、技术栈和本地运行说明组织方式。本文描述 Kikiarya 自身的实现。

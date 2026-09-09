# Kikiarya Folio Craft

> 自然，但有设计感、美感和科技感。  
> **不换皮。** 现有 blush folio / 手帐是皮肤；科技感只加在交互、节奏和「进门」上。  
> **只这一份方向稿。** 封面拉近、封面中文格言、光标物理按下面同一条顺序做，不要另开第二份 plan。  
> 不替代 [pink-style DESIGN-SYSTEM](../.cursor/skills/pink-style/DESIGN-SYSTEM.md) 的 token，也不替代 [sakura-layout](../.cursor/skills/sakura-layout/SKILL.md) 的结构。

---

## 1. 一句话

这是一本会呼吸的粉瓷手帐：衬线标题、玻璃、蕾丝、花瓣。进门是走进书里（拉近），封面一句中文格言，碰的时候光标会推光——不是黑底、粒子球或 SaaS 落地页。

---

## 2. 三件事分别从哪来

| 你要的 | 真正来源 | 不是 |
|--------|----------|------|
| **美感** | 低对比 ink、留白、Cormorant、玻璃、一层签名装饰 | 热粉、Barbie、满屏花 |
| **自然** | 慢背景（8s+）不抢读；中文只留封面格言；动效像翻页 | 整站 i18n 开关、循环打字抢标题、Idle 自动拉近 |
| **科技感** | 光标是力；等宽标签；`01 / 02`；磁吸弹簧；细光标竖线；进门 dolly | 暗色网格、波形剧场、15° 卡倾斜 |

好看站的共性（NEXUS、Brittany Chiang、中文樱花博客、Nocturne dashboard）不是同一套皮肤，而是：

1. **一层慢、一层快。** 氛围 Ignorable；指针碰到的东西 200–300ms 内必须感觉到。
2. **光标改形状或光，不只改字色。** 下划线长出、编号平移、高光跟着走。
3. **一个签名物体。** 你已经是封面花瓣 + `Kikiarya.`。不要再加第二套（粒子半球）。
4. **两套字体当两个声音。** 大标题冷静；下面一句斜体旁白。
5. **克制的强调色。** Nocturne sakura-milk 整页只有一组 blush；hover 是 `rgba(216,132,159,.09)`，不是第二套蓝。
6. **进门是阈值，不是淡出。** 点 Enter = 走进纸面；词标不要往上飘走。

---

## 3. Nocturne-Memory-Core：源头，不是整页模板

仓库：[Pyruslili/Nocturne-Memory-Core](https://github.com/Pyruslili/Nocturne-Memory-Core)（约 80★）

这是 **AI 连续性记忆系统** 的 Dashboard，默认主题偏暗琥珀。我们用的是它的伴生主题 **`sakura-milk`**（`dashboard.html` 里 `html[data-theme="sakura-milk"]`）。现站 `--sakura-*` 已经从这里来，**不要换盘，也不要把 Dashboard 壳（侧栏、记忆树、Reverie 面板）搬进个人主页。**

同族 [P0luz/Ombre-Brain](https://github.com/P0luz/Ombre-Brain) 是功能面板，不是 Unseen 粉色。不要当视觉参考。

### 已在用（对照即可）

- 底：`#fff7f8 → #f9e7ec → #f4dce4` + 三枚径向 orb + noise `multiply`
- 表面：乳白玻璃 `rgba(255,249,250,.72)`，线 `rgba(214,132,159,.13–.22)`
- 字：ink `rgba(82,58,68,.94)`，软墨 `rgba(92,65,76,.84)`
- 强调：`#d8849f` / `#ca6f91`，连续性暖色 `#c98763` 极少用

### 还没学到位的手艺

从 `dashboard.html` 的列表行、tab、按钮里抽，**改成 folio 语言**：

| Nocturne 做法 | 转译到 kikiarya |
|---------------|-----------------|
| `button:hover` = 边框加深 + `background: rgba(216,132,159,.09)`，几乎不放大 | Ghost / 卡 hover 先填一层 9% accent，再谈位移 |
| `.bucket-row:hover` 内边距微涨 + 行内径向高光 + 序号 `translateX(.12rem)` | Focus / 作品行：光斑 + 编号轻轻外移，**不 tilt** |
| `.flow-step::after` 底线从 `scaleX(.15)` 长到满，easing `cubic-bezier(.16,1,.3,1)` | 已有 ProjectCard 下划线；保持这根曲线 |
| 数字用 display 衬线、300 weight | 已有 `01 / 02 / 03`；hover 时变 accent-deep |
| sakura 花瓣是主题装饰，dashboard 里可关 | 封面 / `PetalField` 已够；**不要再叠一层落花雨** |

Nocturne 的科技感是：**记忆仪器长在瓷器上**。你的科技感应是：**agent 工作长在手帐上**。两边都是「温柔的系统」，不是「赛博产品页」。

---

## 4. 外站：借手艺，不借皮肤

高星英文仓大多是暗色 3D landing。粉色 GitHub 搜 `pink portfolio` 几乎全是 Barbie 模板。能接到 folio 上的如下。

### 结构与旁白

| 来源 | 借 | 不借 |
|------|----|------|
| [NEXUS / meoo demo](https://s9tyjhgv9g8p.meoo.info) | 物体钉在 CTA 后；打字机当旁白（只封面） | 黑底、4500 点粒子球、15° 卡、Agent 命令框；首页中英第二声 |
| Mashiro / Sakurairo 封面公式 | 词标 + motto；进门像翻页 / 走近纸面 | 落花雨、看板娘、pjax |
| [astro-koharu](https://github.com/cosZone/astro-koharu) · [Shoka](https://github.com/amehime/hexo-theme-shoka) | 中英并置、留白、「架 / 章」 | 粉蓝第二色、密侧栏 |

### 交互（以后、极淡）

[bchiang7/v4](https://github.com/bchiang7/v4) 的单强调色与列表 hover；Magic UI / daisy `pastel` 只看 spotlight 分层，不装库。代码/diagram 继续 blush ink，不要 Catppuccin 换盘，不要 Tokyo Night。

### 反例

Appwrite Pink、落花 canvas、y2k 粗描边、Bruno 式 3D、Awwwards 整页 WebGL、封面 Idle Ken Burns 循环。

---

## 5. 冻住 / 可动

**冻住**

- 色板 `--sakura-*`、浅粉底、玻璃
- 字体：Cormorant / Inter / JetBrains Mono（Great Vibes 仅 LAR）
- 签名装饰：lace、bow、pearl、ornament rule。不加新家族，不加樱花枝
- 封面素材：花瓣、丝带、蕾丝、`Kikiarya.`、Enter 文案（动的是镜头，不是换装饰）
- 按钮文案与 class：View work / GitHub / Resume / Enter
- Eyebrow：`Hi, I'm Kiki`、`Selected work`、`Focus`、`Now`、`Contact` 等
- `/work/[slug]` 章节结构、GSAP / Three.js、Magic UI 当主题

**可动（都穿 sakura，按 §6 同一条顺序）**

1. 封面 Enter dolly-in + Hero 接戏  
2. 封面中文格言（只封面；首页不加第二声）  
3. Focus / 作品卡光标物理 + HeroGlow 钉 CTA  
4. 封面格言一次打字机（可砍）  
5. Logo 回封面反向拉远（第二轮）

---

## 6. 统一落地顺序

现有封面（`EntryGate`）进站是词标上移淡出 + `CoverSweep` 斜向扫光，**没有镜头推进**。下面五项是一件事的五个节拍，不要拆成两套实现。

### 6.1 封面拉近（进门）

点 Enter：整层封面（词标 + 格言 + 花瓣 + 丝带）`scale 1 → ~1.08`，同时透明度到 0。easing 用现有 `[0.2, 0.7, 0.2, 1]`，约 0.7s。**词标不要再往上飘。** `CoverSweep` 可留，变淡当纸面反光，不当主事件。

Hero 接戏：`HeroLine` 从很轻的 `scale 1.04`（可带一点 blur）落到 1，叠在已有的字词上滑上。两段接上才是一扇门。

Idle：**不要** `scale 1→1.03` 循环（会晕）。呼吸 orb + 花瓣漂保持现状。指针视差可略加大远花瓣/丝带，词标几乎不动。

进站时可把 noise / vignette 略收紧再在 Hero 松开——只动 opacity，不加新纹样。

花瓣进站：优先跟着整层 scale 走；若自然，再做成轻轻吸向词标再消失。幅度要小。

`prefers-reduced-motion`：只淡出，不 scale。

文件：[`EntryGate.tsx`](../components/motion/EntryGate.tsx)、[`CoverAtmosphere.tsx`](../components/motion/CoverAtmosphere.tsx)、[`HeroReveal.tsx`](../components/motion/HeroReveal.tsx)。

### 6.2 封面中文格言（只这一处）

中文只留封面。Hero / Featured / Focus / Now / Contact **不要**再加中文第二声。按钮和 eyebrow 继续英文。英文格言仍是 Cormorant italic；封面中文用 `next/font` 的宋体（Noto Serif SC），不要套 Latin italic。

| 位置 | 英文（已有） | 中文 |
|------|----------------|------|
| 封面 | Desire is the prophet of the soul. | 「欲望是灵魂的先知。」 |

封面句写在 `CoverTypewriter` / `EntryGate`。窄屏中文可换行；英文格言的 `whitespace-nowrap` 不要套到中文上。

封面词标可加与 Hero 同级的 1–2px `hoverLift`，不要整页晃。

### 6.3 打字机只放封面（可砍）

英文格言先出 → 中文逐字打完 → **停住**。reduced-motion / 回封面时整行出现。光标：细 `--sakura-accent-deep` 竖线。不要做成 Agent 命令框，也不进 Hero（会和 `HeroLine` 抢）。封面若已够静，砍打字机，格言仍留。

### 6.4 Hover：补物理，不补倾斜

- **Focus 三卡：** 指针跟随淡粉径向光斑（约 9–12% accent）。不 tilt、不 `scale(1.05)`。不要硬套 `sakura-glass`。
- **ProjectCard：** 抬高约 4px；编号微 `translateX`。下划线已有。
- **HeroGlow：** 锚点偏向 CTA 一行。
- **作品页 figure：** hover 只亮路径/边框，不整图放大。
- **已有：** `Magnetic`、`SpecularRoot`、按钮 svg 位移、封面磁吸 Enter。

不新开粒子系统。

### 6.5 回封面拉远（第二轮）

点 Logo 回封面：与 6.1 对称的 dolly-out。现在只是切相位。第一轮可以不做。

---

## 7. 明确不做

持续 Ken Burns、粒子球、15° 卡、Hero Agent 对话框、声音、第二套签名、Magic UI 当主题、daisy `valentine`、落花雨、封面 Idle 自动拉近。

---

## 8. 美感检查

- 一节最多一个签名装饰。
- 空栏是布局 bug，不是再画一朵花。
- 正文窄、图宽。首页不要改成 dashboard 网格。
- 代码 / diagram 继续 blush ink。
- 始终 `prefers-reduced-motion`。

---

## 9. 文件（点头后按 §6 改代码）

- 新：`components/motion/CoverTypewriter.tsx`（封面中文 + Noto Serif SC）
- 改：`EntryGate.tsx`、`CoverAtmosphere.tsx`、`HeroReveal.tsx`、`app/page.tsx`、`SectionHeader.tsx`、`HeroGlow.tsx`、`ProjectCard.tsx`
- 不动：按钮 class、eyebrow、封面花瓣/蕾丝素材、`/work/[slug]` 结构、token 名

浏览器验：封面 Enter 拉近 → Hero 接戏（无中文旁白）→ Focus / 作品卡 hover → reduced-motion 只淡出。第二轮再验 Logo 回封面。

---

## 相关

- Token：[DESIGN-SYSTEM.md](../.cursor/skills/pink-style/DESIGN-SYSTEM.md)
- 结构：[sakura-layout SKILL](../.cursor/skills/sakura-layout/SKILL.md)
- 已实现动效基线：[ui-motion-plan2.md](./ui-motion-plan2.md)
- 源头 CSS：[Nocturne dashboard.html](https://github.com/Pyruslili/Nocturne-Memory-Core/blob/main/dashboard.html) `sakura-milk`

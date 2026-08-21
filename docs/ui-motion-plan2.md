# Kikiarya Website｜UI 动效与排版优化方案 v4

> **核心目标**
>
> 在保留现有 Sakura Editorial 视觉系统的基础上，重点升级网站的 **Motion Design**，并增加一个独立的“进入页（Entry Gate）”：
>
> **Entry Gate → 点击进入 → 当前首页（Index）→ Work / Résumé / Contact**
>
> 进入当前首页后，桌面端鼠标指针切换为 **Sakura Petal Cursor（花瓣指针）**，让 pointer 本身成为场景的一部分。
>
> **参考边界**
>
> - **Unseen Studio**：重点参考 opening / enter、场景式切换、pointer-driven interaction、scroll-linked motion 与 portal transition；**不复制其排版和 3D 视觉风格**。
> - **Jiro.build**：作为组件级动态效果参考库，吸收适合本站的 button / card / filter / glass / nav 微交互。
> - **Typography**：独立基于本站现有 Sakura Editorial 风格做优化，不以 Unseen 的排版为目标。
>
> **Motion Philosophy**
>
> - **Content-first**：内容与信息层级永远优先。
> - **Motion-as-narrative**：动效负责“进入 → 浏览 → 切换 → 探索”的连续叙事。
> - **Atmosphere-as-support**：氛围动效只负责空间感，不抢正文注意力。
> - **One motion language**：全站共享一致的 easing、节奏、位移幅度与交互逻辑。
> - **Remove before adding**：任何 ambient motion 如果开始抢视觉焦点，优先删除，而不是继续堆参数。

---

# 1. 信息架构与整体体验

## 1.1 页面层级

视觉上增加一个新的入口页：

```text
ENTRY GATE
    ↓ click ENTER
CURRENT INDEX / HOME
    ↓
WORK / RÉSUMÉ / CONTACT
```

### 推荐实现方式

**视觉上是独立首页，技术上不要新增 `/enter` 路由。**

建议：

- `/` 仍然是当前首页；
- 在 `/` 顶层渲染一个 full-screen `EntryGate`；
- 用户点击 `ENTER` 后，EntryGate 通过 transition 消失；
- 下方当前 Hero 页面直接 reveal；
- 避免额外 route、history/back 行为和二次页面加载。

这样既有“进入网站”的仪式感，又不会破坏 SEO、导航和浏览器返回逻辑。

---

## 1.2 Entry Gate 显示规则

推荐默认：

- 新标签页 / 新浏览会话第一次访问显示；
- 进入后，在当前 session 内点击 Logo / INDEX 返回首页时 **不再次显示**；
- 使用 `sessionStorage` 记录 `kikiarya-entered=true`；
- 若后续想做“每次刷新都显示”，可以再改为不持久化该状态。

---

# 2. Entry Gate（新增首页 / 进入页）

> 这是对 Unseen “先进入一个世界，再看到真实内容”体验的 Sakura 化转译。

## 2.1 视觉构成

保持极简，不做信息堆叠。

建议只包含：

```text
Kikiarya.

A quiet interface for
AI, software and experiments.

        [ ENTER ↘ ]

       small metadata
```

背景：

- 暖白 / blush；
- Sakura glow；
- 极淡 grain；
- 1–2 个非常淡的抽象花瓣 / 圆环；
- 不出现项目卡片、技能标签、社交链接等内容。

### 目标

Entry Gate 不是一个新的完整 Landing Page。

它只是：

> **进入 Kikiarya 世界之前的一个短暂“门厅”。**

---

## 2.2 Entry Gate Ambient Motion

进入页本身保持非常安静：

```text
Sakura glow breathing
period：12–18s
scale：1 → 1.02~1.03
opacity delta：≤ 10%
```

可以有 1–2 个装饰元素：

```text
y drift：≤ 10px
rotation：≤ 3deg
duration：12–20s
```

禁止：

- 大量粒子；
- butterfly trail；
- 复杂 cursor；
- marquee；
- scroll；
- 自动播放很强的 portal。

---

# 3. ENTER Transition（入口页 → 当前首页）

> 这是新的第一个 Signature Motion。

用户点击 `ENTER` 后，不做普通 fade-out。

推荐设计成 **Sakura Aperture / Petal Reveal**。

## 3.1 Trigger

触发方式：

- mouse click；
- keyboard Enter / Space；
- transition active 时禁止重复触发。

---

## 3.2 Transition Timeline

推荐：

```text
0ms
- ENTER active state
- button scale 1 → .985

80ms
- Entry title / metadata opacity 1 → .6

120–360ms
- 中心 Sakura ring / soft radial glow 扩散

250–520ms
- Entry content opacity .6 → 0
- background bloom scale 1 → 1.04

380–700ms
- 当前首页 Hero background 从 veil 后出现

520–900ms
- EntryGate dissolve / unmount
- 当前 Navbar / Eyebrow / Hero 开始 reveal

900ms+
- Main Index 成为 active scene
- Petal Cursor 开启
```

总视觉时间：

```text
≈ 700–1000ms
```

不建议超过 1 秒太多，否则“进入”会显得拖沓。

---

## 3.3 Transition 视觉

可以使用：

- fixed overlay；
- radial-gradient；
- CSS mask / clip-path；
- Framer Motion scale / opacity；
- Sakura ring；
- soft pink bloom。

不使用：

- 黑洞；
- glitch；
- WebGL；
- shader；
- 大范围 blur；
- 旋转隧道。

### 目标

借鉴 Unseen 的：

```text
Enter → Scene Change
```

但翻译成：

```text
Sakura Gate → Main Portfolio
```

---

# 4. Petal Cursor（进入后的花瓣鼠标指针）

> **进入当前首页之后，桌面端 pointer 切换成 Sakura Petal Cursor。**

这比普通粉色圆点 cursor 更符合本站视觉，也更接近 Unseen“pointer 是场景一部分”的思路。

## 4.1 基础形态

建议使用一个非常简洁的 SVG / CSS 花瓣轮廓：

```text
默认尺寸：14–18px
颜色：--sakura-accent-deep
opacity：0.75–0.9
rotation：轻微随移动方向变化
```

视觉上应更接近：

```text
single sakura petal
```

而不是：

```text
flower emoji / 真实花朵图片 / 蝴蝶贴图
```

保持 editorial。

---

## 4.2 Pointer Tracking

- 仅 `(pointer: fine)`；
- 使用 `requestAnimationFrame` 或 Framer Motion motion value；
- pointer follower 保持轻微 inertia；
- 不使用明显 spring bounce；
- `pointer-events: none`；
- `z-index` 高于普通内容，但低于 modal / menu overlay。

建议：

```text
follow latency：非常轻
视觉滞后：约 20–40ms 感知
```

重点是“顺”，不是“拖”。

---

## 4.3 Hover State

### 普通区域

单花瓣跟随。

### Hover `a / button / ProjectCard`

花瓣可：

```text
scale：1 → 1.12
rotation：+8~12deg
opacity：0.85 → 1
```

同时组件自身继续执行 hover feedback。

不要把 cursor 放大成巨大圆环。

---

## 4.4 Click State

点击时可以做极短：

```text
scale：1 → .85 → 1
```

或生成：

```text
1–2 个 ghost petals
```

生命周期：

```text
300–500ms
```

作为点击反馈。

不要每次点击爆出大量花瓣。

---

## 4.5 Optional Petal Trail

花瓣 cursor 本身已经足够有识别度。

因此 trail 降为 **可选增强**。

只建议在：

- Hero 空白区域；
- Work / Projects 场景；

启用非常轻的 ghost trail。

参数：

```text
每次 1–2 个
生命周期：500–800ms
同屏 ≤ 6–8
opacity peak ≤ .25
```

如果视觉测试后显得“可爱过头”或影响专业感：

> **保留 Petal Cursor，删除 Trail。**

---

## 4.6 Cursor Exceptions

以下位置恢复原生 cursor 或不渲染 Petal Cursor：

- text input；
- textarea；
- editable content；
- iframe；
- browser-native controls；
- drag/resize 场景。

移动端 / touch：

```text
完全关闭
```

`prefers-reduced-motion`：

```text
保留静态小花瓣或直接恢复原生 cursor
```

建议默认直接恢复原生 cursor。

---

# 5. Current Home / Index Opening Sequence

点击 Entry Gate 后，当前首页开始 reveal。

顺序：

```text
Navbar
  ↓
Eyebrow
  ↓
Hero
  ↓
Description
  ↓
CTA
  ↓
Based-in Card
  ↓
Ambient Motion
```

## 5.1 Timeline

```text
0ms      Navbar start
100ms    Eyebrow
240ms    Hero line 1
360ms    Hero line 2
480ms    Hero line 3
820ms    Description
960ms    CTA
1080ms   Based-in Card
1200ms+  ambient fully active
```

因为前面已经有 Entry transition，所以这里比原方案略缩短，避免：

```text
Entry 1s + Hero 2s = 用户等太久
```

---

# 6. Hero Grouped Mask Reveal

Desktop 首选语义换行：

```text
AI applications,
machine learning,
software engineering.
```

## 参数

```text
word stagger：0.035–0.05s
line gap：0.10–0.14s
duration：900–1100ms
translateY：105% → 0
opacity：0.4 → 1
ease：--ease-reveal
```

结构：

- line 是一级 group；
- word 是二级 stagger；
- 不做逐字母动画。

### Do

- mask reveal；
- grouped timing；
- transform + opacity。

### Don't

- spring；
- bounce；
- scale 0.8 → 1；
- 强 blur；
- 每个字母分别 reveal。

---

# 7. Hero → Work Scene Transition

> **这是第二个核心 Signature Motion，对齐 Unseen `View our work` 的连续场景感。**

目标不是：

```text
button click → smooth scroll
```

而是：

> **Hero Scene 自然流入 Projects Scene。**

---

## 7.1 Trigger

- Click `VIEW WORK`；
- Keyboard Enter / Space；
- transition active 时忽略重复触发；
- 已接近 Work section 时不重复完整 scene transition。

---

## 7.2 Navigation Model

采用：

> **Scroll-driven Scene Transition**

```text
VIEW WORK click
      ↓
programmatic smooth scroll
      ↓
scroll progress 驱动 Hero / Background / Projects
```

不采用“固定动画播放完再突然跳到 Work”。

---

## 7.3 Progress Mapping

### 0.00–0.20

- Hero 保持；
- CTA arrow / active feedback；
- Hero background 仍为 initial state。

### 0.20–0.45

```text
Description opacity：1 → 0
CTA opacity：1 → 0
Hero y：0 → -8~-12px
```

### 0.30–0.65

```text
Sakura glow scale：1 → 1.03~1.04
background offset：≤ 8px
Projects atmosphere：0 → .6
```

### 0.50–0.80

- Projects background decoration 渐入；
- eyebrow reveal；
- section title reveal。

### 0.65–0.90

- Filter reveal；
- first row cards stagger；
- Based-in Card 自然退出 Hero composition。

### 0.80–1.00

- Projects scene fully active；
- Hero fully out；
- ambient background 切换为 Work state。

---

## 7.4 Programmatic Scroll

目标：

```text
#work / #selected-projects
```

视觉时长：

```text
≈ 900–1200ms
```

实际以 scroll distance + easing 为准，不用阻塞式 timeout。

---

# 8. Projects Scene Atmosphere

Projects 不能突然变成一个普通白色 Grid。

背景继续保持 Scene 感：

- extremely subtle rings；
- abstract arch；
- blurred sakura glow；
- grain；
- occasional petal silhouette。

层级：

```text
Project Cards / Text        100%
Decorative Forms            8–15%
Glow                         subtle
Grain                        very subtle
```

---

# 9. ProjectCard Motion

Hover：

```text
surface tint
+
index muted → accent
+
title underline reveal
+
arrow displacement
+
metadata color transition
```

参数：

```text
card translateY：0 → -1~-2px
arrow：2–3px
underline：≈450ms
surface：≈300ms
```

不动画：

- padding；
- width；
- height。

不做：

- 3D tilt；
- rotate；
- scale > 1.01；
- strong shadow；
- spring overshoot。

---

# 10. Filter Pill

```text
ALL / AI / WEB / RESEARCH
```

使用：

```text
layoutId="filter-pill"
AnimatePresence mode="popLayout"
```

参数：

```text
exit：150–200ms
enter stagger：50–80ms
```

要求：

- shared sliding background；
- 页面高度变化不能明显 jump；
- reduced-motion 直接切状态。

---

# 11. Buttons

## Primary

Hover：

```text
arrow translate(2px, -2px)
shadow ↑ slightly
background tint ↑ slightly
```

Active：

```text
scale(.985)
```

## Secondary

Hover：

```text
border → accent
text → accent-dark
icon translate 2px
```

禁止：

- bounce；
- glow loop；
- liquid distortion；
- aggressive scale。

---

# 12. Navbar

Hover：

- index opacity `.6 → 1`；
- text color transition；
- active indicator 保持稳定；
- 可选极轻 letter-spacing。

限制：

```text
letter-spacing delta ≤ .01em
```

如果肉眼明显看到字被“拉开”，删除。

点击主导航时触发 Route Sakura Veil。

---

# 13. Based-in Card

Entry：

```text
opacity 0 → 1
y 14px → 0
```

Hover：

```text
y 0 → -2px
border contrast ↑
shadow ↑ slightly
```

不做：

- floating loop；
- pointer follow；
- rotation；
- pulse；
- parallax。

---

# 14. Route Sakura Veil

页面切换使用共享 atmospheric transition。

## Timeline

```text
0–150ms
Current content opacity .95 → .6

100–350ms
Sakura veil radial / bloom expansion

250–400ms
route change

350–650ms
veil dissolve

450–750ms
new page entrance
```

总视觉时间：

```text
≈ 500–800ms
```

Navbar 尽量保持稳定，形成 continuity。

Reduced motion：

```text
immediate route + ≤150ms opacity
```

---

# 15. Portal Transition（P3 / Optional）

只有未来真实存在：

- AI Lab；
- Playground；
- Experiments；
- Interactive demo；

才实现。

入口例如：

```text
KIKIARYA   [ ○ ]   LAB
```

点击：

```text
Sakura ring
→ radial mask
→ full veil
→ route change
→ dissolve
→ Lab scene
```

借鉴 Unseen WORLD 的“进入另一空间”概念，但不复制：

- 黑洞；
- glitch；
- wireframe globe；
- Three.js；
- shader。

第一版只用 CSS + Framer Motion。

---

# 16. Global Ambient Motion

## Sakura Breathing

```text
period：10–18s
scale：1 → 1.02~1.04
opacity delta：≤ 10%
```

## Pointer-follow Glow

```text
x：±8–12px
y：±4–8px
```

只作用背景。

## Decorative Parallax

```text
y：±10–24px
opacity：≤ .15
```

只作用无语义 decoration。

## Grain

- 极轻；
- 静态或低频；
- 不影响文字清晰度。

---

# 17. Responsive Motion Strategy

## Desktop ≥ 1024px

完整：

- Entry Gate；
- Petal Cursor；
- grouped Hero reveal；
- Hero → Work Scene；
- Route Veil；
- pointer-follow glow；
- decorative parallax；
- optional petal trail；
- Lenis optional。

## Tablet 768–1023px

简化：

- Entry Gate 保留；
- Hero reveal 保留；
- Scene Transition 简化；
- parallax 50%；
- Petal Cursor / Trail 默认关闭；
- Route Veil 简化。

## Mobile < 768px

保留核心叙事：

- Entry Gate；
- tap ENTER；
- native scroll；
- Hero reveal 简化；
- section reveal；
- button / card state；
- light route transition。

关闭：

- custom cursor；
- pointer trail；
- mouse-follow；
- decorative parallax；
- Lenis；
- complex Portal。

---

# 18. Reduced Motion

`prefers-reduced-motion` 下关闭：

- Lenis；
- Petal Cursor motion / trail；
- parallax；
- pointer-follow；
- ambient loops；
- portal scale；
- long transform；
- stagger。

保留必要反馈：

```text
≤150ms opacity / color / border
```

所有核心信息必须在无动画状态下完整可用。

---

# 19. Motion Tokens

```css
:root {
  --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  --dur-micro: 200ms;
  --dur-short: 450ms;
  --dur-route: 650ms;
  --dur-reveal: 900ms;
  --dur-hero: 1100ms;
  --dur-enter: 850ms;
}
```

不使用：

- bounce；
- elastic；
- obvious spring；
- strong overshoot；
- flashing；
- repeated scale pulse；
- high-frequency background motion。

---

# 20. Typography Optimization

Typography 独立于 Unseen。

## Tokens

```css
:root {
  --fs-hero:    clamp(3.4rem, 8vw, 8.2rem);
  --fs-chapter: clamp(2.6rem, 5.5vw, 5.4rem);
  --fs-title:   clamp(1.6rem, 2.2vw, 2rem);
  --fs-body:    1rem;
  --fs-body-sm: 0.875rem;
  --fs-meta:    0.75rem;
  --fs-eyebrow: 0.75rem;
}
```

## Hero Desktop

优先：

```text
AI applications,
machine learning,
software engineering.
```

避免 Desktop：

```text
AI applications,
machine learning,
software
engineering.
```

实现：

- Hero container 略加宽；
- desktop max font size 略收；
- semantic line grouping；
- 中小屏允许自然换行。

## General Rules

- mono metadata ≥ `12px`；
- body `16px / line-height ≈ 1.7`；
- H2 → `--fs-chapter`；
- H3 / Resume Entry → `--fs-title`；
- 正文行长 `60–68ch`；
- display 中文 fallback：

```css
"Songti SC", "STSong", "Noto Serif SC", serif
```

- 导航编号 / 年份保持 lining numerals；
- 对齐数字使用 `font-variant-numeric: tabular-nums`。

---

# 21. Component / File Architecture

建议新增：

```text
components/
├── motion/
│   ├── MotionProvider.tsx
│   ├── EntryGate.tsx
│   ├── EnterTransition.tsx
│   ├── PetalCursor.tsx
│   ├── PetalTrail.tsx            # optional
│   ├── HeroReveal.tsx
│   ├── SceneTransition.tsx
│   ├── RouteVeil.tsx
│   ├── Reveal.tsx
│   ├── SmoothScroll.tsx
│   └── PortalTransition.tsx      # optional
│
├── Navbar.tsx
├── ProjectCard.tsx
├── ProjectIndex.tsx
├── BasedInCard.tsx
└── Footer.tsx
```

### `EntryGate.tsx`

负责：

- full-screen 入口；
- session state；
- keyboard access；
- ENTER interaction。

### `EnterTransition.tsx`

负责：

- radial Sakura aperture；
- veil；
- Entry → Index scene handoff。

### `PetalCursor.tsx`

负责：

- desktop custom pointer；
- hover / click state；
- reduced-motion / pointer capability detection。

### `PetalTrail.tsx`

只作为 optional enhancement。

### `SceneTransition.tsx`

负责：

- Hero → Work scroll progress；
- background scene interpolation；
- Projects reveal。

---

# 22. State Model

建议不要靠多个 boolean 随意控制。

统一定义：

```text
ENTRY
  ↓
ENTERING
  ↓
INDEX
  ↓
SCENE_TRANSITION
  ↓
WORK
```

Route navigation 额外：

```text
INDEX / WORK / RESUME / CONTACT
        ↓
ROUTE_TRANSITION
        ↓
NEXT_ROUTE
```

这样：

- Petal Cursor 只在 `INDEX / WORK / RESUME / CONTACT` active；
- Entry Gate 不显示 Petal Cursor；
- Transition active 时防止重复触发；
- reduced-motion 可以从 state 层统一降级。

---

# 23. Priority

## P0 — 必做

1. Typography tokens；
2. Entry Gate；
3. Enter → Index Sakura Transition；
4. Petal Cursor；
5. Hero grouped mask reveal；
6. Button micro-interaction；
7. ProjectCard hover；
8. Filter sliding pill；
9. Section Reveal。

## P1 — Motion 核心

1. Hero → Work Scene Transition；
2. Projects atmospheric background；
3. Route Sakura Veil；
4. Sakura ambient motion；
5. Navbar / content choreography。

## P2 — Environmental Enhancement

1. pointer-follow glow；
2. decorative parallax；
3. optional Petal Trail；
4. Lenis；
5. glass polish。

## P3 — Experimental

1. Kikiarya Lab / Playground；
2. Sakura Portal；
3. 更复杂的 scene distortion。

---

# 24. Implementation Order

## Phase 1 — Entry + Typography

- Typography tokens；
- Entry Gate；
- Enter Transition；
- Hero desktop line grouping；
- Hero reveal；
- Petal Cursor。

先完成：

```text
打开网站
→ 点击 ENTER
→ Sakura transition
→ 当前首页 reveal
→ 花瓣 cursor 接管
```

这是一条完整体验链。

---

## Phase 2 — Core Interaction

- Button；
- Navbar；
- ProjectCard；
- Filter Pill；
- Section Reveal；
- Based-in polish。

---

## Phase 3 — Unseen-style Scene Motion

重点实现：

```text
VIEW WORK
    ↓
Hero Scene
    ↓
Sakura spatial transition
    ↓
Projects Scene
```

以及：

- Projects atmospheric background；
- Route Sakura Veil。

---

## Phase 4 — Environment

- pointer-follow glow；
- decorative parallax；
- optional Petal Trail；
- Lenis。

完成后必须做一次 **subtraction review**：

> 如果任何 ambient effect 比 Hero / Work 内容更抢眼，删除该效果。

---

## Phase 5 — Portal Experiment

只有 Lab / Playground 成为真实功能后实现。

---

# 25. Performance Rules

主要动画优先：

```text
transform
opacity
clip-path / mask（有限）
```

避免动画：

```text
padding
width
height
top / left
continuous large blur
continuous large box-shadow
```

Petal Cursor：

- 单个 SVG；
- rAF / motion value；
- 不持续创建 DOM。

Petal Trail：

- max `6–8`；
- pointer fine only；
- velocity threshold；
- 生命周期结束立即销毁。

第一版不新增：

- Three.js；
- GSAP；
- WebGL；
- shader dependency。

---

# 26. 最终 Motion Map

```text
ENTRY
 ├── Entry Gate
 ├── Sakura Ambient
 └── ENTER
       ↓
   Sakura Aperture
       ↓
MAIN INDEX
 ├── Petal Cursor
 ├── Hero Grouped Reveal
 ├── Based-in
 ├── Sakura Breathing
 └── VIEW WORK
       ↓
   Scroll-driven Scene Transition
       ↓
PROJECTS
 ├── Atmospheric Background
 ├── Section Reveal
 ├── ProjectCard Motion
 ├── Filter Pill
 └── optional Petal Trail

GLOBAL NAVIGATION
 └── Sakura Route Veil

OPTIONAL WORLD
 └── LAB / PLAYGROUND
       ↓
   Sakura Portal
```

---

# 27. 最终体验目标

用户第一次打开网站：

> 先看到一个极简 Sakura Entry Gate。

点击 `ENTER`：

> 页面通过 Sakura aperture / bloom 自然打开，而不是普通 fade。

当前首页出现：

> Navbar、Hero、CTA 按层级 reveal。

与此同时：

> 桌面鼠标变成一个极简 Sakura Petal Cursor。

移动鼠标：

> 花瓣轻微随速度调整方向，但不抢内容。

点击 `VIEW WORK`：

> Hero 不是简单滚走，而是自然流入 Projects Scene。

进入 Work：

> 卡片、背景和 pointer 仍属于同一个“世界”。

切换 Résumé / Contact：

> Sakura Veil 维持连续性。

最终应该让用户感觉：

> **“我进入了一个完整的 Sakura digital world。”**

而不是：

> **“这个网站有很多动画。”**



## 首页第二入口：Personal World

首页继续保留现在的主入口：

**ENTER ↘**
→ 进入现有的 Work / Portfolio 网站。

除此之外，在首页**底部正中央**新增一个独立的 Personal World 入口，交互参考 Unseen Studio 首页底部的 `UNSEEN ◉ WORLD` 按钮，但视觉语言改成 Kikiarya 自己的 Sakura 系统。

---

## 1. Default State

默认状态下，页面底部只显示一个**白色圆形按钮**。

圆形中央不是 globe，而是一朵极简的 Sakura / Flower icon：

**✿**

视觉结构：

`　　　　✿　　　　`

建议：

* 圆形尺寸约 `48–54px`
* 白色或略带暖粉的半透明背景
* 极轻的 border
* 极柔和阴影
* 花朵使用当前网站的 berry / dusty rose 色
* 放置于页面底部中央
* 位于 `SYDNEY · AI & SOFTWARE · 2026` 上方
* 与底部文字保留足够距离，不产生拥挤

这里不要提前显示 `NOTES` 或 `LIFE`。

默认状态必须保持现在首页的极简感。

---

## 2. Hover State

鼠标移动到花朵按钮后，参考 Unseen 的交互：

**中央圆形 icon 仍然留在原来的位置，不移动。**

同时：

* `NOTES` 从中央左侧出现
* `LIFE` 从中央右侧出现
* 两侧文字向外展开
* 中央花朵成为左右两个世界之间的视觉分隔点

最终：

**NOTES　　✿　　LIFE**

而不是：

`[ NOTES ✿ LIFE ]`

也就是说，**不要做成传统 capsule / pill button**。

整体仍然应该像三个独立元素，只是在 Hover 时组成一组。

---

## 3. Central Flower Hover Transformation

参考 Unseen 默认白色 globe button → Hover 后黑色中央 globe 的视觉反转。

Kikiarya 可以做对应变化：

### Default

白色圆形背景
＋
berry / dusty rose 花朵

### Hover

圆形背景逐渐变成深 berry：

**#8F3D5D / 当前网站主强调色**

同时：

花朵：

**berry → ivory / white**

形成非常轻微的反色效果。

即：

`○ ✿`

↓

`NOTES　 ●✿　 LIFE`

中央 circle 仍然是整个 interaction 的 anchor。

---

## 4. Reveal Animation

Hover 动画不要让 `NOTES` 和 `LIFE` 突然出现。

动画过程：

**Stage 01 — Flower reacts**

花朵按钮轻微缩放：

`scale(1) → scale(1.05)`

同时背景颜色开始反转。

约：

`150–200ms`

---

**Stage 02 — Space opens**

中央按钮左右逐渐产生视觉空间。

不是 circle 本身被拉长，而是整个 interactive wrapper 的宽度：

`52px → approximately 220–260px`

中央花朵位置保持不变。

---

**Stage 03 — Typography appears**

左侧：

`NOTES`

从中央附近：

`translateX(+10px)`

移动至正常位置：

`translateX(0)`

同时：

`opacity: 0 → 1`

右侧 `LIFE` 做镜像运动：

`translateX(-10px) → 0`

形成一种：

**文字从花朵背后被释放出来**

的感觉。

---

## 5. Final Hover Composition

Hover 完成后：

**NOTES　　　 ✿ 　　　LIFE**

视觉上参考 Unseen：

**UNSEEN　　◎　　WORLD**

但不要完全复制其 typography。

Kikiarya 版本应该更加 editorial、轻盈和 feminine。

建议：

`NOTES`

* uppercase
* 小字号
* 微 letter-spacing
* 当前网站 sans-serif

`LIFE`

同样处理。

中央 Sakura 则作为唯一装饰元素。

---

## 6. Hover NOTES / LIFE

整个区域展开以后，用户可以继续把鼠标移动到：

**NOTES**

或：

**LIFE**

### Hover NOTES

NOTES：

`opacity 0.65 → 1`

并产生非常轻微的：

`translateY(0 → -2px)`

可以在文字下方出现一根极短、极细的线。

中央花朵无需再次变化。

点击：

→ `/notes`

---

### Hover LIFE

同样：

`opacity 0.65 → 1`

`translateY(0 → -2px)`

点击：

→ `/life`

---

## 7. Mouse Leave

鼠标离开整个 interactive wrapper，而不是单独离开花朵 circle 后：

先：

`NOTES / LIFE opacity → 0`

并轻微向中央收回。

随后：

中央 circle：

深 berry → white

花朵：

white → berry

wrapper：

`220–260px → 52px`

最终重新只剩：

**✿**

整个过程应该非常平滑。

---

## 8. Motion Timing

不要使用普通 SaaS UI 那种非常快的 `150ms ease-in-out`。

这个首页的氛围更接近 editorial / cinematic interface。

推荐：

**展开**

`500–650ms`

**文字出现 delay**

`80–120ms`

**收起**

`400–500ms`

Easing 可以使用偏自然、柔和的曲线，例如：

`cubic-bezier(0.22, 1, 0.36, 1)`

整体感觉应该是：

**soft / floating / deliberate**

而不是：

**snappy / mechanical**

---

## 9. Information Architecture

最终首页只承担三个一级入口：

### ENTER ↘

进入：

**WORK**

现有 AI / Software Engineering / Research / Projects 内容。

---

### NOTES

进入：

**THOUGHTS**

包括：

* Notes
* AI / Tech
* Design
* Random thoughts
* Bookmarks / Finds

---

### LIFE

进入：

**PERSONAL**

包括：

* About
* Now
* Photos
* Travel
* Favorites / Collections

因此首页实际上形成三个维度：

**WORK**
*What I build.*

**NOTES**
*What I think.*

**LIFE**
*How I live.*

---

## 10. Final Homepage Interaction

页面初始：

`                         Kikiarya.`

`          A quiet interface for AI, software and experiments.`

`                         ENTER ↘`

`                            ✿`

`               SYDNEY · AI & SOFTWARE · 2026`

鼠标移动到底部花朵：

`                    NOTES　 ✿　 LIFE`

鼠标离开：

`                            ✿`

---

### Core Design Rule

这个组件的重点不是增加一个“导航栏”。

它应该像一个**隐藏在首页里的第二世界入口**。

所以必须保持：

**Default = one flower**

**Hover = NOTES ✿ LIFE**

**Leave = one flower**

不要默认展示三个按钮，也不要把它做成明显的 navigation pill。

首页仍然应该首先是一张安静、极简的 Kikiarya Cover；只有用户主动靠近花朵时，Personal World 才被揭示出来。

# UI 动效与排版优化方案

> 参考：[unseen.co](https://unseen.co/)（编辑感大字排版 + 细腻的文字/滚动动效）与 [jiro.build](https://jiro.build/)（组件级微交互 + marquee + 卡片 hover 质感）。
> 约束：遵循 `.cursor/skills/pink-style/DESIGN-SYSTEM.md` —— 柔和、缓慢、不弹跳；easing 统一 `cubic-bezier(0.16, 1, 0.3, 1)`；尊重 `prefers-reduced-motion`。

---

## 1. 参考网站的可借鉴点拆解

### unseen.co（借鉴"氛围与文字动效"）

| 效果 | 说明 | 本站适配 |
|------|------|----------|
| 逐词/逐行遮罩揭示 | 标题按 word 切分，从遮罩内滑出，层层错开 | Hero 标题从"逐行"升级为"逐词"stagger，揭示更细腻 |
| 平滑滚动（Lenis） | 滚轮带惯性阻尼，全站动效跟手 | 引入 `lenis`，全站惯性滚动 |
| 自定义光标 | 小圆点跟随，悬停可交互元素时放大 | 粉色小圆点光标，hover 链接时放大成圆环（仅桌面指针设备） |
| 大字号编辑排版 | 超大 serif 标题 + 极小 mono 元信息的对比 | 已有雏形，强化对比（见排版部分） |
| 滚动视差 | 背景/装饰元素随滚动缓慢位移 | 仅用于 Hero 装饰卡与背景光斑，轻量视差，避免过载 |
| 页面切换过渡 | 路由切换时内容淡出/淡入 | 用 `app/template.tsx` 做统一的入场过渡 |

### jiro.build（借鉴"组件微交互"）

| 效果 | 说明 | 本站适配 |
|------|------|----------|
| 卡片 hover 质感 | hover 时轻微抬升 + 背景 tint + 箭头位移 | ProjectCard hover：整行背景淡粉 tint、序号变色、箭头滑动 |
| Marquee 滚动条带 | 技能/logo 无限横向滚动 | 首页 Focus 区下方加技能关键词 marquee（CSS 动画，hover 暂停） |
| 网格错峰入场 | 卡片按 index 递增 delay 入场 | 已有，统一 delay 节奏并封装 stagger 容器 |
| 按钮图标滑动 | hover 时箭头/图标做 x 位移 | 所有 button-primary / ghost 的箭头统一加位移动画 |
| 数字滚动计数 | 统计数字滚动到位 | Résumé 页 WAM/GPA 等数字可选用（低优先级） |

---

## 2. 动效设计原则（全站统一 token）

```css
/* globals.css 新增 */
:root {
  --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);   /* 入场揭示 */
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);     /* hover / 状态切换 */
  --dur-micro: 200ms;    /* hover、按钮 */
  --dur-short: 450ms;    /* 下划线、tab 切换 */
  --dur-reveal: 900ms;   /* 区块入场 */
  --dur-hero: 1200ms;    /* Hero 标题 */
}
```

- **不使用**：bounce/spring 弹跳、<100ms 的布局变化、文字渐变闪烁。
- **必须**：所有 JS 动效经 `useReducedMotion` 降级；CSS 动画走 `prefers-reduced-motion` media query（已有全局兜底）。
- 视差幅度 ≤ 40px，只作用于装饰元素，不影响正文可读性。

---

## 3. 全局层动效（新增基础设施）

### 3.1 平滑滚动 — `lenis`
- 新增依赖 `lenis`，封装 `components/SmoothScroll.tsx`（client），在 `layout.tsx` 包裹 main。
- `lerp: 0.1`，触屏禁用（保持原生手感）；`prefers-reduced-motion` 时不启用。

### 3.2 页面切换过渡 — `app/template.tsx`
- 新建 `template.tsx`：路由切换时内容 `opacity 0→1, y 12→0`，600ms，`--ease-reveal`。

### 3.3 自定义光标 — `components/Cursor.tsx`
- 8px 粉色圆点（`--sakura-accent-deep`），`mix-blend-mode: multiply`；
- hover `a / button` 时过渡为 36px 半透明圆环；
- 仅 `(pointer: fine)` 设备渲染，用 framer-motion `useSpring` 跟随（damping 高、无弹跳）。

### 3.4 背景氛围升级
- 现有 `sakura-breath` 光斑保留；追加**鼠标缓动跟随**：光斑层随指针做 ±2% 位移（CSS 变量 + rAF 节流）。
- Hero 区可选加 1–2 个极淡的线条爱心/圆环装饰，随滚动做轻微视差（`useScroll` + `useTransform`）。

### 3.5 滚动进度指示（可选，低优先级）
- 顶部 2px 粉色进度条（`scaleX` 绑定 `useScroll().scrollYProgress`），仅在内页显示。

---

## 4. 组件级动效

### 4.1 Hero（`app/page.tsx` + `HeroReveal.tsx`）
- `HeroLine` 升级为 `HeroWords`：按词切分，每词独立遮罩上滑，词间 stagger 0.04s，行间 0.12s；
- 副标题、按钮组保持 FadeUp，delay 顺延；
- 右侧 "Based in" 玻璃卡：入场后加 6s 极缓的 `y ±4px` 浮动 loop；hover 轻微抬升。

### 4.2 Navbar（`components/Navbar.tsx`）
- 保留 layoutId 下划线；
- 链接 hover 增加：编号 `01` 透明度 0.6→1 + 文字颜色过渡（已有部分，统一到 `--dur-micro`）；
- 移动端全屏菜单：现有 stagger 保留，菜单项 hover 时序号右移 4px。

### 4.3 按钮（`globals.css`）
- `button-primary` / `button-ghost` 内的箭头图标：hover 时 `translate(2px, -2px)`（外链感）或 `translateX(3px)`；
- primary hover 增加柔和的粉色投影 `0 8px 24px rgba(169,71,109,.25)`；
- 新增 `.icon-nudge` 工具类统一处理。

### 4.4 ProjectCard（`components/ProjectCard.tsx`）
- hover 整行：背景过渡到 `--sakura-surface-soft` 圆角块（padding 内缩动画避免跳动）；
- 序号 `01` 颜色 muted→accent；
- 标题下加 accent 下划线 `scaleX 0→1`（origin-left，450ms）；
- "Open" 箭头已有位移，补充 mono 文字颜色过渡。

### 4.5 ProjectIndex 筛选（`components/ProjectIndex.tsx`）
- 筛选 pill 的选中态改用 `layoutId="filter-pill"` 滑动背景（类似 nav 下划线的胶囊版）；
- 列表切换用 `AnimatePresence mode="popLayout"`，卡片退场 `opacity 0` 200ms、进场错峰。

### 4.6 技能 Marquee（新组件 `components/Marquee.tsx`）
- 首页 Focus 区后加一条：mono 大写技能词 + `·` 分隔，两行反向滚动；
- 纯 CSS `@keyframes marquee`，40s 线性循环，hover `animation-play-state: paused`；
- reduced-motion 时静态展示为可换行的 tag 列表。

### 4.7 Résumé 页（`app/resume/page.tsx`）
- 左侧锚点导航加 scroll-spy：当前 section 高亮 accent + 前置短横线 `scaleX` 展开；
- 每个 `Entry` 用 `Reveal` 包裹（当前是纯静态服务端组件 → 提取 client 包装或直接复用 `Reveal`）；
- Skills 标签逐个错峰淡入（stagger 0.03s）。

### 4.8 Contact / 页脚 CTA
- "Get in touch" 大标题 hover 时整体轻微 skew/位移 → **不做**（违反 pink-style"不浮夸"原则）；改为 email 按钮箭头动画 + 玻璃卡 hover 提亮；
- Footer 增加入场 Reveal，email 链接 hover 下划线 scaleX。

---

## 5. 排版与字号优化

### 5.1 建立字号 token（globals.css）

```css
:root {
  --fs-hero:    clamp(3.4rem, 8vw, 8.2rem);   /* 首页/内页大标题，略收敛避免溢出 */
  --fs-chapter: clamp(2.6rem, 5.5vw, 5.4rem); /* 区块 H2（现 text-4xl~6xl 统一收口） */
  --fs-title:   clamp(1.6rem, 2.2vw, 2rem);   /* 卡片/条目 H3（现 text-3xl 偏大，收小） */
  --fs-body:    1rem;      /* 正文（Inter 300/400，line-height 1.7） */
  --fs-body-sm: 0.875rem;  /* 次要说明 */
  --fs-meta:    0.75rem;   /* mono 元信息（现 10px 太小，升到 12px） */
  --fs-eyebrow: 0.6875rem; /* eyebrow 保持 11px */
}
```

### 5.2 具体调整点

| 位置 | 现状 | 调整 |
|------|------|------|
| 导航/页脚 mono 标签 | `text-[10px]` | 升到 `text-xs`（12px），tracking 从 .14em 降到 .12em，可读性更好 |
| Hero H1 | `clamp(3.6rem,8.5vw,8.8rem)`，leading `.88` | 用 `--fs-hero`；leading 提到 `.92`（Cormorant 下行字母 g/y 目前有裁切风险） |
| 各内页 H1 | 三个页面 clamp 各不相同 | 统一 `--fs-hero`，视觉节奏一致 |
| Section H2 | `text-4xl md:text-6xl` | 统一 `--fs-chapter`，leading 1.02 |
| 卡片/Entry H3 | `text-3xl`（30px，偏大偏挤） | 统一 `--fs-title`，与正文层级差更合理 |
| 正文 | `text-sm`（14px）与 `text-lg` 混用 | 常规正文统一 16px / line-height 1.7；Hero 引导语保留 `text-lg md:text-xl` |
| Focus 卡序号 `01` | `text-4xl` | 保留，但颜色维持 muted-soft，hover 时变 accent |
| Résumé Profile 段 | `text-3xl md:text-4xl` serif 段落 | 保留 serif 但降到 `--fs-title` 上限 +italic，更"引言"感 |
| 中文字体 | body 已含 PingFang SC | display 中文回退加 `"Noto Serif SC"`（仅 CSS fallback，不加载 webfont），中文标题不再回退到无衬线 |

### 5.3 细节规则
- 所有 mono 标签最小字号 **12px**（无障碍底线）；
- 正文行长控制 `max-w-2xl`（约 65ch）不变；
- 数字（年份、编号）加 `font-feature-settings: "onum"`（Cormorant oldstyle 数字）；
- 大标题 `text-wrap: balance`，避免孤字换行。

---

## 6. 实施步骤（分 4 批，可独立验收）

1. **排版 token 化**（低风险）：globals.css 加字号 token → 替换各页面字号 → 校验中英文渲染。
2. **全局动效基础**：lenis 平滑滚动 + `template.tsx` 页面过渡 + 光标组件。
3. **组件微交互**：按钮箭头、ProjectCard hover、筛选 pill layoutId、Navbar 细节。
4. **氛围与彩蛋**：Hero 逐词揭示、技能 marquee、résumé scroll-spy、背景鼠标跟随。

涉及文件：`globals.css`、`layout.tsx`、`template.tsx`(新)、`page.tsx`、`work/resume/contact` 页、`HeroReveal / Reveal / Navbar / ProjectCard / ProjectIndex / Footer / SectionHeader`、新增 `SmoothScroll / Cursor / Marquee`。

新增依赖：仅 `lenis`（~3KB gzip）。其余全部用现有 framer-motion + CSS 实现。

## 7. 性能与可访问性

- 动画只用 `transform` / `opacity`（可合成属性），不动 layout 属性；
- marquee、光斑等无限动画在 `document.hidden` 时由浏览器自动暂停（CSS 动画特性），无需额外处理；
- 光标组件不劫持原生光标事件，仅视觉叠加，触屏/键盘用户零影响；
- 所有入场动画 `viewport={{ once: true }}`，滚回不重播，减少重绘；
- reduced-motion：JS 侧 `useReducedMotion` 降级为纯 opacity，CSS 侧已有全局兜底。

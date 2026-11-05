import type { MotionItem } from "@/lib/types";

/**
 * L5 补强批次
 *
 * 前两批补的是「技术维度」的空白（原生 CSS / 3D / SVG / 数据）。
 * 这一批补的是「场景维度」的空白：
 *   - 滚动类：原生 scroll-driven 落地（2026 主流）
 *   - 页面级：还缺的几个大场面转场
 *   - 文字类：等宽数字、编辑式强调
 *   - 加载类：品牌加载器、乐观更新
 */
export const MOTIONS_V6: MotionItem[] = [
  // ================= 滚动驱动 · 原生实现 =================
  {
    id: "scroll-timeline-progress",
    name: "原生滚动进度条",
    en: "Native Scroll Progress",
    cat: "scroll",
    timing: "跟随滚动 · 零 JS",
    note: "最该用原生实现的经典效果。用 animation-timeline: scroll() 绑到根滚动容器，进度条随滚动自动生长，完全不用 scroll 事件监听。性能比 JS 版本好一截，因为跑在合成线程上。这是 2026 年最值得切换过去的一个小改动。",
    code: "@supports (animation-timeline: scroll()) {\n  .bar {\n    position: fixed; top: 0; left: 0;\n    height: 3px; width: 100%;\n    background: #111;\n    transform-origin: 0 50%;\n    animation: grow linear;\n    animation-timeline: scroll();\n  }\n}\n@keyframes grow { to { transform: scaleX(1); } }",
  },
  {
    id: "view-timeline-stagger",
    name: "原生视口错开",
    en: "View Timeline Stagger",
    cat: "scroll",
    timing: "按行错开 · 纯 CSS",
    note: "卡片列表的错开淡入，用 view() + animation-range 就能做，连 IntersectionObserver 都省了。错开的关键是给每张卡不同的 animation-range 起点——用 calc 和 sibling-index() 可以不写 nth-child。这是原生滚动驱动最实用的一个变体。",
    code: ".card {\n  animation: fade-up linear both;\n  animation-timeline: view();\n  animation-range: entry 0% entry 35%;\n}\n.card:nth-child(3n+2) {\n  animation-range: entry 5% entry 40%;\n}\n.card:nth-child(3n+3) {\n  animation-range: entry 10% entry 45%;\n}",
  },
  {
    id: "scroll-snap-gallery",
    name: "横向吸附画廊",
    en: "Scroll Snap Gallery",
    cat: "scroll",
    timing: "吸附对齐 · 纯 CSS",
    note: "横滑卡片列表的标准做法：scroll-snap-type: x mandatory + 每张卡 scroll-snap-align: start。用 CSS 实现比 JS 滚动监听可靠得多，触控板双指滚动时不会打架。注意一定要设 scroll-snap-stop: always，否则快速滑动会连跳好几张。",
    code: ".rail {\n  display: flex; overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scroll-snap-stop: always;\n}\n.card {\n  flex: 0 0 280px;\n  scroll-snap-align: start;\n}",
  },
  {
    id: "sticky-progress-nav",
    name: "粘性进度导航",
    en: "Sticky Progress Nav",
    cat: "scroll",
    timing: "吸顶 · 随滚动变色",
    note: "导航吸顶后，底边出现一条进度线，指示当前读到哪。这个组合的关键是 position: sticky 而不是 fixed——sticky 保留了文档流，不会遮挡内容。进度线可以用 scaleX 过渡，比改 width 便宜得多。",
    code: ".nav {\n  position: sticky; top: 0;\n}\n.progress {\n  transform-origin: 0 50%;\n  transition: transform .12s linear;\n  /* JS 里更新 scaleX(scrollRatio) */\n}",
  },

  // ================= 页面级补充 =================
  {
    id: "cursor-trail",
    name: "光标拖尾",
    en: "Cursor Trail",
    cat: "page",
    timing: "跟随 · 带延迟队列",
    note: "一串跟随光标的元素，每个都比前一个慢一点，形成拖尾。实现方式不是给每个元素都监听 mousemove——那样会掉帧。正确做法是监听一次，缓存坐标，用 requestAnimationFrame 让每个元素按比例追赶当前位置。",
    code: "const dots = [...document.querySelectorAll('.dot')];\nlet x = 0, y = 0;\ndots.forEach((d, i) => d._t = i * 0.06);\nfunction loop() {\n  x += (mx - x) * 0.2;\n  y += (my - y) * 0.2;\n  dots.forEach((d, i) => {\n    const k = 1 - d._t * 1.4;\n    d.style.transform = `translate(${x * k}px, ${y * k}px)`;\n  });\n  requestAnimationFrame(loop);\n}",
    big: true,
  },
  {
    id: "glitch-transition",
    name: "故障转场",
    en: "Glitch Transition",
    cat: "page",
    timing: "RGB 错位 · 400ms",
    note: "用三层彩色副本叠在原元素上，各层用不同 clip-path 位置并快速抖动，做出信号错位的感觉。做的时候要用 steps() 步进而不是平滑曲线——故障是离散跳变，不是渐变。位置抖动幅度控制在 2-4px 就够，大了会看不清内容。",
    code: ".glitch {\n  position: relative;\n  animation: jitter .4s steps(2) 3;\n}\n.glitch::before,\n.glitch::after {\n  content: attr(data-text);\n  position: absolute; inset: 0;\n  clip-path: inset(0 0 60% 0);\n}\n@keyframes jitter {\n  0% { transform: translate(0); }\n  25% { transform: translate(-3px, 1px); }\n  50% { transform: translate(2px, -2px); }\n  75% { transform: translate(-1px, 2px); }\n}",
    big: true,
  },
  {
    id: "morph-menu",
    name: "变形菜单",
    en: "Morphing Menu",
    cat: "page",
    timing: "形状插值 · 500ms",
    note: "按钮点击后变形展开成菜单面板。CSS 本身没法插值不同形状，得靠 clip-path 变形或者 SVG 的 path d 插值。clip-path 方案最简单：圆形裁切区域从按钮位置扩展到整个面板，配合 opacity 淡入内容。",
    code: ".menu {\n  clip-path: circle(24px at 50% 50%);\n  transition: clip-path .5s cubic-bezier(.16,1,.3,1);\n}\n.menu.open {\n  clip-path: circle(150% at 50% 50%);\n}",
    big: true,
  },
  {
    id: "marquee-columns",
    name: "反向滚动列",
    en: "Counter Scroll Columns",
    cat: "page",
    timing: "多列反向 · 各自独立",
    note: "多列内容以不同速度甚至相反方向滚动，制造出「洗衣机滚筒」的视觉趣味。反向的那列要用负的动画时长或把 keyframes 倒过来。列间距要够宽，不然内容会互相穿插。",
    code: ".col { animation: scrollUp 20s linear infinite; }\n.col:nth-child(even) { animation-direction: reverse; }\n@keyframes scrollUp {\n  from { transform: translateY(0); }\n  to { transform: translateY(-50%); }\n}",
    big: true,
  },

  // ================= 文字补充 =================
  {
    id: "editorial-underline",
    name: "编辑式下划线",
    en: "Editorial Underline",
    cat: "text",
    timing: "从右向左 · 400ms",
    note: "杂志排版的经典手法：下划线从右端往左画出，最后停稳在词尾。要点是 transform-origin 设成右边，scaleX 从 0 长到 1。用 cubic-bezier 加一点回弹，比线性更有手感。",
    code: ".title {\n  position: relative;\n}\n.title::after {\n  content: '';\n  position: absolute;\n  left: 0; right: 0; bottom: -4px;\n  height: 3px;\n  background: currentColor;\n  transform: scaleX(0);\n  transform-origin: right center;\n  transition: transform .4s cubic-bezier(.16,1,.3,1);\n}\n.title:hover::after { transform: scaleX(1); }",
  },
  {
    id: "tabular-numbers",
    name: "等宽数字滚动",
    en: "Tabular Numbers",
    cat: "text",
    timing: "数字切换 · 200ms",
    note: "价格、计数器这类会频繁变化的数字，必须用 font-variant-numeric: tabular-nums，否则每次变化字宽都会跳，整行跟着左右晃。等宽数字是表格和仪表盘的基本功，忘了它整页都显得业余。",
    code: ".price {\n  font-variant-numeric: tabular-nums;\n  font-feature-settings: 'tnum' 1;\n  transition: opacity .2s;\n}\n.price.updating { opacity: .4; }",
  },
  {
    id: "word-by-word",
    name: "逐词浮现",
    en: "Word by Word",
    cat: "text",
    timing: "按词 · 40ms 间隔",
    note: "比逐字更克制，适合正文段落。实现上按空格切分成 span，每个 span 加递增延迟。比逐字的好处是阅读节奏更自然，不会让长段落显得拖沓。",
    code: "words.forEach((w, i) => w.style.animationDelay = i * 40 + 'ms');\n.word { opacity: 0; animation: rise .5s forwards; }",
  },

  // ================= 加载补充 =================
  {
    id: "brand-loader",
    name: "品牌加载器",
    en: "Brand Loader",
    cat: "loading",
    timing: "计数到 100 · 1.6s",
    note: "游戏和创意工作室爱用的开场：数字从 0 跳到 100，跳到 100 时主视觉就位。计数器的跳跃应该不均匀——大部分时间停在 90 附近，最后一下突然跳满，才有临门一脚的感觉。这个动效同时完成了加载和品牌露出两件事。",
    code: "let v = 0;\nconst tick = setInterval(() => {\n  v += Math.random() * 12;\n  if (v >= 100) { v = 100; clearInterval(tick); reveal(); }\n  num.textContent = Math.floor(v);\n}, 60);",
  },
  {
    id: "optimistic-update",
    name: "乐观更新",
    en: "Optimistic UI",
    cat: "loading",
    timing: "即时反馈 · 后台回滚",
    note: "点击后 UI 立刻变成成功状态，同时后台请求在跑；失败了再回滚并提示。这不是「动效」而是「状态设计」，但它决定用户觉得系统快不快。关键是给回滚留一个明显的视觉信号，否则用户会以为真的成功了。",
    code: "btn.classList.add('is-done');   // 立即反馈\nfetch(url).catch(() => {\n  btn.classList.remove('is-done');  // 失败回滚\n  toast('操作失败，已撤销');\n});",
  },
  {
    id: "streaming-text",
    name: "流式文本输出",
    en: "Streaming Text",
    cat: "loading",
    timing: "逐段追加 · 光标闪烁",
    note: "AI 对话界面的标配：文字像被打印出来一样逐段出现，末尾一个闪烁光标。要点是这个「像打字」但其实不是逐字——是按 token 分块追加，每块间隔 30-50ms。末尾光标用 1s 周期的 opacity 闪烁就行。",
    code: "for await (const chunk of stream) {\n  text += chunk;\n  el.textContent = text;\n}\n.cursor { animation: blink 1s steps(2) infinite; }",
  },
];

import type { MotionItem } from "@/lib/types";

export const MOTIONS: MotionItem[] = [
  // 交互反馈
  {
    id: "hover-lift", name: "悬停抬升", en: "Hover Lift", cat: "feedback",
    timing: "200ms · cubic-bezier(.16,1,.3,1)",
    note: "最通用的一种，按钮和卡片都能用。关键是要同时改位移和阴影，只改其中一个会显得飘。",
    code: ".btn:hover {\n  transform: translateY(-8px);\n  box-shadow: 10px 10px 22px #b3b3b3,\n             -10px -10px 22px #fff;\n}",
  },
  {
    id: "press", name: "按压回弹", en: "Press Scale", cat: "feedback",
    timing: "100ms · ease-out",
    note: "触屏时代最重要的反馈。鼠标点击和手指点击都需要它，否则用户不确定自己点到了没有。",
    code: ".btn:active {\n  transform: scale(0.93);\n}\n/* 回弹靠 100ms 的短过渡 */",
  },
  {
    id: "underline", name: "下划线滑入", en: "Underline Slide", cat: "feedback",
    timing: "280ms · 从中心展开",
    note: "链接的经典写法。从中心向两侧展开比从左往右更有张力，也比整条直接出现更细腻。",
    code: ".link::after {\n  width: 0; left: 50%;\n  transform: translateX(-50%);\n  transition: width .28s;\n}\n.link:hover::after { width: 100%; }",
  },
  {
    id: "border", name: "描边浮现", en: "Border Draw", cat: "feedback",
    timing: "300ms · 由内向外",
    note: "透明的边框从 0.86 倍放大到原尺寸，同时淡入。适合给“无边界”的按钮加确认感。",
    code: ".btn::before {\n  border: 2px solid #111;\n  opacity: 0;\n  transform: scale(.86);\n}\n.btn:hover::before {\n  opacity: 1; transform: scale(1);\n}",
  },
  {
    id: "ripple", name: "涟漪扩散", en: "Ripple", cat: "feedback",
    timing: "600ms · 从点击坐标计算",
    note: "Material Design 的招牌。必须按真实点击位置生成圆，居中扩散会显得假。",
    code: "rp.style.left = (e.clientX - r.left) + 'px';\nrp.style.top  = (e.clientY - r.top) + 'px';\nrp.style.animation = 'rip .6s ease-out';",
  },
  {
    id: "icon-morph", name: "图标形变", en: "Icon Morph", cat: "feedback",
    timing: "300ms · 汉堡转叉",
    note: "三条线里让第二条消失、上下两条旋转并平移。位移量必须精确等于线距的一半。",
    code: ".bars i:nth-child(1) {\n  transform: translateY(7.5px) rotate(45deg);\n}\n.bars i:nth-child(2) { opacity: 0; }\n.bars i:nth-child(3) {\n  transform: translateY(-7.5px) rotate(-45deg);\n}",
  },
  {
    id: "magnetic", name: "磁吸跟随", en: "Magnetic Button", cat: "feedback",
    timing: "250ms · 跟随鼠标",
    note: "按钮朝鼠标方向偏移一小段距离（约 0.25 倍），松手回中。大厂官网爱用，但移动端不要用。",
    code: "const dx = (e.clientX - cx) * 0.25;\nconst dy = (e.clientY - cy) * 0.25;\nel.style.transform =\n  `translate(${dx}px, ${dy}px)`;",
  },
  {
    id: "glow", name: "聚焦光晕", en: "Focus Glow", cat: "feedback",
    timing: "250ms",
    note: "用 box-shadow 做一圈外发光。键盘可达性必备——键盘用户看不到鼠标位置，只能靠它。",
    code: ".btn:hover,\n.btn:focus-visible {\n  box-shadow: 0 0 0 4px rgba(43,43,43,.12),\n              var(--up-sm);\n}",
  },

  // 滚动驱动
  {
    id: "reveal", name: "进视口淡入", en: "Scroll Reveal", cat: "scroll",
    timing: "620ms · 位移 28px",
    note: "最基础的滚动动效。用 IntersectionObserver 判断，不要监听 scroll 事件（性能差十倍）。",
    code: "new IntersectionObserver(([en]) => {\n  if (en.isIntersecting)\n    el.classList.add('in');\n}, { threshold: 0.2 }).observe(el);",
  },
  {
    id: "parallax", name: "视差", en: "Parallax", cat: "scroll",
    timing: "跟随滚动 · 位移 ±12px",
    note: "背景层比前景层慢。幅度一大就晕，安全区间是可见位移不超过 20px。",
    code: ".bg-layer {\n  transform: translateY(\n    calc(var(--scroll) * 0.15));\n}",
  },
  {
    id: "sticky-stack", name: "粘性叠层", en: "Sticky Stack", cat: "scroll",
    timing: "跟随滚动",
    note: "position: sticky + 逐层上浮，做出卡片堆叠的感觉。每层缩 4%、错开 280ms 最舒服。",
    code: ".panel {\n  position: sticky; top: 80px;\n}\n.panel:nth-child(2) { top: 96px; }",
  },
  {
    id: "progress", name: "滚动进度条", en: "Scroll Progress", cat: "scroll",
    timing: "实时",
    note: "顶部一条 3px 的线，宽度等于阅读进度。长文页面必备，成本极低。",
    code: "const p = scrollY /\n  (document.body.scrollHeight - innerHeight);\nbar.style.transform = `scaleX(${p})`;",
  },
  {
    id: "count", name: "数字滚动", en: "Count Up", cat: "scroll",
    timing: "900ms · ease-out",
    note: "统计数字从 0 滚到目标值。必须用 tabular-nums，否则数字宽度变化会让整行抖动。",
    code: ".num {\n  font-variant-numeric: tabular-nums;\n}\n// requestAnimationFrame 逐帧插值",
  },
  {
    id: "marquee", name: "无限滚动条", en: "Infinite Marquee", cat: "scroll",
    timing: "9s · linear 循环",
    note: "内容复制一份，轨道整体左移自身宽度后瞬间回到原位。用 CSS 就够，别用 JS。",
    code: ".track {\n  animation: track 9s linear infinite;\n}\n@keyframes track {\n  to { transform: translateX(-100%); }\n}",
  },

  // 文字动效
  {
    id: "typewriter", name: "打字机", en: "Typewriter", cat: "text",
    timing: "4s · steps(18)",
    note: "用 steps() 而不是 linear，才有逐字的机械感。光标用 border-right 闪烁。",
    code: ".type {\n  width: 0; overflow: hidden;\n  border-right: 2px solid #2b2b2b;\n  animation: type 4s steps(18) infinite;\n}",
  },
  {
    id: "char-fade", name: "逐字浮现", en: "Char Fade", cat: "text",
    timing: "70ms 间隔",
    note: "每个字符单独延迟。间隔超过 100ms 会显得拖沓，低于 50ms 看不出层次。",
    code: "span:nth-child(n) {\n  animation-delay: calc(n * 70ms);\n}",
  },
  {
    id: "text-shine", name: "文字扫光", en: "Text Shine", cat: "text",
    timing: "2.6s · linear",
    note: "渐变裁切到文字上，再让渐变背景横向移动。别用 color 变化，那样不亮。",
    code: ".shine {\n  background: linear-gradient(100deg,\n    #2b2b2b 30%, #a8a8a8 48%, #2b2b2b 66%);\n  background-clip: text;\n  color: transparent;\n}",
  },
  {
    id: "gradient-flow", name: "渐变文字流动", en: "Gradient Flow", cat: "text",
    timing: "5s · linear 循环",
    note: "多彩渐变在文字上缓慢流淌。背景尺寸放到 300%，速度才够慢、不抢注意力。",
    code: ".flow {\n  background-size: 300% 100%;\n  background-clip: text;\n  animation: flow 5s linear infinite;\n}",
  },
  {
    id: "mask-reveal", name: "遮罩揭示", en: "Mask Reveal", cat: "text",
    timing: "3.6s · 循环演示",
    note: "一块和背景同色的遮罩从右往左裁掉，文字就“长”出来了。比淡入更有仪式感。",
    code: ".mask::after {\n  transform-origin: right center;\n  animation: mask 3.6s infinite;\n}\n/* scaleX(1) → scaleX(0) */",
  },
  {
    id: "marker", name: "荧光笔标记", en: "Highlighter", cat: "text",
    timing: "3.4s · 循环演示",
    note: "一条半透明色块从左往右刷过文字下半部。z-index 要压到文字下面，不能盖住字。",
    code: ".mark::before {\n  height: 42%; bottom: 2px;\n  background: #ffe066;\n  z-index: -1;\n  transform: scaleX(0);\n}",
  },
  {
    id: "odometer", name: "数字翻转", en: "Odometer", cat: "text",
    timing: "3s · 循环演示",
    note: "上下两个数字叠在一起滚动，像里程表。金融和统计页面用它比淡入更有“变化感”。",
    code: ".odo { height: 46px; overflow: hidden; }\n.odo i {\n  animation: odo 3s infinite;\n}\n/* translateY 0 → -46px */",
  },

  // 加载与状态
  {
    id: "skeleton", name: "骨架屏扫光", en: "Skeleton Shimmer", cat: "loading",
    timing: "1.6s · 循环",
    note: "加载占位最通用的做法。光带用半透明白渐变，扫过的速度控制在 1.5–2 秒。",
    code: "::after {\n  background: linear-gradient(90deg,\n    transparent, #fff, transparent);\n  animation: shim 1.6s infinite;\n}",
  },
  {
    id: "pulse", name: "呼吸脉冲", en: "Pulse", cat: "loading",
    timing: "1.6s · ease-in-out",
    note: "透明度从 0.22 到 1 来回呼吸。常用于“正在录音”“实时在线”这类状态指示。",
    code: "@keyframes pulse {\n  0%,100% { opacity:.22; transform:scale(.82); }\n  50%     { opacity:1;   transform:scale(1); }\n}",
  },
  {
    id: "spinner", name: "旋转加载", en: "Spinner", cat: "loading",
    timing: "0.9s · linear",
    note: "三段灰一段黑的圆环旋转。0.9 秒一圈是体感最舒服的速度，太慢显得卡、太快显得急。",
    code: ".spin {\n  border: 3px solid #d4d4d4;\n  border-top-color: #2b2b2b;\n  border-radius: 50%;\n  animation: spin .9s linear infinite;\n}",
  },
  {
    id: "ring", name: "环形进度", en: "Progress Ring", cat: "loading",
    timing: "3.4s · 循环演示",
    note: "conic-gradient 做进度，中间挖一个圆形盖住。比 SVG stroke-dasharray 更好写。",
    code: ".ring {\n  background: conic-gradient(\n    #2b2b2b 0 72%, #d6d6d6 72% 100%);\n  border-radius: 50%;\n}\n.ring::after { /* 挖空中心 */ }",
  },
  {
    id: "dots", name: "三点跳动", en: "Typing Dots", cat: "loading",
    timing: "1.3s · 160ms 间隔",
    note: "聊天输入指示器。三个点依次上跳，延迟必须递增（0 / 160 / 320ms）。",
    code: "i:nth-child(n) {\n  animation-delay: calc((n - 1) * 160ms);\n}",
  },
  {
    id: "like-burst", name: "点赞爆开", en: "Like Burst", cat: "loading",
    timing: "2.6s · 循环演示",
    note: "心形先放大再回弹，同时外圈扩散一圈波纹。关键在“过冲”——放大到 1.35 再落回。",
    code: "0%   { transform: scale(1); }\n18%  { transform: scale(1.35); }\n32%  { transform: scale(.92); }\n46%  { transform: scale(1.08); }",
  },

  // 转场与揭示
  {
    id: "flip", name: "卡片翻转", en: "Card Flip", cat: "transition",
    timing: "550ms",
    note: "父级加 perspective，内层 preserve-3d，背面先预旋转 180 度。少了任何一层都不成立。",
    code: ".wrap { perspective: 700px; }\n.inner {\n  transform-style: preserve-3d;\n  transition: transform .55s;\n}\n:hover .inner { transform: rotateY(180deg); }",
  },
  {
    id: "accordion", name: "展开折叠", en: "Accordion", cat: "transition",
    timing: "340ms",
    note: "用 grid-template-rows 从 0fr 到 1fr，比 max-height 更准——max-height 要么卡顿要么跳。",
    code: ".body {\n  display: grid;\n  grid-template-rows: 0fr;\n  transition: grid-template-rows .34s;\n}\n:hover .body { grid-template-rows: 1fr; }",
  },
  {
    id: "modal", name: "弹窗缩放", en: "Modal Pop", cat: "transition",
    timing: "缩放 0.86 → 1 + 淡入",
    note: "弹窗从 86% 放大到 100%，同时遮罩淡入。关掉时缩放不要到 0，留 0.94 更自然。",
    code: "0%  { opacity:0; transform: scale(.86) translateY(10px); }\n18% { opacity:1; transform: scale(1) translateY(0); }",
  },
  {
    id: "drawer", name: "抽屉滑入", en: "Drawer Slide", cat: "transition",
    timing: "380ms",
    note: "从右侧 112% 滑入（超过 100% 是为了完全藏住阴影）。关闭时必须滑回原处。",
    code: "0%, 8%   { transform: translateX(112%); }\n28%, 78% { transform: translateX(0); }",
  },
  {
    id: "page-fade", name: "页面淡入", en: "Page Fade", cat: "transition",
    timing: "320ms",
    note: "新页面淡入 + 轻微上移 10px。位移不要超过 16px，否则像在滑动而不像切换。",
    code: "@keyframes page {\n  from { opacity:0; transform:translateY(10px); }\n  to   { opacity:1; transform:translateY(0); }\n}",
  },
  {
    id: "stagger", name: "列表级联", en: "Stagger List", cat: "transition",
    timing: "100ms 间隔",
    note: "列表项依次从左滑入。每项延迟 100ms 是上限，十项就是 1 秒，再多就该分组了。",
    code: "i:nth-child(n) {\n  animation-delay: calc((n - 1) * 100ms);\n}",
  },

  // 氛围与装饰
  {
    id: "float", name: "漂浮", en: "Float", cat: "ambient",
    timing: "3.4s · ease-in-out",
    note: "上下浮动 11px 的常驻动画。用于装饰元素，别用在正文上——长时间看会分心。",
    code: "@keyframes float {\n  0%,100% { transform: translateY(0); }\n  50%     { transform: translateY(-11px); }\n}",
  },
  {
    id: "blob", name: "光斑漂移", en: "Blob Drift", cat: "ambient",
    timing: "7s / 9s · 双色异步",
    note: "两个模糊圆形各自漂移，速度要不同（7s 和 9s），同步的话会看出明显的机械感。",
    code: ".blob::before { animation: a 7s infinite; }\n.blob::after  { animation: b 9s infinite; }\n/* 两者 transform 方向相反 */",
  },
  {
    id: "grain", name: "噪点浮动", en: "Film Grain", cat: "ambient",
    timing: "1.1s · steps(3)",
    note: "feTurbulence 生成噪点，用 steps 跳帧而不是平滑移动，才有胶片颗粒的断续感。",
    code: "background-image: url(\n  \"data:image/svg+xml,...feTurbulence...\");\nopacity: .22;\nanimation: grain 1.1s steps(3) infinite;",
  },
  {
    id: "cursor-light", name: "光标跟随光", en: "Cursor Light", cat: "ambient",
    timing: "跟随鼠标",
    note: "一团径向光跟着鼠标在区域内移动。必须 pointer-events: none，否则会挡住点击。",
    code: "light.style.left = e.clientX - r.left + 'px';\nlight.style.top  = e.clientY - r.top  + 'px';",
  },
  {
    id: "stripe", name: "条纹流动", en: "Stripe Flow", cat: "ambient",
    timing: "1.6s · linear",
    note: "斜条纹背景缓慢平移。进度条、占位块、警示条都能用，比单色更有“进行中”的感觉。",
    code: "background: repeating-linear-gradient(\n  115deg, #d8d8d8 0 14px, #e8e8e8 14px 28px);\nanimation: stripe 1.6s linear infinite;",
  },
  {
    id: "aurora", name: "极光流动", en: "Aurora Spin", cat: "ambient",
    timing: "9s · linear 旋转",
    note: "conic-gradient 旋转 + 大半径模糊。放在深色背景上，比静态渐变活一倍。",
    code: ".aurora::before {\n  background: conic-gradient(...);\n  filter: blur(34px);\n  animation: spin 9s linear infinite;\n}",
  },
  {
    id: "breathe", name: "呼吸缩放", en: "Breathe", cat: "ambient",
    timing: "3.2s · ease-in-out",
    note: "元素整体放大到 1.06 再回弹，阴影同步加深。适合强调“当前选中”的卡片。",
    code: "@keyframes breathe {\n  0%,100% { transform: scale(1); }\n  50%     { transform: scale(1.06); }\n}",
  },
];

import type { MotionItem } from "@/lib/types";

/** L3 页面级 + L2 组件级：尺度和元素级完全不同，需要全屏舞台才看得清 */
export const MOTIONS_BIG: MotionItem[] = [
  {
    id: "route-transition", name: "路由转场", en: "Route Transition", cat: "page",
    timing: "420ms · 旧页淡出 新页上移",
    note: "换页时旧内容先淡出 120ms，新内容再从下方 24px 处淡入。关键是两者不重叠——重叠会出现「两个页面同时存在」的错乱感。",
    code: "// exit: opacity 1→0, 120ms\n// enter: opacity 0→1, translateY 24→0\nawait exit(); await enter();",
  },
  {
    id: "shared-element", name: "共享元素过渡", en: "Shared Element", cat: "page",
    timing: "460ms · 位置与尺寸同时插值",
    note: "缩略图放大成详情页头图。用 FLIP：先量旧位置，再量新位置，用 transform 从旧位置过渡到新位置。做对了会有「东西飞过去」的感觉。",
    code: "const first = el.getBoundingClientRect();\n// 布局变化后\nconst last = el.getBoundingClientRect();\n// transform: first → last，再播放",
  },
  {
    id: "scroll-story", name: "滚动叙事", en: "Scroll Story", cat: "page",
    timing: "跟随滚动 · 章节被钉住",
    note: "苹果产品页的做法：一段区域 position: sticky 钉住，滚动只推进内部阶段。用户以为在往下翻，其实画面在原地演进。",
    code: ".stage { position: sticky; top: 0; height: 100vh; }\n// 父容器高度 = 阶段数 × 100vh\n// 用 scrollY 百分比切换阶段",
  },
  {
    id: "section-snap", name: "章节吸附", en: "Section Snap", cat: "page",
    timing: "滚动结束时吸附 400ms",
    note: "滚到哪一章就自动对齐到那一屏。用 scroll-snap-type，不要手写 scrollTo——手写会在触控板双指滚动时打架。",
    code: ".page {\n  scroll-snap-type: y mandatory;\n  overflow-y: scroll;\n}\n.section { scroll-snap-align: start; }",
  },
  {
    id: "scroll-zoom", name: "滚动缩放", en: "Scroll Zoom", cat: "page",
    timing: "跟随滚动 · scale 1 → 1.8",
    note: "向下滚，首屏主视觉缓慢放大直到铺满屏幕，作为进入正文的过渡。缩放幅度超过 2 倍就开始糊了。",
    code: "const p = clamp(scrollY / heroHeight, 0, 1);\nhero.style.transform = `scale(${1 + p * 0.8})`;",
  },
  {
    id: "horizontal-page", name: "横向整页", en: "Horizontal Scroll", cat: "page",
    timing: "跟随纵向滚动",
    note: "纵向滚动驱动横向位移，页面横着走。必须保证不抢系统横向手势，移动端要谨慎——容易和浏览器返回手势冲突。",
    code: ".track {\n  transform: translateX(calc(var(--y) * -1px));\n}\n// 竖向滚动的 scrollY 映射成横向偏移",
  },
  {
    id: "fullscreen-menu", name: "全屏菜单", en: "Fullscreen Menu", cat: "page",
    timing: "520ms · 圆形从按钮扩散",
    note: "点汉堡，一个圆从按钮位置扩散铺满全屏。用 clip-path: circle() 从 0 到 150%，比整块淡入有方向感。",
    code: ".menu {\n  clip-path: circle(0% at 92% 8%);\n  transition: clip-path .52s;\n}\n.menu.open { clip-path: circle(150% at 92% 8%); }",
  },
  {
    id: "loader-reveal", name: "加载到内容", en: "Loader to Content", cat: "page",
    timing: "900ms · 进度条走完后让位",
    note: "加载条走到 100% 后向上滑走，内容同时从下方升起。两件事必须同时发生，否则中间会闪一帧空白。",
    code: "loader.style.transform = 'translateY(-100%)';\ncontent.style.transform = 'translateY(0)';\n// 同一个 requestAnimationFrame 里触发",
  },
  {
    id: "sticky-stack", name: "卡片叠压", en: "Sticky Stack", cat: "page",
    timing: "跟随滚动",
    note: "多张卡片依次粘在顶部，后一张压住前一张并让它缩小 4%。做产品特性介绍最有效——用户会一直滚着看下一张。",
    code: ".panel { position: sticky; top: 64px; }\n.panel:nth-child(2) { top: 88px; }\n// 每张顶部偏移递增 24px",
  },
  {
    id: "text-scrub", name: "滚动同步文字", en: "Text Scrub", cat: "page",
    timing: "跟随滚动",
    note: "一段长文案，每滚一点就亮一行，像被读出来。用 background-clip: text 配合渐变位置，一行代码就能实现。",
    code: ".para {\n  background: linear-gradient(90deg,\n    #2b2b2b var(--p), #c8c8c8 var(--p));\n  background-clip: text; color: transparent;\n}",
  },
  {
    id: "curtain", name: "幕布转场", en: "Curtain Wipe", cat: "page",
    timing: "620ms",
    note: "一块实色从下往上盖住，再从上方移走露出新页面。传统编辑器感的转场，比淡入有仪式感。",
    code: ".curtain {\n  transform: translateY(100%);\n}\n// 盖上：0 → 0%\n// 揭开：0% → -100%",
  },
  {
    id: "cursor-material", name: "跟随光标扩展", en: "Cursor Reveal", cat: "page",
    timing: "跟随鼠标 · 半径 0 → 140px",
    note: "鼠标位置开一个圆形窗口，透过它看到另一张图。作品集网站爱用，成本低但有惊喜感。",
    code: ".overlay {\n  clip-path: circle(140px at var(--x) var(--y));\n}",
  },

  {
    id: "layout-flip", name: "布局重排", en: "Layout FLIP", cat: "component",
    timing: "420ms · 每个元素独立插值",
    note: "列表从网格切到列表视图，每个元素各自飞向新位置。用 FLIP 记录前后位置再补间，比重新渲染一遍高级得多。",
    code: "// First: 记录所有 item 的 rect\n// Last: 布局变后重新记录\n// Invert: 先用 transform 回到旧位\n// Play: 移除 transform，让它飞回去",
  },
  {
    id: "drag-reorder", name: "拖拽排序", en: "Drag Reorder", cat: "component",
    timing: "跟手 + 200ms 归位",
    note: "拖动时被拖项跟手且放大 1.04，其他项用 transform 让位（不要改 DOM 顺序，会掉帧）。松手后再提交顺序。",
    code: "// 拖动中只改 transform\nel.style.transform = `translateY(${dy}px)`;\n// 其他项自动上移/下移一格",
  },
  {
    id: "swipe-card", name: "滑动卡片", en: "Swipe Card", cat: "component",
    timing: "跟手 + 320ms 甩出",
    note: "拖动判断方向和距离，超过阈值就朝该方向甩出去并淡出。阈值设成卡片宽度的 30% 最符合直觉。",
    code: "if (Math.abs(dx) > width * 0.3) {\n  el.style.transform = `translateX(${dx * 2}px) rotate(${dx * 0.06}deg)`;\n}",
  },
  {
    id: "pull-refresh", name: "下拉刷新", en: "Pull to Refresh", cat: "component",
    timing: "跟手 · 阻尼 0.4",
    note: "下拉时内容跟手但速度减半（阻尼），超过 64px 松手才触发刷新。阻尼系数 0.4 最舒服，1.0 会显得太硬。",
    code: "const damped = Math.max(0, dy) * 0.4;\nlist.style.transform = `translateY(${damped}px)`;",
  },
];

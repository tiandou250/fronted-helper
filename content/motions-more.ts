import type { MotionItem } from "@/lib/types";

/** 第二批页面级与组件级动效 */
export const MOTIONS_MORE: MotionItem[] = [
  {
    id: "split-reveal", name: "分屏揭示", en: "Split Reveal", cat: "page",
    timing: "700ms · 两片对开",
    note: "一块遮罩从中间向两侧分开，露出底下的内容。比淡入更有「揭幕」的仪式感，适合品牌首页开场。",
    code: ".left  { transform: translateX(0); }\n.right { transform: translateX(0); }\n.open .left  { transform: translateX(-100%); }\n.open .right { transform: translateX(100%); }",
  },
  {
    id: "image-sequence", name: "图片序列", en: "Image Sequence", cat: "page",
    timing: "跟随滚动 · 帧索引映射",
    note: "把滚动位置映射成帧序号，滚动就像在拖时间轴。产品拆解、旋转展示都用这套，本质是「滚动当播放器」。",
    code: "const frame = Math.floor(\n  (scrollY / total) * frames.length);\ncanvas.drawImage(frames[frame], 0, 0);",
  },
  {
    id: "scroll-spy", name: "侧边跟随导航", en: "Scroll Spy", cat: "page",
    timing: "跟随滚动 · 高亮切换 200ms",
    note: "长文页右侧一列小点，滚到哪一节哪个点就亮。用 IntersectionObserver 监听每个章节，不要算 scrollY 区间。",
    code: "new IntersectionObserver(entries => {\n  entries.forEach(e => {\n    if (e.isIntersecting) setActive(e.target.id);\n  });\n}, { rootMargin: '-45% 0px' }).observe(sec);",
  },
  {
    id: "shrink-header", name: "首屏收缩", en: "Shrink Header", cat: "page",
    timing: "420ms · 高度 96 → 56px",
    note: "滚过首屏后，大标题导航缩成一条细条。关键是缩的同时把 logo 从居中移到左侧，用户不会觉得「换了个页面」。",
    code: "header.classList.toggle('small', scrollY > 80);\n.small { height: 56px; }\n.small .logo { transform: scale(.7) translateX(0); }",
  },
  {
    id: "zoom-through", name: "缩放穿越", en: "Zoom Through", cat: "page",
    timing: "780ms · scale 1 → 6 并淡出",
    note: "点一张卡片，整页朝那张卡片放大并穿过去，落地就是详情页。迪士尼式转场，做对了很惊艳，做重了很晕。",
    code: "wrap.style.transformOrigin = `${x}px ${y}px`;\nwrap.style.transform = 'scale(6)';\nwrap.style.opacity = '0';",
  },
  {
    id: "grid-expand", name: "网格展开", en: "Grid Expand", cat: "page",
    timing: "520ms · 两端插值",
    note: "缩略图从网格里的位置，长成全屏详情。和共享元素类似，但对象是「容器」——宽高同时从格子尺寸过渡到视口尺寸。",
    code: "// First: 格子的 rect\n// Last:  全屏的 rect\n// 用 transform 从 First 播到 Last",
  },
  {
    id: "skew-scroll", name: "倾斜滚动", en: "Skew on Scroll", cat: "page",
    timing: "跟随滚动 · 最大 ±5deg",
    note: "滚动时内容轻微倾斜，像被速度甩了一下。角度必须跟着滚动速度而不是位置，松手后回正，否则会一直歪着。",
    code: "const skew = clamp(velocity * 0.05, -5, 5);\nlist.style.transform = `skewY(${skew}deg)`;",
  },
  {
    id: "layered-parallax", name: "多层视差", en: "Layered Parallax", cat: "page",
    timing: "跟随滚动 · 三层不同速度",
    note: "背景 0.2 倍速、中景 0.5 倍速、前景 1 倍速。层数超过三层就开始卡，也没人看得出区别。",
    code: ".layer-1 { transform: translateY(calc(var(--y) * 0.2)); }\n.layer-2 { transform: translateY(calc(var(--y) * 0.5)); }\n.layer-3 { transform: translateY(calc(var(--y) * 1)); }",
  },

  {
    id: "tab-indicator", name: "标签滑动指示器", en: "Tab Indicator", cat: "component",
    timing: "280ms · 位移 + 宽度同时变化",
    note: "下划线跟着当前标签滑动，宽度也跟着变。别用 left 动画，用 transform: translateX 才不会触发重排。",
    code: "bar.style.width = tab.offsetWidth + 'px';\nbar.style.transform = `translateX(${tab.offsetLeft}px)`;",
  },
  {
    id: "accordion-group", name: "手风琴组", en: "Accordion Group", cat: "component",
    timing: "340ms · 同时开只留一个",
    note: "点开一个，其他自动收起。同一时间只允许一个展开，否则页面会被撑得很长、用户找不到位置。",
    code: "items.forEach(i => i !== current && i.close());\ncurrent.toggle();",
  },
  {
    id: "filter-transition", name: "筛选过渡", en: "Filter Transition", cat: "component",
    timing: "380ms · FLIP",
    note: "切换筛选条件时，保留下来的卡片飞到新位置，被筛掉的淡出。直接重渲染会「闪一下」，必须用 FLIP 补间。",
    code: "// 记录旧位置 → 改 DOM → 记录新位置\n// 用 transform 从旧位置倒推，再播放归零",
  },
  {
    id: "row-expand", name: "表格行展开", en: "Row Expand", cat: "component",
    timing: "320ms",
    note: "点一行，下方展开详情区。展开时该行要高亮，且不能把相邻行挤得跳——用独立的详情行而不是往单元格里塞。",
    code: "tr.classList.add('open');\ntr.after(detailRow); // 独立的详情行\ndetailRow.style.height = h + 'px';",
  },
  {
    id: "infinite-scroll", name: "无限加载", en: "Infinite Scroll", cat: "component",
    timing: "触底 200px 预加载",
    note: "滚到底部前 200px 就开始加载，不要等真到底——等到底再加载用户会看到一瞬空白。加载中用骨架占位。",
    code: "if (scrollTop + clientH > scrollH - 200) load();",
  },
  {
    id: "toast-stack", name: "通知堆叠", en: "Toast Stack", cat: "component",
    timing: "320ms · 新通知从下方推入",
    note: "多条通知从下往上堆，旧的往上移并缩小。最多同时显示 3 条，超出的排队，否则会盖满屏幕。",
    code: "toasts.map((t, i) => ({\n  transform: `translateY(${-i * 64}px) scale(${1 - i * 0.04})`\n}));",
  },
];

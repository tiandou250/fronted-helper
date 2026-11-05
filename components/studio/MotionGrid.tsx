"use client";

import { useRef, useState } from "react";
import { MOTIONS } from "@/content/motions";
import { MOTIONS_BIG } from "@/content/motions-big";
import { MOTIONS_MORE } from "@/content/motions-more";
import { MOTIONS_V4 } from "@/content/motions-v4";
import { MOTIONS_V5 } from "@/content/motions-v5";
import { MOTIONS_V6 } from "@/content/motions-v6";
import { MOTION_CATS, type MotionCategory } from "@/lib/types";
import { StageBig } from "./StageBig";

const ALL = [
  ...MOTIONS_BIG,
  ...MOTIONS_MORE,
  ...MOTIONS_V4,
  ...MOTIONS_V5,
  ...MOTIONS_V6,
  ...MOTIONS,
];
const isBigItem = (m: { cat: MotionCategory; big?: boolean }) =>
  m.cat === "page" || m.cat === "component" || m.big === true;

function Stage({ id }: { id: string }) {
  const magnetRef = useRef<HTMLButtonElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const rippleRef = useRef<HTMLButtonElement>(null);

  switch (id) {
    case "hover-lift":
      return <button className="mo-btn mo-hover-lift">悬停我</button>;
    case "press":
      return <button className="mo-btn mo-press">按住我</button>;
    case "underline":
      return <button className="mo-btn mo-underline">文字链接</button>;
    case "border":
      return <button className="mo-btn mo-border">悬停描边</button>;
    case "ripple":
      return (
        <button
          className="mo-btn mo-ripple"
          ref={rippleRef}
          onClick={(e) => {
            const btn = rippleRef.current;
            if (!btn) return;
            const r = btn.getBoundingClientRect();
            const size = Math.max(r.width, r.height);
            const rp = document.createElement("span");
            rp.className = "rp";
            rp.style.width = rp.style.height = size + "px";
            rp.style.left = e.clientX - r.left - size / 2 + "px";
            rp.style.top = e.clientY - r.top - size / 2 + "px";
            rp.style.animation = "moRip .6s ease-out forwards";
            btn.appendChild(rp);
            window.setTimeout(() => rp.remove(), 640);
          }}
        >
          点我
        </button>
      );
    case "icon-morph":
      return (
        <button className="mo-burger" aria-label="菜单">
          <i />
          <i />
          <i />
        </button>
      );
    case "magnetic":
      return (
        <button
          className="mo-btn mo-magnetic"
          ref={magnetRef}
          onMouseMove={(e) => {
            const el = magnetRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
            const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
          }}
          onMouseLeave={() => {
            const el = magnetRef.current;
            if (el) el.style.transform = "translate(0,0)";
          }}
        >
          靠近我
        </button>
      );
    case "glow":
      return <button className="mo-btn mo-glow">聚焦我</button>;
    case "reveal":
      return <div className="mo-box mo-reveal">↧</div>;
    case "parallax":
      return <div className="mo-box mo-parallax">◐</div>;
    case "sticky-stack":
      return (
        <div className="mo-sticky">
          <i />
          <i />
          <i />
        </div>
      );
    case "progress":
      return (
        <span className="mo-progress">
          <i />
        </span>
      );
    case "count":
      return <span className="mo-count">12,480</span>;
    case "marquee":
      return (
        <div className="mo-marquee-row">
          <div className="track">
            <span className="cell" />
            <span className="cell" />
            <span className="cell" />
            <span className="cell" />
          </div>
          <div className="track" aria-hidden="true">
            <span className="cell" />
            <span className="cell" />
            <span className="cell" />
            <span className="cell" />
          </div>
        </div>
      );
    case "typewriter":
      return <span className="mo-type">BUILD WITH MOTION</span>;
    case "char-fade":
      return (
        <span className="mo-txt mo-chars">
          <span>动</span>
          <span>效</span>
          <span>即</span>
          <span>语</span>
          <span>言</span>
        </span>
      );
    case "text-shine":
      return <span className="mo-txt mo-shine">扫过的光</span>;
    case "gradient-flow":
      return <span className="mo-txt mo-flow">流动渐变</span>;
    case "mask-reveal":
      return (
        <span className="mo-txt mo-mask">
          <span>揭示</span>
        </span>
      );
    case "marker":
      return (
        <span className="mo-txt">
          <span className="mo-mark">重点标出</span>
        </span>
      );
    case "odometer":
      return (
        <div className="mo-odo">
          <i>1</i>
          <i>2</i>
        </div>
      );
    case "skeleton":
      return <span className="mo-skeleton" />;
    case "pulse":
      return <span className="mo-pulse" />;
    case "spinner":
      return <span className="mo-spinner" />;
    case "ring":
      return <span className="mo-ring" />;
    case "dots":
      return (
        <span className="mo-dots">
          <i />
          <i />
          <i />
        </span>
      );
    case "like-burst":
      return (
        <span className="mo-like">
          <span className="heart">♥</span>
          <span className="burst" />
        </span>
      );
    case "flip":
      return (
        <div className="mo-flip">
          <div className="inner">
            <div className="face">正面</div>
            <div className="face back">背面</div>
          </div>
        </div>
      );
    case "accordion":
      return (
        <div className="mo-acc">
          <div className="hd">
            <span>点开看看</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="bd">
            <div>
              <p>高度用 grid-template-rows 过渡，不会跳。</p>
            </div>
          </div>
        </div>
      );
    case "modal":
      return (
        <div className="mo-modal-stage">
          <div className="mo-modal">确认删除？</div>
        </div>
      );
    case "drawer":
      return (
        <div className="mo-drawer-stage">
          <div className="mo-drawer">筛选</div>
        </div>
      );
    case "page-fade":
      return <div className="mo-page">新页面</div>;
    case "stagger":
      return (
        <div className="mo-stagger">
          <i />
          <i />
          <i />
          <i />
        </div>
      );
    case "float":
      return <div className="mo-box mo-float">✦</div>;
    case "blob":
      return <div className="mo-blob" />;
    case "grain":
      return <div className="mo-grain" />;
    case "cursor-light":
      return (
        <div
          className="mo-cursor-stage"
          onMouseMove={(e) => {
            const el = lightRef.current;
            if (!el) return;
            const r = e.currentTarget.getBoundingClientRect();
            el.style.left = e.clientX - r.left + "px";
            el.style.top = e.clientY - r.top + "px";
          }}
        >
          <span className="mo-cursor-light" ref={lightRef} />
          <button className="mo-btn">移动鼠标</button>
        </div>
      );
    case "stripe":
      return <div className="mo-stripe" />;
    case "aurora":
      return <div className="mo-aurora" />;
    case "breathe":
      return <div className="mo-box mo-breathe">◎</div>;
    /* ---------- 原生 CSS ---------- */
    case "scroll-driven-view":
      return (
        <div className="nc-view">
          <div className="inner">滚动进入视口时淡入</div>
        </div>
      );
    case "scroll-timeline-named":
      return (
        <div className="nc-named">
          <div className="scroller">
            <div className="panel">第一屏</div>
            <div className="panel">第二屏</div>
            <div className="panel">第三屏</div>
          </div>
          <div className="track">
            <i />
          </div>
        </div>
      );
    case "view-transition":
      return (
        <div className="nc-vt">
          <div className="thumb" />
        </div>
      );
    case "property-register":
      return <div className="nc-prop" />;
    case "container-query-anim":
      return (
        <div className="nc-cq">
          <div className="box">
            <div className="cell">A</div>
            <div className="cell">B</div>
          </div>
        </div>
      );
    case "transition-behavior":
      return (
        <div
          className="nc-disc"
          onClick={(e) => {
            const panel = e.currentTarget.querySelector(".panel");
            if (panel) panel.classList.toggle("hide");
          }}
        >
          <div className="panel">点击消失</div>
        </div>
      );
    case "anchor-position":
      return (
        <div className="nc-anchor">
          <span className="tip">锚定的提示</span>
          <button className="trigger">锚点</button>
        </div>
      );
    case "color-mix-anim":
      return <div className="nc-mix" />;

    /* ---------- 三维空间 ---------- */
    case "css-3d-card":
      return (
        <div
          className="td-card-stage"
          onMouseMove={(e) => {
            const card = e.currentTarget.querySelector(".td-card") as HTMLElement | null;
            if (!card) return;
            const r = e.currentTarget.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
            const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
            card.style.transform = `rotateY(${dx * 16}deg) rotateX(${-dy * 16}deg)`;
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget.querySelector(".td-card") as HTMLElement | null;
            if (card) card.style.transform = "rotateY(0) rotateX(0)";
          }}
        >
          <div className="td-card">
            <div className="face">3D</div>
            <div className="face back">翻转</div>
          </div>
        </div>
      );
    case "cube-rotate":
      return (
        <div className="td-cube-stage">
          <div className="td-cube">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    case "flip-card":
      return (
        <div className="td-card-stage">
          <div
            className="td-card"
            onClick={(e) => {
              e.currentTarget.classList.toggle("flipped");
            }}
          >
            <div className="face">正面</div>
            <div className="face back">背面</div>
          </div>
        </div>
      );
    case "depth-stack":
      return (
        <div className="td-depth-stage">
          <div className="layer">
            <i />
          </div>
          <div className="layer">
            <i />
          </div>
          <div className="layer">
            <i />
          </div>
        </div>
      );
    case "3d-tilt-card":
      return (
        <div
          className="td-tilt-stage"
          onMouseMove={(e) => {
            const el = e.currentTarget.querySelector(".td-tilt") as HTMLElement | null;
            if (!el) return;
            const r = e.currentTarget.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
            const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
            el.style.transform = `rotateY(${dx * 18}deg) rotateX(${-dy * 18}deg)`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget.querySelector(".td-tilt") as HTMLElement | null;
            if (el) el.style.transform = "rotateY(0) rotateX(0)";
          }}
        >
          <div className="td-tilt">
            <span className="bar" />
          </div>
        </div>
      );
    case "isometric-grid":
      return (
        <div className="td-iso">
          <div className="grid">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      );
    case "glass-refraction":
      return (
        <div className="td-glass-stage">
          <div className="td-glass">玻璃</div>
        </div>
      );
    case "perspective-shift":
      return (
        <div className="td-fly-stage">
          <div className="td-fly">飞近</div>
        </div>
      );

    /* ---------- SVG 矢量 ---------- */
    case "path-draw":
      return (
        <div className="sv-stage">
          <svg width="96" height="96" viewBox="0 0 96 96" className="sv-draw">
            <path d="M14 74 L34 30 L48 56 L64 22 L84 74" />
          </svg>
        </div>
      );
    case "signature-draw":
      return (
        <div className="sv-stage">
          <svg width="130" height="64" viewBox="0 0 130 64" className="sv-sig">
            <path d="M8 46 C 22 14, 34 14, 30 42 C 28 56, 44 54, 52 36" />
            <path d="M58 40 C 68 20, 80 20, 76 40 C 74 50, 88 48, 96 32" />
            <path d="M14 54 C 40 60, 90 58, 118 50" />
          </svg>
        </div>
      );
    case "morph-path":
      return (
        <div className="sv-stage sv-morph">
          <svg width="90" height="90" viewBox="0 0 100 100">
            <path d="M0 0 L100 0 L100 100 L0 100 Z" />
          </svg>
        </div>
      );
    case "svg-text-split":
      return (
        <div className="sv-stage">
          <svg width="180" height="44" viewBox="0 0 180 44" className="sv-glyphs">
            <text x="6" y="32">
              动
            </text>
            <text x="52" y="32">
              效
            </text>
            <text x="98" y="32">
              绘
            </text>
            <text x="144" y="32">
              制
            </text>
          </svg>
        </div>
      );
    case "clip-reveal":
      return (
        <div className="sv-clip-stage">
          <div className="sv-clip">揭示</div>
        </div>
      );
    case "gradient-stroke":
      return (
        <div className="sv-stage">
          <svg width="130" height="80" viewBox="0 0 130 80" className="sv-grad">
            <defs>
              <linearGradient id="svFlowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6b7bff" />
                <stop offset="100%" stopColor="#16d9c4" />
              </linearGradient>
            </defs>
            <path d="M8 62 C 30 10, 52 74, 72 34 C 88 8, 108 60, 122 20" />
          </svg>
        </div>
      );
    case "icon-draw-load":
      return (
        <div className="sv-stage">
          <svg width="72" height="72" viewBox="0 0 72 72" className="sv-loader">
            <path d="M36 8 L60 22 L60 50 L36 64 L12 50 L12 22 Z" />
          </svg>
        </div>
      );
    case "svg-blob-morph":
      return (
        <div className="sv-stage">
          <svg width="110" height="110" viewBox="0 0 110 110" className="sv-blob">
            <path>
              <animate
                attributeName="d"
                dur="7s"
                repeatCount="indefinite"
                values="M55,10 L95,32 L88,75 L45,98 L14,62 L22,26 Z;
                        M55,18 L92,52 L72,95 L30,90 L12,45 L40,12 Z"
              />
            </path>
          </svg>
        </div>
      );

    /* ---------- 数据可视化 ---------- */
    case "chart-grow":
      return (
        <div className="dv-stage">
          <div className="dv-bar" />
          <div className="dv-bar" />
          <div className="dv-bar" />
          <div className="dv-bar" />
          <div className="dv-bar" />
        </div>
      );
    case "line-draw-chart":
      return (
        <div className="dv-line-stage">
          <svg width="150" height="90" viewBox="0 0 150 90" className="dv-line">
            <path d="M8 74 L36 50 L62 60 L88 26 L116 38 L142 12" />
            <circle cx="142" cy="12" r="5" />
          </svg>
        </div>
      );
    case "number-tween":
      return <span className="dv-num">12,480</span>;
    case "donut-fill":
      return (
        <div className="dv-ring-stage">
          <svg width="74" height="74" viewBox="0 0 74 74" className="dv-ring">
            <circle className="bg" cx="37" cy="37" r="32" />
            <circle className="fg" cx="37" cy="37" r="32" />
          </svg>
        </div>
      );
    case "counter-odometer":
      return (
        <div className="dv-odo">
          {["0", "1", "2", "3"].map((k, i) => (
            <div className="d" key={k}>
              <span>
                {"0123456789".split("").map((n, j) => (
                  <i key={j}>{n}</i>
                ))}
              </span>
            </div>
          ))}
        </div>
      );
    case "bar-race":
      return (
        <div className="dv-race">
          <div className="r">
            <span>A</span>
            <div className="bar">
              <i />
            </div>
          </div>
          <div className="r">
            <span>B</span>
            <div className="bar">
              <i />
            </div>
          </div>
          <div className="r">
            <span>C</span>
            <div className="bar">
              <i />
            </div>
          </div>
        </div>
      );
    case "sparkline":
      return (
        <div className="dv-spark-stage">
          <svg width="120" height="52" viewBox="0 0 120 52" className="dv-spark">
            <path d="M4 40 L22 26 L38 32 L56 14 L74 22 L92 10 L116 18" />
            <circle cx="116" cy="18" r="4" />
          </svg>
        </div>
      );
    case "heat-cell":
      return (
        <div className="dv-heat" id="dvHeat">
          {Array.from({ length: 40 }, (_, i) => (
            <i
              key={i}
              style={{
                background: `rgba(107,123,255,${0.12 + ((i * 7) % 10) * 0.08})`,
                animationDelay: `${((39 - i) % 8) * 0.05 + Math.floor(i / 8) * 0.02}s`,
              }}
            />
          ))}
        </div>
      );

    /* ---------- v6 补充 ---------- */
    case "scroll-timeline-progress":
      return (
        <div className="sc-native-bar">
          <div className="track">
            <i />
          </div>
        </div>
      );
    case "view-timeline-stagger":
      return (
        <div className="sc-vt-stagger">
          <div className="c">1</div>
          <div className="c">2</div>
          <div className="c">3</div>
        </div>
      );
    case "scroll-snap-gallery":
      return (
        <div className="sc-rail">
          <div className="c">01</div>
          <div className="c">02</div>
          <div className="c">03</div>
          <div className="c">04</div>
          <div className="c">05</div>
        </div>
      );
    case "sticky-progress-nav":
      return (
        <div className="sc-sticky-nav">
          <div className="nav">
            <span>导航</span>
            <div className="p">
              <i />
            </div>
          </div>
          <div className="body">
            吸顶导航的底边会随滚动显出一条进度线，指示当前阅读位置。
          </div>
        </div>
      );
    case "editorial-underline":
      return <span className="tx-edit">编辑设计</span>;
    case "tabular-numbers":
      return (
        <span
          className="tx-tnum"
          onClick={(e) => {
            const el = e.currentTarget;
            el.classList.add("flip");
            window.setTimeout(() => {
              el.textContent =
                "¥ " +
                (1000 + Math.floor(Math.random() * 900)).toLocaleString() +
                ".00";
              el.classList.remove("flip");
            }, 200);
          }}
          style={{ cursor: "pointer" }}
        >
          ¥ 1,280.00
        </span>
      );
    case "word-by-word":
      return (
        <div className="tx-words" id="txWords">
          <span>逐</span>
          <span>词</span>
          <span>浮</span>
          <span>现</span>
          <span>更</span>
          <span>节</span>
          <span>奏</span>
        </div>
      );
    case "brand-loader":
      return (
        <div className="br-loader">
          <span className="num">100</span>
          <div className="bar">
            <i />
          </div>
          <span className="cap">LOADING</span>
        </div>
      );
    case "optimistic-update":
      return (
        <div className="op-stage">
          <button
            className="op-btn"
            onClick={(e) => {
              const btn = e.currentTarget;
              const tip = btn.parentElement?.querySelector(".op-tip");
              const label = btn.querySelector("span:nth-child(2)");
              btn.classList.remove("done", "fail");
              void btn.offsetWidth;
              const ok = Math.random() > 0.45;
              btn.classList.add(ok ? "done" : "fail");
              if (label) label.textContent = ok ? "已保存" : "保存失败";
              if (tip) tip.textContent = ok ? "请求在后台跑，失败会自动回滚" : "已回滚到原始状态";
              window.setTimeout(() => {
                btn.classList.remove("done", "fail");
                if (label) label.textContent = "保存";
                if (tip) tip.textContent = "点击试试，会随机成功或失败";
              }, 2200);
            }}
          >
            <span className="mark" />
            <span>保存</span>
          </button>
          <span className="op-tip">点击试试，会随机成功或失败</span>
        </div>
      );
    case "streaming-text":
      return (
        <div className="st-stream" id="stStream">
          <span id="stText" />
          <span className="cursor" />
        </div>
      );

    default:
      return <div className="mo-box">?</div>;
  }
}

export function MotionGrid() {
  const [cat, setCat] = useState<MotionCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const list =
    cat === "all"
      ? MOTION_CATS.flatMap((c) => ALL.filter((m) => m.cat === c.id))
      : ALL.filter((m) => m.cat === cat);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setToast("已复制代码");
    window.clearTimeout((window as any).__mt);
    (window as any).__mt = window.setTimeout(() => setToast(""), 1300);
  };

  return (
    <>
      <div className="tool-row" style={{ marginTop: 30 }}>
        <button
          className={`pill pill-sm ${cat === "all" ? "is-on" : ""}`}
          onClick={() => setCat("all")}
        >
          全部
          <span style={{ fontSize: "0.72em", opacity: 0.5 }}>
            {ALL.length}
          </span>
        </button>
        {MOTION_CATS.map((c) => (
          <button
            key={c.id}
            className={`pill pill-sm ${cat === c.id ? "is-on" : ""}`}
            onClick={() => setCat(c.id)}
          >
            {c.name}
            <span style={{ fontSize: "0.72em", opacity: 0.5 }}>
              {ALL.filter((m) => m.cat === c.id).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mo-grid">
        {list.map((m) => (
          <div className="mo-card" key={m.id}>
            {isBigItem(m) && (
              <button
                className="mo-zoom"
                onClick={() => setOpenId(m.id)}
                aria-label={`全屏演示 ${m.name}`}
              >
                全屏
              </button>
            )}
            <h4>{m.name}</h4>
            <div className="meta">{m.timing}</div>
            <div className="mo-demo">
              {isBigItem(m) ? (
                <div className="mo-big-preview">
                  <span>{m.en}</span>
                  <button
                    className="mo-preview-play"
                    onClick={() => setOpenId(m.id)}
                  >
                    ▶ 播放
                  </button>
                </div>
              ) : (
                <Stage id={m.id} />
              )}
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "var(--ink-2)",
                marginBottom: 12,
              }}
            >
              {m.note}
            </p>
            <div className="mo-code">
              <button className="mo-copy" onClick={() => copy(m.code)}>
                复制
              </button>
              <code>{m.code}</code>
            </div>
          </div>
        ))}
      </div>

      {openId && (
        <div className="stage-overlay" onClick={() => setOpenId(null)}>
          <div className="stage-box" onClick={(e) => e.stopPropagation()}>
            <div className="stage-bar">
              <span className="title">
                {ALL.find((m) => m.id === openId)?.name}
              </span>
              <span className="hint">
                {ALL.find((m) => m.id === openId)?.timing}
              </span>
              <span className="spacer" />
              <button className="stage-close" onClick={() => setOpenId(null)}>
                关闭
              </button>
            </div>
            <StageBig id={openId} />
          </div>
        </div>
      )}

      <div className={`toast ${toast ? "is-on" : ""}`}>{toast}</div>
    </>
  );
}

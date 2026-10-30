"use client";

import { useRef, useState } from "react";
import { MOTIONS } from "@/content/motions";
import { MOTIONS_BIG } from "@/content/motions-big";
import { MOTIONS_MORE } from "@/content/motions-more";
import { MOTION_CATS, type MotionCategory } from "@/lib/types";
import { StageBig } from "./StageBig";

const ALL = [...MOTIONS_BIG, ...MOTIONS_MORE, ...MOTIONS];
const BIG_IDS = new Set(
  [...MOTIONS_BIG, ...MOTIONS_MORE]
    .filter((m) => m.cat === "page")
    .map((m) => m.id)
);
const isBig = (cat: MotionCategory) => cat === "page" || cat === "component";

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
            {(m.cat === "page" || m.cat === "component") && (
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
              {isBig(m.cat) ? (
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

"use client";

import { useRef } from "react";

export function StageBig({ id }: { id: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const hzRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const spyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skewRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);

  switch (id) {
    case "route-transition":
      return (
        <div className="rt-stage stage-viewport">
          <div className="rt-page a">
            <div>
              <span className="fp-tag">Page A</span>
              <h3 style={{ fontSize: 42, fontWeight: 700 }}>首页</h3>
              <p style={{ marginTop: 12, color: "var(--ink-3)", fontSize: 15 }}>
                旧页面在 120ms 内淡出并轻微上移
              </p>
            </div>
          </div>
          <div className="rt-page b">
            <div>
              <span className="fp-tag">Page B</span>
              <h3 style={{ fontSize: 42, fontWeight: 700 }}>详情页</h3>
              <p style={{ marginTop: 12, color: "var(--ink-3)", fontSize: 15 }}>
                新页面从下方 24px 处淡入，与旧页不重叠
              </p>
            </div>
          </div>
        </div>
      );

    case "shared-element":
      return (
        <div className="se-stage stage-viewport">
          <div className="se-thumb" />
          <div className="se-copy">
            <h3 style={{ fontSize: 30, fontWeight: 700 }}>卡片放大成头图</h3>
            <p style={{ marginTop: 10, fontSize: 14, color: "var(--ink-3)" }}>
              同一块渐变，从 150×96 长到 972×200
            </p>
          </div>
        </div>
      );

    case "scroll-story":
      return (
        <div
          className="story-stage stage-scroll"
          onScroll={(e) => {
            const el = e.currentTarget;
            const p = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
            const idx = Math.min(2, Math.floor(p * 3.2));
            itemRefs.current.forEach((it, i) => {
              if (it) it.classList.toggle("on", i === idx);
            });
          }}
        >
          <div className="story-pin">
            {[
              ["01 采集", "把原始数据接进来"],
              ["02 加工", "清洗、聚合、建模"],
              ["03 呈现", "变成能看懂的图"],
            ].map(([t, s], i) => (
              <div
                className={`item ${i === 0 ? "on" : ""}`}
                key={t}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <b>{t}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ height: "220%" }} />
        </div>
      );

    case "section-snap":
      return (
        <div className="snap-stage">
          <div className="snap-sec">
            <b>第一章</b>
            <span>继续往下滚</span>
          </div>
          <div className="snap-sec">
            <b>第二章</b>
            <span>松手自动吸附到这一屏</span>
          </div>
          <div className="snap-sec">
            <b>第三章</b>
            <span>scroll-snap-type: y mandatory</span>
          </div>
        </div>
      );

    case "scroll-zoom":
      return (
        <div
          className="zoom-stage stage-scroll"
          onScroll={(e) => {
            const el = e.currentTarget;
            const p = Math.min(1, el.scrollTop / (el.clientHeight || 1));
            if (zoomRef.current) {
              zoomRef.current.style.transform = `scale(${1 + p * 0.9})`;
              zoomRef.current.style.borderRadius = `${28 - p * 18}px`;
            }
          }}
        >
          <div className="zoom-hero">
            <div className="art" ref={zoomRef} />
            <div className="cap">向下滚，主视觉放大到铺满</div>
          </div>
          <div style={{ height: "120%" }} />
        </div>
      );

    case "horizontal-page":
      return (
        <div
          className="hz-stage stage-scroll"
          onScroll={(e) => {
            const el = e.currentTarget;
            const p = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
            if (hzRef.current) {
              hzRef.current.style.transform = `translateX(${-p * (hzRef.current.scrollWidth - el.clientWidth)}px)`;
            }
          }}
        >
          <div style={{ height: "100%" }}>
            <div className="hz-track" ref={hzRef}>
              {["01", "02", "03"].map((n) => (
                <div className="hz-panel" key={n}>
                  <b>PANEL {n}</b>
                  <span>纵向滚动驱动横向位移</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "200%" }} />
        </div>
      );

    case "fullscreen-menu":
      return (
        <div
          className="fm-stage"
          ref={menuRef}
          onClick={() => menuRef.current?.classList.toggle("open")}
        >
          <div className="fm-btn">
            <i />
            <i />
            <i />
          </div>
          <div className="fm-menu">
            <span>作品</span>
            <span>关于</span>
            <span>联系</span>
          </div>
          <div className="fm-content">
            <h3>点右上角</h3>
            <p>圆形从按钮位置扩散铺满全屏，用 clip-path: circle() 控制半径。</p>
          </div>
        </div>
      );

    case "loader-reveal":
      return (
        <div className="lr-stage stage-viewport">
          <div className="lr-loader">
            <div className="lr-bar">
              <i />
            </div>
            <span>LOADING</span>
          </div>
          <div className="lr-content">
            <h3 style={{ fontSize: 40, fontWeight: 700 }}>内容就位</h3>
            <p style={{ marginTop: 14, color: "var(--ink-2)", fontSize: 16, maxWidth: 520 }}>
              进度条走完后整体向上滑走，内容同时从下方 36px 处升起。两件事必须在同一帧触发，否则会闪一帧空白。
            </p>
          </div>
        </div>
      );

    case "sticky-stack":
      return (
        <div className="ss-stage stage-scroll">
          {[
            ["采集层", "接入埋点、日志、业务库"],
            ["加工层", "清洗、去重、聚合"],
            ["呈现层", "报表、看板、告警"],
          ].map(([t, s]) => (
            <div className="ss-card" key={t}>
              <b>{t}</b>
              <span>{s}</span>
            </div>
          ))}
          <div style={{ height: "40%" }} />
        </div>
      );

    case "text-scrub":
      return (
        <div
          className="ts-stage stage-scroll"
          onScroll={(e) => {
            const el = e.currentTarget;
            const p = (el.scrollTop / (el.scrollHeight - el.clientHeight || 1)) * 100;
            if (paraRef.current) {
              paraRef.current.style.setProperty("--p", p + "%");
            }
          }}
        >
          <p className="ts-para" ref={paraRef}>
            动效的作用不是让页面变好看，而是让变化变得可理解。一个东西从 A 走到 B，
            中间那段过程才是用户真正在读的信息。跳过它，用户就得自己脑补。
          </p>
          <div style={{ height: "120%" }} />
        </div>
      );

    case "curtain":
      return (
        <div className="cu-stage stage-viewport">
          <div className="cu-content">
            <b>新页面</b>
            <span>幕布从下往上盖住，再从上方移走</span>
          </div>
          <div className="cu-curtain" />
        </div>
      );

    case "cursor-material":
      return (
        <div
          className="cr-stage stage-viewport"
          onMouseMove={(e) => {
            const el = revealRef.current;
            if (!el) return;
            const r = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            el.style.clipPath = `circle(150px at ${x}px ${y}px)`;
          }}
          onMouseLeave={() => {
            if (revealRef.current) {
              revealRef.current.style.clipPath = "circle(0px at 50% 50%)";
            }
          }}
        >
          <div className="cr-base">MOVE YOUR CURSOR</div>
          <div className="cr-reveal" ref={revealRef}>
            ANOTHER WORLD
          </div>
        </div>
      );

    case "split-reveal":
      return (
        <div className="sp-stage stage-viewport" ref={splitRef}>
          <div className="sp-content">
            <b>揭幕</b>
            <span>两片遮罩向两侧分开</span>
          </div>
          <div className="sp-left" />
          <div className="sp-right" />
        </div>
      );

    case "image-sequence":
      return (
        <div
          className="seq-stage stage-scroll"
          onScroll={(e) => {
            const el = e.currentTarget;
            const p = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
            if (seqRef.current) {
              const frame = Math.round(p * 36);
              seqRef.current.style.transform = `rotate(${frame * 10}deg) scale(${1 + p * 0.4})`;
              seqRef.current.style.borderRadius = `${30 - p * 26}px`;
              seqRef.current.textContent = `帧 ${String(frame).padStart(2, "0")}`;
            }
          }}
        >
          <div className="seq-hero">
            <div className="seq-art" ref={seqRef}>帧 00</div>
            <span className="seq-cap">向下滚，滚动位置映射成帧序号</span>
          </div>
          <div style={{ height: "200%" }} />
        </div>
      );

    case "scroll-spy":
      return (
        <div className="spy-stage stage-viewport">
          <div
            className="spy-scroll"
            onScroll={(e) => {
              const el = e.currentTarget;
              const p = el.scrollTop / (el.clientHeight || 1);
              const idx = Math.min(3, Math.floor(p));
              spyRef.current
                ?.querySelectorAll("i")
                .forEach((d, i) => d.classList.toggle("on", i === idx));
            }}
          >
            {["概览", "能力", "案例", "联系"].map((t, i) => (
              <section key={t} className="spy-sec">
                <b>{t}</b>
                <p>第 {i + 1} 节</p>
              </section>
            ))}
          </div>
          <div className="spy-nav" ref={spyRef}>
            <i className="on" />
            <i />
            <i />
            <i />
          </div>
        </div>
      );

    case "shrink-header":
      return (
        <div
          className="sh-stage stage-scroll"
          onScroll={(e) => {
            const el = e.currentTarget;
            if (headerRef.current) {
              headerRef.current.style.height = el.scrollTop > 60 ? "54px" : "96px";
              headerRef.current.style.justifyContent =
                el.scrollTop > 60 ? "flex-start" : "center";
              headerRef.current.style.fontSize =
                el.scrollTop > 60 ? "17px" : "28px";
            }
          }}
        >
          <div className="sh-header" ref={headerRef}>
            NOVA
          </div>
          <div className="sh-body">
            <h3>滚下去看导航收缩</h3>
            <p>高度从 96px 收到 54px，标题从居中移到左侧，字号同步变小。</p>
          </div>
          <div style={{ height: "160%" }} />
        </div>
      );

    case "zoom-through":
      return (
        <div className="zt-stage stage-viewport">
          <div className="zt-card">
            <span>点这里的感觉</span>
          </div>
          <div className="zt-veil" />
        </div>
      );

    case "grid-expand":
      return (
        <div className="ge-stage stage-viewport">
          <div className="ge-grid">
            <i />
            <i />
            <i />
            <i className="ge-target" />
            <i />
            <i />
          </div>
          <div className="ge-full">
            <b>展开后的详情</b>
            <span>从格子尺寸长到视口尺寸</span>
          </div>
        </div>
      );

    case "skew-scroll":
      return (
        <div
          className="sk-stage stage-scroll"
          onScroll={(e) => {
            const el = e.currentTarget;
            const v = el.scrollTop;
            const prev = Number(el.dataset.prev || 0);
            el.dataset.prev = String(v);
            const skew = Math.max(-5, Math.min(5, (v - prev) * 0.4));
            if (skewRef.current) {
              skewRef.current.style.transform = `skewY(${skew}deg)`;
            }
          }}
        >
          <div className="sk-list" ref={skewRef}>
            {["速度感", "甩动", "回正"].map((t) => (
              <div key={t} className="sk-item">
                {t}
              </div>
            ))}
          </div>
          <div style={{ height: "120%" }} />
        </div>
      );

    case "layered-parallax":
      return (
        <div
          className="lp-stage stage-scroll"
          onScroll={(e) => {
            const el = e.currentTarget;
            const y = el.scrollTop;
            layerRefs.current.forEach((l, i) => {
              if (l) l.style.transform = `translateY(${y * [0.2, 0.5, 1][i]}px)`;
            });
          }}
        >
          <div className="lp-view">
            <div className="lp-layer l1" ref={(el) => { layerRefs.current[0] = el; }}>
              <span>背景 · 0.2×</span>
            </div>
            <div className="lp-layer l2" ref={(el) => { layerRefs.current[1] = el; }}>
              <span>中景 · 0.5×</span>
            </div>
            <div className="lp-layer l3" ref={(el) => { layerRefs.current[2] = el; }}>
              <span>前景 · 1×</span>
            </div>
          </div>
          <div style={{ height: "180%" }} />
        </div>
      );

    default:
      return (
        <div className="stage-viewport fp">
          <h3>演示占位</h3>
          <p>这个动效的舞台还在补充。</p>
        </div>
      );
  }
}

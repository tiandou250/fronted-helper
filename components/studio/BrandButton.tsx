"use client";

import { useState } from "react";

export function BrandButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hero">
      <div className="brand-shell">
        <span className="brand-beam" />
        <button
          className="brand-btn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          前端设计小助手
        </button>
      </div>
      <div className={`credit ${open ? "is-open" : ""}`}>
        tiandou250 制作
      </div>
    </div>
  );
}

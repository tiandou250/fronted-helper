"use client";

import { useState } from "react";
import { PALETTES } from "@/content/palettes";
import { LEVELS } from "@/lib/types";

export function ColorGrid() {
  const [toast, setToast] = useState("");

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = hex;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setToast(`已复制 ${hex}`);
    window.clearTimeout((window as any).__ct);
    (window as any).__ct = window.setTimeout(() => setToast(""), 1400);
  };

  return (
    <>
      <div className="color-box">
        {PALETTES.map((p) => (
          <div className="color-row" key={p.name}>
            <div className="color-name">{p.name}</div>
            <div className="color-shades">
              {p.shades.map((hex, i) => (
                <button
                  key={hex + i}
                  className="shade"
                  onClick={() => copy(hex)}
                  aria-label={`复制 ${p.name} ${LEVELS[i]} ${hex}`}
                >
                  <span className="sw" style={{ ["--c" as any]: hex }} />
                  <span className="lv">{LEVELS[i]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`toast ${toast ? "is-on" : ""}`}>{toast}</div>
    </>
  );
}

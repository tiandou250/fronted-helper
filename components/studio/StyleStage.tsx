"use client";

import { useRef, useState } from "react";
import { Demo } from "./Demo";
import type { Style } from "@/lib/types";

export function StyleStage({ style }: { style: Style }) {
  const [w, setW] = useState<"desk" | "tab" | "mob">("desk");
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div className="demo-card">
      <div className="demo-bar">
        <span className="t">响应式预览</span>
        <div className="sw">
          {(
            [
              ["desk", "桌面 1440"],
              ["tab", "平板 768"],
              ["mob", "手机 375"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              className={`pill pill-sm ${w === k ? "is-on" : ""}`}
              onClick={() => setW(k)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="demo-stage">
        <div
          className={`demo-frame ${w === "desk" ? "" : "w-" + w}`}
          ref={frameRef}
        >
          <Demo id={style.id} />
        </div>
      </div>
    </div>
  );
}

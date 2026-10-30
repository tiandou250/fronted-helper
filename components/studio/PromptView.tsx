"use client";

import { useState } from "react";
import type { Style } from "@/lib/types";

const SECTIONS = [
  { key: "tokens", zh: "视觉 Token", en: "Visual Tokens" },
  { key: "layout", zh: "布局与响应式", en: "Layout & Responsive" },
  { key: "components", zh: "组件与响应式行为", en: "Components" },
  { key: "forbidden", zh: "禁止事项", en: "Forbidden" },
  { key: "acceptance", zh: "验收标准", en: "Acceptance" },
] as const;

export function PromptView({ style }: { style: Style }) {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [toast, setToast] = useState("");

  const block = style.prompt[lang];

  const buildText = () => {
    return SECTIONS.map((s, i) => {
      const items = block[s.key as keyof typeof block] as string[];
      const head = lang === "zh" ? `## ${i + 1}. ${s.zh}` : `## ${i + 1}. ${s.en}`;
      return `${head}\n${items.map((t) => `- ${t}`).join("\n")}`;
    }).join("\n\n");
  };

  const copy = async () => {
    const text = buildText();
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
    setToast("Prompt 已复制");
    window.clearTimeout((window as any).__pt);
    (window as any).__pt = window.setTimeout(() => setToast(""), 1400);
  };

  return (
    <>
      <div className="tool-row">
        <button
          className={`pill pill-sm ${lang === "zh" ? "is-on" : ""}`}
          onClick={() => setLang("zh")}
        >
          中文
        </button>
        <button
          className={`pill pill-sm ${lang === "en" ? "is-on" : ""}`}
          onClick={() => setLang("en")}
        >
          English
        </button>
        <span className="spacer" />
        <button className="pill pill-sm" onClick={copy}>
          复制 Prompt
        </button>
      </div>

      <div className="p-list">
        {SECTIONS.map((s, i) => {
          const items = block[s.key as keyof typeof block] as string[];
          return (
            <div className="p-item" key={s.key}>
              <div className="hd">
                <span className="num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4>{lang === "zh" ? s.zh : s.en}</h4>
                <span className="pen">{s.en}</span>
              </div>
              <ul>
                {items.map((t, k) => (
                  <li key={k}>{t}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className={`toast ${toast ? "is-on" : ""}`}>{toast}</div>
    </>
  );
}

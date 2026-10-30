"use client";

import { useState } from "react";
import Link from "next/link";
import { FAMILIES, familyName } from "@/lib/types";
import { STYLES } from "@/content";
import { Demo } from "./Demo";

export function HomeWall() {
  const [fam, setFam] = useState<string>("all");
  const list = fam === "all" ? STYLES : STYLES.filter((s) => s.family === fam);

  return (
    <>
      <div className="filters">
        <button
          className={`pill ${fam === "all" ? "is-on" : ""}`}
          onClick={() => setFam("all")}
        >
          全部
        </button>
        {FAMILIES.map((f) => {
          const n = STYLES.filter((s) => s.family === f.id).length;
          return (
            <button
              key={f.id}
              className={`pill ${fam === f.id ? "is-on" : ""}`}
              onClick={() => setFam(f.id)}
            >
              {f.name}
              <span
                style={{
                  fontSize: "0.72em",
                  opacity: 0.5,
                  fontWeight: 500,
                }}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>

      <div className="style-wall">
        {list.map((s) => (
          <Link
            key={s.id}
            href={`/styles/${s.id}/`}
            className="card style-card"
            aria-label={`${s.name} ${s.en}`}
          >
            <div className="top2">
              <span className="no">{s.no}</span>
              <span>{familyName(s.family)}</span>
              <span className="arrow fam">↗</span>
            </div>
            <div className="pv-wrap">
              <div className="pv">
                <div className="pv-scale">
                  <Demo id={s.id} />
                </div>
              </div>
            </div>
            <div className="info">
              <h3>{s.name}</h3>
              <div className="en">{s.en}</div>
              <p>{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

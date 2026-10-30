import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STYLES, getStyle, getNeighbors } from "@/content";
import { StyleStage } from "@/components/studio/StyleStage";
import { PromptView } from "@/components/studio/PromptView";
import { familyName } from "@/lib/types";

export function generateStaticParams() {
  return STYLES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const s = getStyle(id);
  if (!s) return { title: "未找到 · 前端设计小助手" };
  return {
    title: `${s.name} ${s.en} · 前端设计小助手`,
    description: `${s.desc} 含可执行的 CSS Token 与中英双语结构化 Prompt。`,
  };
}

export default async function StylePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const style = getStyle(id);
  if (!style) notFound();
  const { prev, next } = getNeighbors(id);

  return (
    <main>
      <div className="wrap">
        <div className="subhead" style={{ paddingBottom: 0 }}>
          <Link href="/" className="back-pill">
            ← 返回
          </Link>
        </div>

        <div className="d-head">
          <div className="en">
            {style.en} · {familyName(style.family)}
          </div>
          <h1>{style.name}</h1>
          <div className="desc">{style.desc}</div>
        </div>

        <div className="d-sec">
          <div className="d-label">
            <span className="n">01</span> 活体样本
          </div>
          <StyleStage style={style} />
        </div>

        <div className="d-sec">
          <div className="d-label">
            <span className="n">02</span> 结构化 Prompt
          </div>
          <PromptView style={style} />
        </div>

        <div className="pager">
          {prev && (
            <Link href={`/styles/${prev.id}/`}>
              <span className="k">← 上一个</span>
              <span className="v">{prev.name}</span>
            </Link>
          )}
          {next && (
            <Link href={`/styles/${next.id}/`}>
              <span className="k">下一个 →</span>
              <span className="v">{next.name}</span>
            </Link>
          )}
        </div>

        <div style={{ height: 70 }} />
      </div>
    </main>
  );
}

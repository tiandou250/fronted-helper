import type { Metadata } from "next";
import Link from "next/link";
import { ColorGrid } from "@/components/studio/ColorGrid";
import { PALETTES, TOTAL_SHADES } from "@/content/palettes";

export const metadata: Metadata = {
  title: "配色工具 · 前端设计小助手",
  description: `${PALETTES.length} 个色系 × 11 级色阶，共 ${TOTAL_SHADES} 个色值。点任意色块复制 HEX。`,
};

export default function ColorsPage() {
  return (
    <main>
      <div className="wrap">
        <div className="subhead">
          <Link href="/" className="back-pill">
            ← 返回
          </Link>
          <h1>配色工具</h1>
          <p className="lead">
            {PALETTES.length} 个色系、11 级色阶，共 {TOTAL_SHADES} 个色值。每个色系从
            50（最浅）到 950（最深），覆盖同一色相在界面里的全部用途——浅色做底色、中间色做按钮、深色做文字。点任意色块复制 HEX。
          </p>
        </div>

        <ColorGrid />

        <div style={{ height: 70 }} />
      </div>
    </main>
  );
}

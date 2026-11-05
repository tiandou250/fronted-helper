import type { Metadata } from "next";
import Link from "next/link";
import { MotionGrid } from "@/components/studio/MotionGrid";
import { MOTIONS } from "@/content/motions";
import { MOTIONS_BIG } from "@/content/motions-big";
import { MOTIONS_MORE } from "@/content/motions-more";
import { MOTIONS_V4 } from "@/content/motions-v4";
import { MOTIONS_V5 } from "@/content/motions-v5";
import { MOTIONS_V6 } from "@/content/motions-v6";

const TOTAL =
  MOTIONS.length +
  MOTIONS_BIG.length +
  MOTIONS_MORE.length +
  MOTIONS_V4.length +
  MOTIONS_V5.length +
  MOTIONS_V6.length;

export const metadata: Metadata = {
  title: "动效工具 · 前端设计小助手",
  description: `${TOTAL} 个主流动效，分 12 类：页面级、组件级、原生 CSS、三维空间、SVG 矢量、数据可视化等。每个都能当场看、当场抄 CSS。`,
};

export default function MotionPage() {
  return (
    <main>
      <div className="wrap">
        <div className="subhead">
          <Link href="/" className="back-pill">
            ← 返回
          </Link>
          <h1>动效工具</h1>
          <p className="lead">
            {TOTAL} 个主流动效，分 12 类。鼠标移到演示区就能看到真实效果，下面的代码可以直接抄。
            一条硬规矩：响应型动效不超过 300 毫秒——超过用户就开始觉得卡。
            <br />
            2026 年该补的三块也补上了：<b>原生 CSS</b>（scroll-driven 动画、View Transitions、@property）、
            <b>三维空间</b>（CSS 3D、透视、景深）、<b>数据可视化</b>（图表生长、数字缓动）——
            这三块是目前最常用、也最少人写进 prompt 的。
          </p>
        </div>

        <MotionGrid />

        <div style={{ height: 70 }} />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MotionGrid } from "@/components/studio/MotionGrid";
import { MOTIONS } from "@/content/motions";

export const metadata: Metadata = {
  title: "动效工具 · 前端设计小助手",
  description: `${MOTIONS.length} 个主流交互动效：悬停、按压、滚动、文字、加载、转场。每个都能当场看、当场抄 CSS。`,
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
            主流页面在用的 {MOTIONS.length} 个交互动效，分六类。鼠标移到演示区就能看到真实效果，下面的代码可以直接抄。
            一条硬规矩：响应型动效不超过 300 毫秒——超过用户就开始觉得卡。
          </p>
        </div>

        <MotionGrid />

        <div style={{ height: 70 }} />
      </div>
    </main>
  );
}

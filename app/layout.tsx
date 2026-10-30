import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./pills.css";
import "./cards.css";
import "./demos-a.css";
import "./demos-b.css";
import "./demos-c.css";
import "./colors.css";
import "./motions.css";
import "./motions2.css";
import "./motions-big.css";
import "./detail.css";

export const metadata: Metadata = {
  title: "前端设计小助手 · 视觉风格库 / 配色工具 / 动效工具",
  description:
    "16 种前端视觉风格，每种一套可执行的 CSS Token 与中英双语 Prompt。22 个色系 242 个色值，40 个主流交互动效，能直接看、能直接抄。",
  keywords: [
    "前端设计",
    "UI 风格",
    "设计风格",
    "CSS Token",
    "AI Prompt",
    "配色",
    "动效",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

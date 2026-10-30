import type { NextConfig } from "next";

/**
 * GitHub Pages 项目页部署在 /仓库名/ 子路径下，
 * 静态资源必须带同样的前缀，否则 CSS/JS 全部 404、页面变成无样式的纯文本。
 * 部署时通过 BASE_PATH 环境变量传入，本地开发不设，根路径照常访问。
 */
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;

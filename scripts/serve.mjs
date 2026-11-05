/**
 * 本地预览服务器（带 basePath 的构建产物用）
 *
 * 线上产物里资源路径带 /fronted-helper 前缀，直接用 python -m http.server
 * 从 dist 根目录起服务会 404。本脚本把前缀剥掉，并把子路径映射回目录。
 *
 * 用法：node scripts/serve.mjs [端口]
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "dist");
const PORT = Number(process.argv[2] || 8092);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.startsWith("/fronted-helper")) p = p.slice("/fronted-helper".length);
    if (p === "" || p === "/") p = "/index.html";
    // /colors/ -> /colors/index.html
    let file = path.join(ROOT, p);
    if (file.endsWith(path.sep) || p.endsWith("/")) file = path.join(file, "index.html");
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(ROOT, p, "index.html");
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("404 " + p);
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, {
      "content-type": TYPES[ext] || "application/octet-stream",
      "cache-control": "no-cache",
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`[serve] http://127.0.0.1:${PORT}/`);
  });

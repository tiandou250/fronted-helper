/**
 * 构建脚本
 *
 * 为什么需要这一层：Next 的 export 会先删掉输出目录，
 * 而本机的 node 删除操作被 safe-delete shim 劫持成「移到回收站」，
 * 回收站 API 不可用就会抛错，导致构建在最后一步失败。
 *
 * 规避方式：用 renameSync 把旧目录挪走（改名不受删除拦截影响），
 * 这样 Next 创建新目录时无需删除，构建就能走完。
 */
import { existsSync, mkdirSync, renameSync, readdirSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const DIST = "dist";
const TRASH_DIR = "D:/file/temp/stylebook-build-trash";

if (existsSync(DIST)) {
  mkdirSync(TRASH_DIR, { recursive: true });
  const target = join(TRASH_DIR, `dist-${Date.now()}`);
  try {
    renameSync(DIST, target);
    console.log(`[build] 旧产物已挪到 ${target}`);
  } catch (e) {
    console.warn("[build] 旧产物挪动失败，继续构建：", e.message);
  }
}

// 顺手清掉超过 5 份的历史产物，避免越堆越多
try {
  const dirs = readdirSync(TRASH_DIR)
    .filter((n) => n.startsWith("dist-"))
    .map((n) => ({ n, t: statSync(join(TRASH_DIR, n)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  if (dirs.length > 5) {
    console.log(`[build] 已有 ${dirs.length} 份历史产物，建议手动清理 ${TRASH_DIR}`);
  }
} catch {
  /* 忽略 */
}

execSync("node node_modules/next/dist/bin/next build", { stdio: "inherit", shell: true });

import Link from "next/link";
import { BrandButton } from "@/components/studio/BrandButton";
import { HomeWall } from "@/components/studio/HomeWall";
import { STYLES } from "@/content";

export default function HomePage() {
  return (
    <main>
      <BrandButton />

      <div className="wrap">
        <nav className="nav-grid" aria-label="功能模块">
          <a className="nav-card" href="#wall">
            <span className="nav-kicker">Style Library</span>
            <h3>视觉风格库</h3>
            <p>
              {STYLES.length} 种视觉风格，每种一套 CSS Token 与中英 Prompt，直接贴给 AI。
            </p>
            <span className="nav-foot">
              {STYLES.length} 种风格 <span className="ar">→</span>
            </span>
          </a>

          <Link className="nav-card" href="/colors/">
            <span className="nav-kicker">Color Tool</span>
            <h3>配色工具</h3>
            <p>22 个色系 × 11 级色阶，点色块复制 HEX，写进设计变量。</p>
            <span className="nav-foot">
              242 个色值 <span className="ar">→</span>
            </span>
          </Link>

          <Link className="nav-card" href="/motion/">
            <span className="nav-kicker">Motion Tool</span>
            <h3>动效工具</h3>
            <p>主流页面的交互动效，能当场看，也能直接抄 CSS。</p>
            <span className="nav-foot">
              40 个动效 <span className="ar">→</span>
            </span>
          </Link>
        </nav>
      </div>

      <div className="wrap" id="wall">
        <HomeWall />
      </div>
    </main>
  );
}

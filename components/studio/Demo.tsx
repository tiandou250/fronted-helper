/**
 * Demo 骨架：一套结构，16 套皮肤
 * 尺寸固定 1200×700，由外层 scale 缩放
 */
export function Demo({ id }: { id: string }) {
  return (
    <div className={`demo d-${id}`} aria-hidden="true">
      <div className="d-nav">
        <span className="d-logo">NOVA</span>
        <span className="d-links">产品　价格　文档</span>
        <span className="d-spacer" />
        <span className="d-cta">开始使用</span>
      </div>

      <div className="d-hero">
        <h2 className="d-h">
          把想法
          <br />
          直接做出来
        </h2>
        <p className="d-p">
          给独立开发者的部署工具。三十秒上线，不用配 CI，不用懂 Docker。
        </p>
        <span className="d-btn">免费试用</span>
      </div>

      <div className="d-cards">
        <div className="d-card">
          <div className="d-ic" />
          <b className="d-ct">零配置</b>
          <i className="d-cp">推代码就部署，配置文件一个字不用写。</i>
        </div>
        <div className="d-card">
          <div className="d-ic" />
          <b className="d-ct">边缘优先</b>
          <i className="d-cp">全球节点，冷启动低于 40 毫秒。</i>
        </div>
        <div className="d-card">
          <div className="d-ic" />
          <b className="d-ct">一次付费</b>
          <i className="d-cp">按项目收费，不按座位和请求数。</i>
        </div>
      </div>
    </div>
  );
}

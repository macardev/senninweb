export default function DesignDarkTech({ compact = false }) {
  return (
    <div className="dt-root" style={{ background: '#020206', fontFamily: "'Inter', sans-serif", borderRadius: compact ? '12px' : '16px', overflow: 'hidden', height: compact ? '100%' : 'auto', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;600&display=swap');

        .dt-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dt-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px);
          pointer-events: none;
          z-index: 1;
        }

        .dt-glow-top {
          position: absolute;
          top: ${compact ? '-40px' : '-80px'};
          left: 50%;
          transform: translateX(-50%);
          width: ${compact ? '200px' : '400px'};
          height: ${compact ? '100px' : '200px'};
          background: radial-gradient(ellipse, rgba(0,255,150,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .dt-content {
          position: relative;
          z-index: 2;
        }

        .dt-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${compact ? '10px 16px' : '16px 32px'};
          border-bottom: 1px solid rgba(0,255,150,0.12);
        }

        .dt-tb-logo {
          font-family: 'Space Mono', monospace;
          font-size: ${compact ? '12px' : '14px'};
          color: #00FF96;
          letter-spacing: 0.1em;
        }

        .dt-tb-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(0,255,150,0.5);
        }

        .dt-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00FF96;
          animation: dt-blink 1.4s ease-in-out infinite;
        }

        @keyframes dt-blink {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.2 }
        }

        .dt-tb-nav {
          display: flex;
          gap: ${compact ? '10px' : '20px'};
        }

        .dt-tb-nav span {
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
        }

        .dt-hero {
          padding: ${compact ? '20px 16px 0' : '48px 32px 0'};
          display: grid;
          grid-template-columns: ${compact ? '1fr' : '1fr auto'};
          gap: ${compact ? '16px' : '32px'};
          align-items: start;
        }

        .dt-tag {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #00FF96;
          text-transform: uppercase;
          margin-bottom: ${compact ? '8px' : '20px'};
          opacity: 0.7;
        }

        .dt-h2 {
          font-size: ${compact ? '24px' : '54px'};
          font-weight: 600;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: ${compact ? '8px' : '20px'};
        }

        .dt-h2 .dt-accent { color: #00FF96; }
        .dt-h2 .dt-dim { color: rgba(255,255,255,0.25); }

        .dt-sub {
          font-size: ${compact ? '11px' : '14px'};
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          max-width: 280px;
          font-weight: 300;
          margin-bottom: ${compact ? '12px' : '32px'};
        }

        .dt-btn-row {
          display: flex;
          gap: 8px;
          margin-bottom: ${compact ? '16px' : '48px'};
        }

        .dt-btn-neon {
          background: transparent;
          border: 1px solid #00FF96;
          color: #00FF96;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: ${compact ? '6px 14px' : '11px 22px'};
          border-radius: 4px;
          cursor: pointer;
          text-transform: uppercase;
        }

        .dt-btn-ghost {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: ${compact ? '6px 14px' : '11px 22px'};
          border-radius: 4px;
          cursor: pointer;
        }

        .dt-terminal {
          background: rgba(0,255,150,0.04);
          border: 1px solid rgba(0,255,150,0.15);
          border-radius: 8px;
          padding: ${compact ? '12px' : '20px'};
          width: ${compact ? '100%' : '240px'};
          font-family: 'Space Mono', monospace;
        }

        .dt-t-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: ${compact ? '8px' : '16px'};
        }

        .dt-t-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .dt-t-line {
          font-size: ${compact ? '9px' : '11px'};
          line-height: 1.8;
          color: rgba(0,255,150,0.5);
        }

        .dt-t-line .dt-cmd { color: #00FF96; }
        .dt-t-line .dt-out { color: rgba(255,255,255,0.3); }

        .dt-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .dt-metric {
          padding: ${compact ? '10px 12px' : '20px 24px'};
          border-right: 1px solid rgba(255,255,255,0.06);
        }

        .dt-metric:last-child { border-right: none; }

        .dt-m-val {
          font-family: 'Space Mono', monospace;
          font-size: ${compact ? '16px' : '26px'};
          color: #fff;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .dt-m-val span { color: #00FF96; }

        .dt-m-label {
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          margin-top: 4px;
          letter-spacing: 0.04em;
        }

        .dt-m-change {
          font-size: 9px;
          color: #00FF96;
          margin-top: 2px;
          font-family: 'Space Mono', monospace;
        }

        .dt-bottom {
          padding: ${compact ? '8px 16px' : '16px 32px'};
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dt-coord {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.06em;
        }
      `}</style>

      <div className="dt-scanlines"></div>
      <div className="dt-glow-top"></div>
      <div className="dt-content">
        <div className="dt-topbar">
          <div className="dt-tb-logo">SYNT_X</div>
          <div className="dt-tb-status">
            <span className="dt-status-dot"></span>
            LIVE · 3,241 nodes
          </div>
          <div className="dt-tb-nav">
            <span>Network</span><span>Deploy</span><span>Monitor</span><span>Docs</span>
          </div>
        </div>

        <div className="dt-hero">
          <div>
            <div className="dt-tag">// Infrastructure for the edge</div>
            <h2 className="dt-h2">
              Build at<br />
              <span className="dt-accent">machine</span><br />
              <span className="dt-dim">speed.</span>
            </h2>
            <p className="dt-sub">
              {compact
                ? 'Zero-latency distributed compute. Deploy to 180+ regions.'
                : 'Zero-latency distributed compute. Deploy to 180+ regions in under 40ms. No cold starts, no limits.'
              }
            </p>
            <div className="dt-btn-row">
              <button className="dt-btn-neon">Start building</button>
              <button className="dt-btn-ghost">View docs</button>
            </div>
          </div>
          <div className="dt-terminal">
            <div className="dt-t-header">
              <div className="dt-t-dot" style={{ background: '#ff5f57' }}></div>
              <div className="dt-t-dot" style={{ background: '#febc2e' }}></div>
              <div className="dt-t-dot" style={{ background: '#28c840' }}></div>
            </div>
            <div className="dt-t-line"><span className="dt-cmd">$ syntx deploy</span></div>
            <div className="dt-t-line"><span className="dt-out">Compiling edge fn... </span><span className="dt-cmd">done</span></div>
            <div className="dt-t-line"><span className="dt-out">Deploying to 180 regions</span></div>
            <div className="dt-t-line"><span className="dt-out">Latency p99: </span><span className="dt-cmd">12ms</span></div>
            <div className="dt-t-line"><span className="dt-out">Status: </span><span className="dt-cmd">● LIVE</span></div>
            <div className="dt-t-line" style={{ marginTop: '6px' }}><span className="dt-cmd">_</span></div>
          </div>
        </div>

        {!compact && (
          <>
            <div className="dt-metrics">
              <div className="dt-metric">
                <div className="dt-m-val">12<span>ms</span></div>
                <div className="dt-m-label">Global p99 latency</div>
                <div className="dt-m-change">↓ 34% vs last week</div>
              </div>
              <div className="dt-metric">
                <div className="dt-m-val">180<span>+</span></div>
                <div className="dt-m-label">Edge regions</div>
                <div className="dt-m-change">↑ 12 new added</div>
              </div>
              <div className="dt-metric">
                <div className="dt-m-val">99<span>.99%</span></div>
                <div className="dt-m-label">Uptime SLA</div>
                <div className="dt-m-change">↑ Maintained 18mo</div>
              </div>
              <div className="dt-metric">
                <div className="dt-m-val">3.2<span>B</span></div>
                <div className="dt-m-label">Req / day</div>
                <div className="dt-m-change">↑ 18% MoM growth</div>
              </div>
            </div>

            <div className="dt-bottom">
              <div className="dt-coord">40.7128°N 29.0803°E · BURSA NODE ACTIVE</div>
              <div className="dt-coord">SYS_TIME 14:32:07 UTC · BUILD v4.2.1</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

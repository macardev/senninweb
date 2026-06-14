export default function DesignEditorial({ compact = false }) {
  return (
    <div className="editorial-root" style={{ background: '#F5F0E8', fontFamily: "'DM Sans', sans-serif", borderRadius: compact ? '12px' : '16px', overflow: 'hidden', height: compact ? '100%' : 'auto' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .editorial-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .editorial-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${compact ? '12px 20px' : '20px 36px'};
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .editorial-nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: ${compact ? '15px' : '18px'};
          letter-spacing: -0.02em;
          color: #1a1a1a;
        }

        .editorial-nav-links {
          display: flex;
          gap: ${compact ? '14px' : '28px'};
        }

        .editorial-nav-links span {
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #888;
          cursor: pointer;
        }

        .editorial-nav-tag {
          font-size: 10px;
          background: #1a1a1a;
          color: #F5F0E8;
          padding: 4px 10px;
          border-radius: 100px;
          letter-spacing: 0.04em;
        }

        .editorial-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: ${compact ? '200px' : '340px'};
        }

        .editorial-hero-left {
          padding: ${compact ? '20px 20px' : '48px 36px'};
          border-right: 1px solid rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .editorial-issue-num {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: ${compact ? '10px' : '24px'};
        }

        .editorial-hero-headline {
          font-family: 'Playfair Display', serif;
          font-size: ${compact ? '28px' : '52px'};
          font-weight: 700;
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: #1a1a1a;
        }

        .editorial-hero-headline em {
          font-style: italic;
          font-weight: 400;
          color: #8B6F4E;
        }

        .editorial-hero-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: ${compact ? '10px' : '32px'};
        }

        .editorial-hero-meta-line {
          width: 24px;
          height: 1px;
          background: #888;
        }

        .editorial-hero-meta span {
          font-size: 10px;
          color: #888;
        }

        .editorial-hero-right {
          padding: ${compact ? '20px 20px' : '48px 36px'};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .editorial-big-quote {
          font-family: 'Playfair Display', serif;
          font-size: ${compact ? '16px' : '28px'};
          font-style: italic;
          line-height: 1.4;
          color: #2a2a2a;
          border-left: 2px solid #8B6F4E;
          padding-left: ${compact ? '12px' : '20px'};
          margin-bottom: auto;
        }

        .editorial-accent-pill {
          display: inline-block;
          background: #D4956A;
          color: #fff;
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
          margin-top: ${compact ? '10px' : '28px'};
        }

        .editorial-grid-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(0,0,0,0.08);
        }

        .editorial-grid-card {
          padding: ${compact ? '14px 14px' : '28px 28px'};
          border-right: 1px solid rgba(0,0,0,0.08);
        }

        .editorial-grid-card:last-child {
          border-right: none;
        }

        .editorial-card-num {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #888;
          text-transform: uppercase;
          margin-bottom: ${compact ? '6px' : '16px'};
        }

        .editorial-card-title {
          font-family: 'Playfair Display', serif;
          font-size: ${compact ? '14px' : '20px'};
          line-height: 1.2;
          color: #1a1a1a;
          margin-bottom: 6px;
        }

        .editorial-card-body {
          font-size: ${compact ? '11px' : '13px'};
          line-height: 1.6;
          color: #666;
          font-weight: 300;
        }

        .editorial-card-link {
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #8B6F4E;
          margin-top: ${compact ? '6px' : '14px'};
          display: inline-block;
          cursor: pointer;
        }

        .editorial-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${compact ? '10px 20px' : '18px 36px'};
          border-top: 1px solid rgba(0,0,0,0.08);
        }

        .editorial-scroll-text {
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #888;
        }

        .editorial-ticker {
          font-family: 'Playfair Display', serif;
          font-size: 11px;
          color: #8B6F4E;
          font-style: italic;
        }
      `}</style>

      <nav className="editorial-nav">
        <div className="editorial-nav-logo">Meridian</div>
        <div className="editorial-nav-links">
          <span>Editorial</span>
          <span>Archive</span>
          <span>Studio</span>
          <span>About</span>
        </div>
        <div className="editorial-nav-tag">Issue 14</div>
      </nav>

      <div className="editorial-hero">
        <div className="editorial-hero-left">
          <div>
            <div className="editorial-issue-num">Feature · June 2026</div>
            <h1 className="editorial-hero-headline">The art of<br /><em>unhurried</em><br />making</h1>
          </div>
          <div className="editorial-hero-meta">
            <div className="editorial-hero-meta-line"></div>
            <span>12 min read · Craft & Process</span>
          </div>
        </div>
        <div className="editorial-hero-right">
          <div className="editorial-big-quote">
            &ldquo;Slowness is not inefficiency. It is the <em>texture</em> of attention.&rdquo;
          </div>
          <div>
            <div className="editorial-accent-pill">Read the essay</div>
          </div>
        </div>
      </div>

      {!compact && (
        <>
          <div className="editorial-grid-section">
            <div className="editorial-grid-card">
              <div className="editorial-card-num">01 — Typography</div>
              <div className="editorial-card-title">Playfair Display & DM Sans</div>
              <div className="editorial-card-body">Serif display için dramatik kontrast, body için nefes alan sans-serif. Zıt karakterler arasında gerilim.</div>
              <div className="editorial-card-link">Keşfet →</div>
            </div>
            <div className="editorial-grid-card">
              <div className="editorial-card-num">02 — Renk</div>
              <div className="editorial-card-title">Krem, toprak, amber</div>
              <div className="editorial-card-body">Ekrandan kâğıda geçiş hissi. #F5F0E8 zemini, #8B6F4E aksanı ile organik sıcaklık.</div>
              <div className="editorial-card-link">Keşfet →</div>
            </div>
            <div className="editorial-grid-card">
              <div className="editorial-card-num">03 — Grid</div>
              <div className="editorial-card-title">Gazete layoutu, dijital ruh</div>
              <div className="editorial-card-body">Sütunlar, ince çizgiler, hiyerarşi. Broadsheet estetiği ile modern web akışı bir arada.</div>
              <div className="editorial-card-link">Keşfet →</div>
            </div>
          </div>

          <div className="editorial-bottom-bar">
            <div className="editorial-scroll-text">Scroll to explore</div>
            <div className="editorial-ticker">Editorial · Craft · Slowness · Making · Design</div>
          </div>
        </>
      )}
    </div>
  )
}

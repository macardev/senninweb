export default function DesignNeobrutalist({ compact = false }) {
  return (
    <div className="neo-root" style={{ background: '#FAFAFA', fontFamily: "'Epilogue', sans-serif", borderRadius: compact ? '12px' : '16px', overflow: 'hidden', height: compact ? '100%' : 'auto', border: '2px solid #111' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Epilogue:ital,wght@0,300;0,400;1,300&display=swap');

        .neo-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .neo-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${compact ? '10px 16px' : '18px 28px'};
          border-bottom: 2px solid #111;
          background: #FAFAFA;
        }

        .neo-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: ${compact ? '16px' : '20px'};
          color: #111;
          letter-spacing: -0.03em;
        }

        .neo-nav-links {
          display: flex;
          gap: 0;
        }

        .neo-nav-links a {
          font-size: ${compact ? '10px' : '12px'};
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #111;
          padding: ${compact ? '4px 10px' : '8px 16px'};
          border: 1px solid transparent;
          cursor: pointer;
          text-decoration: none;
        }

        .neo-nav-links a:hover { border-color: #111; border-radius: 100px; }

        .neo-hire-btn {
          background: #FF5733;
          border: 1.5px solid #111;
          border-radius: 100px;
          font-size: ${compact ? '9px' : '11px'};
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: ${compact ? '4px 10px' : '6px 14px'};
          color: #fff;
          cursor: pointer;
        }

        .neo-hero {
          display: grid;
          grid-template-columns: ${compact ? '1fr' : '1fr 280px'};
          border-bottom: 2px solid #111;
        }

        .neo-hero-left {
          padding: ${compact ? '20px 16px' : '52px 36px'};
          border-right: ${compact ? 'none' : '2px solid #111'};
        }

        .neo-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: ${compact ? '12px' : '24px'};
        }

        .neo-eyebrow-pill {
          background: #FFE14D;
          border: 1.5px solid #111;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 12px;
          color: #111;
        }

        .neo-eyebrow-line {
          width: 30px;
          height: 1.5px;
          background: #111;
        }

        .neo-h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: ${compact ? '28px' : '56px'};
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #111;
          margin-bottom: ${compact ? '10px' : '24px'};
        }

        .neo-h3 .neo-stroke {
          -webkit-text-stroke: 2px #111;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .neo-h3 .neo-coral {
          color: #FF5733;
          -webkit-text-fill-color: #FF5733;
        }

        .neo-desc {
          font-size: ${compact ? '11px' : '14px'};
          line-height: 1.7;
          color: #555;
          max-width: 280px;
          font-weight: 300;
          font-style: italic;
          margin-bottom: ${compact ? '14px' : '36px'};
        }

        .neo-cta-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .neo-btn-main {
          background: #111;
          color: #FAFAFA;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: ${compact ? '10px' : '13px'};
          letter-spacing: 0.04em;
          padding: ${compact ? '8px 16px' : '14px 28px'};
          border-radius: 100px;
          border: 2px solid #111;
          cursor: pointer;
          text-transform: uppercase;
        }

        .neo-btn-out {
          background: transparent;
          color: #111;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: ${compact ? '10px' : '13px'};
          letter-spacing: 0.04em;
          padding: ${compact ? '8px 14px' : '14px 24px'};
          border-radius: 100px;
          border: 2px solid #111;
          cursor: pointer;
          text-transform: uppercase;
        }

        .neo-hero-right {
          background: #FFE14D;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: ${compact ? '16px' : '32px 28px'};
        }

        .neo-blob-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .neo-blob {
          width: ${compact ? '80px' : '160px'};
          height: ${compact ? '80px' : '160px'};
          background: #FF5733;
          border-radius: 60% 40% 70% 30% / 50% 60% 40% 55%;
          border: 2px solid #111;
          animation: neo-morph 5s ease-in-out infinite;
        }

        .neo-blob-inner {
          position: absolute;
          width: ${compact ? '40px' : '80px'};
          height: ${compact ? '40px' : '80px'};
          background: #FFE14D;
          border: 2px solid #111;
          border-radius: 40% 60% 30% 70% / 60% 40% 70% 35%;
          animation: neo-morph 3.5s ease-in-out infinite reverse;
        }

        @keyframes neo-morph {
          0%, 100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 55%; }
          33% { border-radius: 30% 70% 40% 60% / 70% 30% 60% 40%; }
          66% { border-radius: 50% 50% 30% 70% / 40% 60% 70% 30%; }
        }

        .neo-hero-right-label {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #111;
          opacity: 0.5;
          text-align: center;
        }

        .neo-works {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 2px solid #111;
        }

        .neo-work-card {
          padding: ${compact ? '14px' : '24px 24px'};
          border-right: 2px solid #111;
          cursor: pointer;
        }

        .neo-work-card:last-child { border-right: none; }

        .neo-wc-num {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #aaa;
          text-transform: uppercase;
          margin-bottom: ${compact ? '6px' : '14px'};
        }

        .neo-wc-tag {
          display: inline-block;
          border: 1.5px solid #111;
          border-radius: 100px;
          font-size: 9px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 2px 8px;
          color: #111;
          margin-bottom: ${compact ? '4px' : '12px'};
        }

        .neo-wc-title {
          font-family: 'Syne', sans-serif;
          font-size: ${compact ? '13px' : '17px'};
          font-weight: 700;
          color: #111;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .neo-wc-sub {
          font-size: ${compact ? '10px' : '12px'};
          color: #777;
          line-height: 1.5;
          font-style: italic;
          font-weight: 300;
        }

        .neo-wc-arrow {
          font-size: 16px;
          color: #111;
          margin-top: ${compact ? '6px' : '16px'};
          display: block;
        }

        .neo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${compact ? '8px 16px' : '14px 28px'};
        }

        .neo-f-copy {
          font-size: 10px;
          color: #aaa;
          letter-spacing: 0.04em;
        }

        .neo-f-socials {
          display: flex;
          gap: 12px;
        }

        .neo-f-socials span {
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #111;
          cursor: pointer;
        }
      `}</style>

      <nav className="neo-nav">
        <div className="neo-logo">Forma</div>
        <div className="neo-nav-links">
          <a>Work</a><a>Studio</a><a>Journal</a><a>Contact</a>
        </div>
        <div className="neo-hire-btn">Hire us</div>
      </nav>

      <div className="neo-hero">
        <div className="neo-hero-left">
          <div className="neo-eyebrow">
            <div className="neo-eyebrow-pill">Creative Studio</div>
            <div className="neo-eyebrow-line"></div>
            <span style={{ fontSize: '10px', color: '#aaa', letterSpacing: '0.04em' }}>Est. 2019</span>
          </div>
          <h1 className="neo-h3">
            We design<br />
            <span className="neo-stroke">things that</span><br />
            <span className="neo-coral">matter.</span>
          </h1>
          <p className="neo-desc">
            {compact
              ? 'Brand identities, digital products, and campaigns that push boundaries.'
              : 'Brand identities, digital products, and campaigns that push boundaries — without losing the human touch.'
            }
          </p>
          <div className="neo-cta-row">
            <button className="neo-btn-main">View our work</button>
            <button className="neo-btn-out">Let's talk</button>
          </div>
        </div>
        {!compact && (
          <div className="neo-hero-right">
            <div className="neo-hero-right-label">Selected works '26</div>
            <div className="neo-blob-area">
              <div className="neo-blob"></div>
              <div className="neo-blob-inner"></div>
            </div>
            <div className="neo-hero-right-label">Scroll to explore ↓</div>
          </div>
        )}
      </div>

      {!compact && (
        <>
          <div className="neo-works">
            <div className="neo-work-card">
              <div className="neo-wc-num">01 / 06</div>
              <div className="neo-wc-tag">Branding</div>
              <div className="neo-wc-title">Volta Energy Rebrand</div>
              <div className="neo-wc-sub">Identity system for a clean energy startup</div>
              <span className="neo-wc-arrow">↗</span>
            </div>
            <div className="neo-work-card">
              <div className="neo-wc-num">02 / 06</div>
              <div className="neo-wc-tag">Product</div>
              <div className="neo-wc-title">Kira Finance App</div>
              <div className="neo-wc-sub">End-to-end UX/UI for mobile banking</div>
              <span className="neo-wc-arrow">↗</span>
            </div>
            <div className="neo-work-card">
              <div className="neo-wc-num">03 / 06</div>
              <div className="neo-wc-tag">Campaign</div>
              <div className="neo-wc-title">Lune Cosmetics SS26</div>
              <div className="neo-wc-sub">Digital campaign + art direction</div>
              <span className="neo-wc-arrow">↗</span>
            </div>
          </div>

          <div className="neo-footer">
            <div className="neo-f-copy">© 2026 Forma Studio</div>
            <div className="neo-f-socials">
              <span>Behance</span><span>Instagram</span><span>LinkedIn</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

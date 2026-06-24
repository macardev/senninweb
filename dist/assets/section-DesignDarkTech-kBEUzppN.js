import{j as e}from"./vendor-react-qGFduViA.js";function a({compact:s=!1}){return e.jsxs("div",{className:"dt-root",style:{background:"#020206",fontFamily:"'Inter', sans-serif",borderRadius:s?"12px":"16px",overflow:"hidden",height:s?"100%":"auto",position:"relative"},children:[e.jsx("style",{children:`
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
          top: ${s?"-40px":"-80px"};
          left: 50%;
          transform: translateX(-50%);
          width: ${s?"200px":"400px"};
          height: ${s?"100px":"200px"};
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
          padding: ${s?"10px 16px":"16px 32px"};
          border-bottom: 1px solid rgba(0,255,150,0.12);
        }

        .dt-tb-logo {
          font-family: 'Space Mono', monospace;
          font-size: ${s?"12px":"14px"};
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
          gap: ${s?"10px":"20px"};
        }

        .dt-tb-nav span {
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
        }

        .dt-hero {
          padding: ${s?"20px 16px 0":"48px 32px 0"};
          display: grid;
          grid-template-columns: ${s?"1fr":"1fr auto"};
          gap: ${s?"16px":"32px"};
          align-items: start;
        }

        .dt-tag {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #00FF96;
          text-transform: uppercase;
          margin-bottom: ${s?"8px":"20px"};
          opacity: 0.7;
        }

        .dt-h2 {
          font-size: ${s?"24px":"54px"};
          font-weight: 600;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: ${s?"8px":"20px"};
        }

        .dt-h2 .dt-accent { color: #00FF96; }
        .dt-h2 .dt-dim { color: rgba(255,255,255,0.25); }

        .dt-sub {
          font-size: ${s?"11px":"14px"};
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          max-width: 280px;
          font-weight: 300;
          margin-bottom: ${s?"12px":"32px"};
        }

        .dt-btn-row {
          display: flex;
          gap: 8px;
          margin-bottom: ${s?"16px":"48px"};
        }

        .dt-btn-neon {
          background: transparent;
          border: 1px solid #00FF96;
          color: #00FF96;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: ${s?"6px 14px":"11px 22px"};
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
          padding: ${s?"6px 14px":"11px 22px"};
          border-radius: 4px;
          cursor: pointer;
        }

        .dt-terminal {
          background: rgba(0,255,150,0.04);
          border: 1px solid rgba(0,255,150,0.15);
          border-radius: 8px;
          padding: ${s?"12px":"20px"};
          width: ${s?"100%":"240px"};
          font-family: 'Space Mono', monospace;
        }

        .dt-t-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: ${s?"8px":"16px"};
        }

        .dt-t-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .dt-t-line {
          font-size: ${s?"9px":"11px"};
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
          padding: ${s?"10px 12px":"20px 24px"};
          border-right: 1px solid rgba(255,255,255,0.06);
        }

        .dt-metric:last-child { border-right: none; }

        .dt-m-val {
          font-family: 'Space Mono', monospace;
          font-size: ${s?"16px":"26px"};
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
          padding: ${s?"8px 16px":"16px 32px"};
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
      `}),e.jsx("div",{className:"dt-scanlines"}),e.jsx("div",{className:"dt-glow-top"}),e.jsxs("div",{className:"dt-content",children:[e.jsxs("div",{className:"dt-topbar",children:[e.jsx("div",{className:"dt-tb-logo",children:"SYNT_X"}),e.jsxs("div",{className:"dt-tb-status",children:[e.jsx("span",{className:"dt-status-dot"}),"LIVE · 3,241 nodes"]}),e.jsxs("div",{className:"dt-tb-nav",children:[e.jsx("span",{children:"Network"}),e.jsx("span",{children:"Deploy"}),e.jsx("span",{children:"Monitor"}),e.jsx("span",{children:"Docs"})]})]}),e.jsxs("div",{className:"dt-hero",children:[e.jsxs("div",{children:[e.jsx("div",{className:"dt-tag",children:"// Infrastructure for the edge"}),e.jsxs("h2",{className:"dt-h2",children:["Build at",e.jsx("br",{}),e.jsx("span",{className:"dt-accent",children:"machine"}),e.jsx("br",{}),e.jsx("span",{className:"dt-dim",children:"speed."})]}),e.jsx("p",{className:"dt-sub",children:s?"Zero-latency distributed compute. Deploy to 180+ regions.":"Zero-latency distributed compute. Deploy to 180+ regions in under 40ms. No cold starts, no limits."}),e.jsxs("div",{className:"dt-btn-row",children:[e.jsx("button",{className:"dt-btn-neon",children:"Start building"}),e.jsx("button",{className:"dt-btn-ghost",children:"View docs"})]})]}),e.jsxs("div",{className:"dt-terminal",children:[e.jsxs("div",{className:"dt-t-header",children:[e.jsx("div",{className:"dt-t-dot",style:{background:"#ff5f57"}}),e.jsx("div",{className:"dt-t-dot",style:{background:"#febc2e"}}),e.jsx("div",{className:"dt-t-dot",style:{background:"#28c840"}})]}),e.jsx("div",{className:"dt-t-line",children:e.jsx("span",{className:"dt-cmd",children:"$ syntx deploy"})}),e.jsxs("div",{className:"dt-t-line",children:[e.jsx("span",{className:"dt-out",children:"Compiling edge fn... "}),e.jsx("span",{className:"dt-cmd",children:"done"})]}),e.jsx("div",{className:"dt-t-line",children:e.jsx("span",{className:"dt-out",children:"Deploying to 180 regions"})}),e.jsxs("div",{className:"dt-t-line",children:[e.jsx("span",{className:"dt-out",children:"Latency p99: "}),e.jsx("span",{className:"dt-cmd",children:"12ms"})]}),e.jsxs("div",{className:"dt-t-line",children:[e.jsx("span",{className:"dt-out",children:"Status: "}),e.jsx("span",{className:"dt-cmd",children:"● LIVE"})]}),e.jsx("div",{className:"dt-t-line",style:{marginTop:"6px"},children:e.jsx("span",{className:"dt-cmd",children:"_"})})]})]}),!s&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"dt-metrics",children:[e.jsxs("div",{className:"dt-metric",children:[e.jsxs("div",{className:"dt-m-val",children:["12",e.jsx("span",{children:"ms"})]}),e.jsx("div",{className:"dt-m-label",children:"Global p99 latency"}),e.jsx("div",{className:"dt-m-change",children:"↓ 34% vs last week"})]}),e.jsxs("div",{className:"dt-metric",children:[e.jsxs("div",{className:"dt-m-val",children:["180",e.jsx("span",{children:"+"})]}),e.jsx("div",{className:"dt-m-label",children:"Edge regions"}),e.jsx("div",{className:"dt-m-change",children:"↑ 12 new added"})]}),e.jsxs("div",{className:"dt-metric",children:[e.jsxs("div",{className:"dt-m-val",children:["99",e.jsx("span",{children:".99%"})]}),e.jsx("div",{className:"dt-m-label",children:"Uptime SLA"}),e.jsx("div",{className:"dt-m-change",children:"↑ Maintained 18mo"})]}),e.jsxs("div",{className:"dt-metric",children:[e.jsxs("div",{className:"dt-m-val",children:["3.2",e.jsx("span",{children:"B"})]}),e.jsx("div",{className:"dt-m-label",children:"Req / day"}),e.jsx("div",{className:"dt-m-change",children:"↑ 18% MoM growth"})]})]}),e.jsxs("div",{className:"dt-bottom",children:[e.jsx("div",{className:"dt-coord",children:"40.7128°N 29.0803°E · BURSA NODE ACTIVE"}),e.jsx("div",{className:"dt-coord",children:"SYS_TIME 14:32:07 UTC · BUILD v4.2.1"})]})]})]})]})}export{a as D};

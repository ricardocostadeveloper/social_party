import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POST_DIR = path.join(__dirname, 'instagram_post');
const SLIDES_HTML_DIR = path.join(POST_DIR, 'slides_html');

if (!fs.existsSync(SLIDES_HTML_DIR)) {
  fs.mkdirSync(SLIDES_HTML_DIR, { recursive: true });
}

// Convert absolute paths to file:// URLs for instant local loading in Edge
const toFileUrl = (p) => 'file:///' + path.resolve(p).replace(/\\/g, '/');

const imgDesktopHome = toFileUrl(path.join(POST_DIR, '01_raw_desktop_home.png'));
const imgMobileHome = toFileUrl(path.join(POST_DIR, '02_raw_mobile_home.png'));
const imgEventModal = toFileUrl(path.join(POST_DIR, '03_raw_event_detail_modal.png'));
const imgCreateModal = toFileUrl(path.join(POST_DIR, '04_raw_create_event_modal.png'));
const imgProfileModal = toFileUrl(path.join(POST_DIR, '05_raw_profile_modal.png'));

const slidesData = [
  {
    num: '01',
    counter: '01 / 06',
    tag: 'PROJETO PESSOAL • REACT 19',
    title: 'Criei o app definitivo para achar <span class="gradient-text">rolês na cidade</span> ✨',
    subtitle: 'Cansado de caçar flyer em stories de 24h ou links perdidos em grupos? Centralizei baladas, pubs e festivais em uma só plataforma social.',
    cta: 'Arrasta pro lado 👉',
    type: 'desktop_cover',
    image: imgDesktopHome,
    badges: [
      { text: '⚡ Feed Ao Vivo em Tempo Real', top: '24px', right: '30px' },
      { text: '🔥 Lineups, Horários & Ingressos', bottom: '30px', left: '30px' }
    ]
  },
  {
    num: '02',
    counter: '02 / 06',
    tag: 'DESCOBERTA INTELIGENTE',
    title: 'Filtros dinâmicos por <span class="gradient-text">estilo musical e data</span> ⚡',
    subtitle: 'Vai sair Hoje, Amanhã ou Fim de Semana? Filtre por Techno, Funk, Pagode, Rock, Sertanejo ou Trap com apenas 1 clique.',
    cta: 'Arrasta pro lado 👉',
    type: 'desktop_feed',
    image: imgDesktopHome,
    badges: [
      { text: '📍 Filtro por Cidades Brasileiras', top: '24px', left: '30px' },
      { text: '👥 Contador de Quem Vai', bottom: '30px', right: '30px' }
    ]
  },
  {
    num: '03',
    counter: '03 / 06',
    tag: 'DETALHES DO EVENTO',
    title: 'Grade de horários dos DJs e <span class="gradient-text">botão "Eu Vou!"</span> 🎧',
    subtitle: 'Modal completo com timetable dos artistas, localização no mapa, lotes de ingressos e chuva de confete ao confirmar presença.',
    cta: 'Arrasta pro lado 👉',
    type: 'modal_event',
    image: imgEventModal,
    badges: [
      { text: '🎉 Confete Interativo no "Eu Vou!"', top: '20px', right: '25px' },
      { text: '💬 Comentários & Reviews da Galera', bottom: '25px', left: '25px' }
    ]
  },
  {
    num: '04',
    counter: '04 / 06',
    tag: 'MOBILE EXPERIENCE',
    title: 'Design fluido & responsivo <span class="gradient-text">no smartphone</span> 📱',
    subtitle: 'Construído mobile-first: layout adaptável, navegação ultrarrápida e interface escura inspirada na energia das pistas de dança.',
    cta: 'Arrasta pro lado 👉',
    type: 'mobile_showcase',
    imageMobile: imgMobileHome,
    imageDesktop: imgDesktopHome,
    badges: [
      { text: '✨ 100% Responsivo', top: '35px', right: '40px' },
      { text: '🚀 Zero Lag / Vite + React 19', bottom: '50px', left: '40px' }
    ]
  },
  {
    num: '05',
    counter: '05 / 06',
    tag: 'PARA PRODUTORES & CASAS',
    title: 'Cadastrou, divulgou: <span class="gradient-text">rolê no ar em 2 min</span> 📢',
    subtitle: 'Interface intuitiva para produtores independentes e donos de pubs cadastrarem atrações, horários, promoções e lotes de ingressos.',
    cta: 'Arrasta pro lado 👉',
    type: 'modal_create',
    image: imgCreateModal,
    badges: [
      { text: '🍸 Cadastro de Promos & Double Drink', top: '25px', left: '25px' },
      { text: '🎟️ Lotes & Setores (Pista, Camarote)', bottom: '25px', right: '25px' }
    ]
  },
  {
    num: '06',
    counter: '06 / 06',
    tag: 'FEEDBACK & TECH STACK',
    title: 'O que achou da ideia? <span class="gradient-text">Deixe seu comentário!</span> 💬',
    subtitle: 'Projeto desenvolvido como side project para passar o tempo e explorar boas práticas de UX. Qual feature você adicionaria?',
    cta: 'Comenta aqui embaixo 👇',
    type: 'stack_summary',
    imageProfile: imgProfileModal,
    techs: [
      { name: 'React 19', icon: '⚛️', desc: 'Componentes modernos' },
      { name: 'Vite 8', icon: '⚡', desc: 'Build ultrarrápido' },
      { name: 'Web Audio API', icon: '🔊', desc: 'Sintetizador de vibes' },
      { name: 'Canvas Confetti', icon: '🎉', desc: 'Microinterações' },
      { name: 'Lucide Icons', icon: '🎨', desc: 'Design System limpo' },
      { name: 'CSS Moderno', icon: '💎', desc: 'Glassmorphism & Gradients' }
    ]
  }
];

function buildSlideHtml(s) {
  let visualContent = '';

  if (s.type === 'desktop_cover' || s.type === 'desktop_feed') {
    visualContent = `
      <div class="visual-wrapper">
        <div class="browser-mockup">
          <div class="browser-header">
            <div class="window-controls">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="address-bar">
              <span class="lock">🔒</span>
              <span class="domain">socialparty.app</span>
              <span class="path">/descobrir-roles</span>
            </div>
            <div class="browser-actions">
              <span class="action-icon">⟳</span>
            </div>
          </div>
          <div class="browser-body">
            <img src="${s.image}" class="full-screen-img" />
          </div>
        </div>
        ${s.badges.map(b => `
          <div class="floating-pill" style="${b.top ? `top:${b.top};` : ''} ${b.bottom ? `bottom:${b.bottom};` : ''} ${b.left ? `left:${b.left};` : ''} ${b.right ? `right:${b.right};` : ''}">
            ${b.text}
          </div>
        `).join('')}
      </div>
    `;
  } else if (s.type === 'modal_event' || s.type === 'modal_create') {
    visualContent = `
      <div class="visual-wrapper">
        <div class="modal-card-mockup">
          <img src="${s.image}" class="modal-img" />
        </div>
        ${s.badges.map(b => `
          <div class="floating-pill" style="${b.top ? `top:${b.top};` : ''} ${b.bottom ? `bottom:${b.bottom};` : ''} ${b.left ? `left:${b.left};` : ''} ${b.right ? `right:${b.right};` : ''}">
            ${b.text}
          </div>
        `).join('')}
      </div>
    `;
  } else if (s.type === 'mobile_showcase') {
    visualContent = `
      <div class="visual-wrapper mobile-showcase-box">
        <div class="phone-device">
          <div class="phone-speaker"></div>
          <div class="phone-screen-container">
            <img src="${s.imageMobile}" class="phone-img" />
          </div>
        </div>
        <div class="back-card-preview">
          <div class="back-card-title">Visão Desktop Sincronizada</div>
          <img src="${s.imageDesktop}" class="back-img" />
        </div>
        ${s.badges.map(b => `
          <div class="floating-pill" style="${b.top ? `top:${b.top};` : ''} ${b.bottom ? `bottom:${b.bottom};` : ''} ${b.left ? `left:${b.left};` : ''} ${b.right ? `right:${b.right};` : ''}">
            ${b.text}
          </div>
        `).join('')}
      </div>
    `;
  } else if (s.type === 'stack_summary') {
    visualContent = `
      <div class="visual-wrapper stack-wrapper">
        <div class="tech-grid">
          ${s.techs.map(t => `
            <div class="tech-item">
              <span class="tech-ico">${t.icon}</span>
              <div class="tech-info">
                <span class="tech-title">${t.name}</span>
                <span class="tech-desc">${t.desc}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="profile-preview-card">
          <img src="${s.imageProfile}" />
        </div>
        <div class="cta-banner">
          <div class="pulse-indicator"></div>
          <span class="cta-banner-text">Você usaria no seu final de semana? Conta nos comentários! 👇</span>
        </div>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1080px;
      height: 1350px;
      background: #06080e;
      color: #f8fafc;
      font-family: 'Plus Jakarta Sans', sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 56px 54px 44px 54px;
    }

    /* Ambient Glows */
    .glow-top {
      position: absolute;
      top: -140px;
      right: -100px;
      width: 580px;
      height: 580px;
      background: radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, transparent 70%);
      z-index: 1;
      pointer-events: none;
    }
    .glow-bottom {
      position: absolute;
      bottom: -160px;
      left: -120px;
      width: 620px;
      height: 620px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%);
      z-index: 1;
      pointer-events: none;
    }
    .grid-lines {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 44px 44px;
      z-index: 2;
      pointer-events: none;
    }

    /* Top Bar */
    .top-header {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      padding: 10px 22px;
      border-radius: 999px;
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #ffffff;
    }
    .logo-badge .fire {
      color: #ec4899;
    }
    .slide-index {
      font-size: 16px;
      font-weight: 800;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 9px 20px;
      border-radius: 999px;
      letter-spacing: 1px;
    }

    /* Content Area */
    .content-area {
      position: relative;
      z-index: 10;
      margin-top: 18px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .tag-pill {
      display: inline-block;
      align-self: flex-start;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 6px 14px;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    .slide-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 43px;
      font-weight: 900;
      line-height: 1.16;
      color: #ffffff;
      margin-bottom: 14px;
      letter-spacing: -0.5px;
    }
    .gradient-text {
      background: linear-gradient(135deg, #ec4899 0%, #c084fc 50%, #38bdf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .slide-description {
      font-size: 18.5px;
      line-height: 1.48;
      color: #cbd5e1;
      max-width: 920px;
      margin-bottom: 18px;
    }

    /* Mockups */
    .visual-wrapper {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 6px;
      margin-bottom: 16px;
    }

    /* Browser Mockup */
    .browser-mockup {
      width: 100%;
      height: 640px;
      background: #0f1422;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.85),
                  0 0 50px rgba(236, 72, 153, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .browser-header {
      height: 42px;
      background: #141b2d;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 16px;
    }
    .window-controls {
      display: flex;
      gap: 7px;
    }
    .dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
    }
    .dot.red { background: #ef4444; }
    .dot.yellow { background: #f59e0b; }
    .dot.green { background: #10b981; }

    .address-bar {
      flex: 1;
      max-width: 480px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      padding: 4px 14px;
      font-size: 12.5px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: monospace;
    }
    .address-bar .lock {
      font-size: 11px;
    }
    .address-bar .domain {
      color: #ffffff;
      font-weight: 600;
    }
    .address-bar .path {
      color: #64748b;
    }
    .browser-actions {
      color: #64748b;
      font-size: 14px;
    }
    .browser-body {
      flex: 1;
      overflow: hidden;
      background: #07090e;
    }
    .full-screen-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }

    /* Modal Mockup */
    .modal-card-mockup {
      width: 100%;
      height: 640px;
      background: #0a0d18;
      border-radius: 22px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.85),
                  0 0 50px rgba(139, 92, 246, 0.2);
      overflow: hidden;
      display: flex;
    }
    .modal-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #07090e;
    }

    /* Floating Pill */
    .floating-pill {
      position: absolute;
      background: rgba(13, 17, 30, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.22);
      backdrop-filter: blur(20px);
      padding: 13px 22px;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(236, 72, 153, 0.25);
      z-index: 25;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Mobile Split */
    .mobile-showcase-box {
      display: flex;
      gap: 36px;
      align-items: center;
      justify-content: center;
    }
    .phone-device {
      width: 320px;
      height: 610px;
      background: #0f1423;
      border-radius: 42px;
      border: 4px solid #334155;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.85), 0 0 45px rgba(236, 72, 153, 0.25);
      position: relative;
      overflow: hidden;
      z-index: 10;
      flex-shrink: 0;
    }
    .phone-speaker {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 90px;
      height: 16px;
      background: #1e293b;
      border-radius: 12px;
      z-index: 20;
    }
    .phone-screen-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .phone-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
    .back-card-preview {
      width: 530px;
      height: 520px;
      background: #0f1423;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      opacity: 0.9;
    }
    .back-card-title {
      padding: 12px 18px;
      background: #141b2d;
      font-size: 13px;
      font-weight: 700;
      color: #94a3b8;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .back-img {
      width: 100%;
      flex: 1;
      object-fit: cover;
      object-position: top center;
    }

    /* Stack Slide */
    .stack-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: center;
    }
    .tech-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      width: 100%;
    }
    .tech-item {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px 18px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .tech-ico {
      font-size: 24px;
    }
    .tech-info {
      display: flex;
      flex-direction: column;
    }
    .tech-title {
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
    }
    .tech-desc {
      font-size: 12px;
      color: #94a3b8;
    }
    .profile-preview-card {
      width: 100%;
      height: 380px;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
    }
    .profile-preview-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    .cta-banner {
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15));
      border: 1px solid rgba(236, 72, 153, 0.35);
      padding: 18px 24px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
    }
    .pulse-indicator {
      width: 12px;
      height: 12px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10b981;
      flex-shrink: 0;
    }
    .cta-banner-text {
      font-size: 17px;
      font-weight: 700;
      color: #f1f5f9;
    }

    /* Footer */
    .bottom-footer {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .footer-left-tag {
      font-size: 14px;
      color: #64748b;
      font-weight: 600;
    }
    .footer-cta-pill {
      font-size: 16px;
      font-weight: 800;
      color: #f472b6;
      letter-spacing: 0.3px;
    }
  </style>
</head>
<body>
  <div class="grid-lines"></div>
  <div class="glow-top"></div>
  <div class="glow-bottom"></div>

  <header class="top-header">
    <div class="logo-badge">
      <span class="fire">🔥</span>
      <span>Social Party</span>
    </div>
    <div class="slide-index">${s.counter}</div>
  </header>

  <main class="content-area">
    <div class="tag-pill">${s.tag}</div>
    <h1 class="slide-heading">${s.title}</h1>
    <p class="slide-description">${s.subtitle}</p>
    ${visualContent}
  </main>

  <footer class="bottom-footer">
    <span class="footer-left-tag">Design & Web App Showcase • 2026</span>
    <span class="footer-cta-pill">${s.cta}</span>
  </footer>
</body>
</html>
  `;
}

async function renderAll() {
  console.log('Writing HTML slide files...');
  for (let i = 0; i < slidesData.length; i++) {
    const slide = slidesData[i];
    const html = buildSlideHtml(slide);
    const htmlPath = path.join(SLIDES_HTML_DIR, `slide_${slide.num}.html`);
    fs.writeFileSync(htmlPath, html, 'utf8');
  }

  console.log('Launching browser to capture slides via local file URLs...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1080,
    height: 1350,
    deviceScaleFactor: 2
  });

  for (let i = 0; i < slidesData.length; i++) {
    const slide = slidesData[i];
    const htmlPath = path.join(SLIDES_HTML_DIR, `slide_${slide.num}.html`);
    const fileUrl = toFileUrl(htmlPath);
    console.log(`Navigating to Slide ${slide.num}...`);
    await page.goto(fileUrl, { waitUntil: 'load', timeout: 15000 });
    // Small delay to ensure web fonts render smoothly
    await new Promise(r => setTimeout(r, 800));

    const outName = `slide_${slide.num}.png`;
    const outPath = path.join(POST_DIR, outName);
    await page.screenshot({ path: outPath });
    console.log(`Saved: ${outName}`);
  }

  await browser.close();
  console.log('SUCCESS! All 6 slides generated cleanly in instagram_post/ !');
}

renderAll().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});

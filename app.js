// ── Navbar scroll ──────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
});

// ── Hamburger ──────────────────────────────────
document.getElementById('hamburger').addEventListener('click', function () {
  const nl = document.getElementById('nav-links');
  if (nl.style.display === 'flex') {
    nl.style.display = '';
  } else {
    Object.assign(nl.style, {
      display:'flex', flexDirection:'column',
      position:'absolute', top:'70px', right:'24px',
      background:'rgba(6,9,18,.97)', padding:'20px',
      borderRadius:'16px', border:'1px solid rgba(255,255,255,.08)', gap:'16px'
    });
  }
});

// ── Counter animation ──────────────────────────
function runCounter(el) {
  const target = +el.dataset.target;
  const dur = 1800;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.floor(p * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); cObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.hstat-num').forEach(el => cObs.observe(el));

// ── Scroll reveal ──────────────────────────────
const rObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.feat-card, .htl-item, .dcap-card, .spec-row, .gallery-item, .cmp-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  rObs.observe(el);
});

// Status text cycling — matches actual operation sequence
const statuses = [
  '💧 Water jets spraying panels...',
  '🪟 Wiper sweeping linearly...',
  '🔄 Returning to start position...',
  '✅ Cycle complete — panels clean!'
];
let sIdx = 0;
const statusEl = document.getElementById('statusText');
setInterval(() => {
  if (statusEl) { statusEl.textContent = statuses[sIdx]; sIdx = (sIdx + 1) % statuses.length; }
}, 1800);

// Water wet effect → then clean (2-phase sequence matching actual system)
const CYCLE_MS = 5000;
function runCleanCycle() {
  // Phase 1: Jets wet the panel first
  ['wet1','wet2','wet3'].forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('wetted');
    }, i * 300);
  });
  // Phase 2: Wiper follows → panel goes clean
  ['clean1','clean2','clean3'].forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('cleaned');
      const wet = document.getElementById(id.replace('clean','wet'));
      if (wet) wet.classList.remove('wetted');
    }, 800 + i * 500);
  });
  // Reset for next cycle
  setTimeout(() => {
    ['clean1','clean2','clean3','wet1','wet2','wet3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.classList.remove('cleaned'); el.classList.remove('wetted'); }
    });
  }, CYCLE_MS * 0.92);
}
setInterval(runCleanCycle, CYCLE_MS);
runCleanCycle();

// ── Contact form ──────────────────────────────
const cf = document.getElementById('cform');
if (cf) {
  cf.addEventListener('submit', e => {
    e.preventDefault();
    const btn = cf.querySelector('button');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#06b6d4)';
    setTimeout(() => { btn.textContent = 'Send Message ↗'; btn.style.background = ''; cf.reset(); }, 3000);
  });
}

// ── Smooth stagger for feature cards ──────────
document.querySelectorAll('.features-grid .feat-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});
document.querySelectorAll('.how-timeline .htl-item').forEach((card, i) => {
  card.style.transitionDelay = `${i * 120}ms`;
});

// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Nav: fundo ao rolar, esconde ao descer, mostra ao subir
const nav = document.getElementById('nav');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 24);
  if (!nav.classList.contains('is-open')) {
    nav.classList.toggle('is-hidden', y > lastY && y > 400);
  }
  lastY = y;
}, { passive: true });

// Hero: a foto acompanha levemente o mouse e desce mais devagar que a página
const hero = document.getElementById('inicio');
const heroBg = document.getElementById('heroBg');
const heroImg = heroBg.querySelector('img');
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!calm) {
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = hero.getBoundingClientRect();
    heroImg.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * -16}px`);
    heroImg.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * -10}px`);
  });
  hero.addEventListener('pointerleave', () => {
    heroImg.style.setProperty('--px', '0px');
    heroImg.style.setProperty('--py', '0px');
  });
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) heroBg.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
  }, { passive: true });
}

// Menu mobile
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
const setMenu = (open) => {
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Revelar elementos ao entrar na tela
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      revealer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));

// Filtro de "Mais projetos"
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
filters.forEach((btn) => btn.addEventListener('click', () => {
  const cat = btn.dataset.filter;
  filters.forEach((b) => {
    b.classList.toggle('is-active', b === btn);
    b.setAttribute('aria-pressed', String(b === btn));
  });
  projects.forEach((p) => {
    p.classList.toggle('is-hidden', cat !== 'todos' && !p.dataset.cat.split(' ').includes(cat));
  });
}));

// Link ativo na navegação
const navLinks = [...links.querySelectorAll('a[href^="#"]')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

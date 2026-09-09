export function initScrollspy() {
  // ---------- Link ativo conforme a seção visível ----------
  // NOTA: lógica movida tal como estava no protótipo. O bug do "sensor
  // amarelo" (indicador que some antes da hora no fim da página) e a
  // variável "sections" sem uso serão corrigidos na Fase 2 do roadmap.
  const sections = document.querySelectorAll('main, header[id], section[id]');
  const navItems = document.querySelectorAll('.nav-links a[data-nav]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('is-active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  document.querySelectorAll('header[id], section[id]').forEach(sec => observer.observe(sec));
}

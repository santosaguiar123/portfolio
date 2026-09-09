export function initScrollspy() {
  const observedSections = [...document.querySelectorAll('header[id], section[id]')];
  const navItems = document.querySelectorAll('.nav-links a[data-nav]');

  if (!observedSections.length || !navItems.length) return;

  function setActiveSection(section) {
    navItems.forEach(item => {
      const isActive = item.getAttribute('href') === `#${section.id}`;
      item.classList.toggle('is-active', isActive);
      if (isActive) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  function syncActiveSection() {
    // O fim da página tem prioridade, inclusive nos callbacks do observer.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      setActiveSection(observedSections[observedSections.length - 1]);
      return;
    }

    let activeSection = observedSections[0];
    for (const section of observedSections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        activeSection = section;
      }
    }
    setActiveSection(activeSection);
  }

  let framePending = false;
  function scheduleSync() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(() => {
      framePending = false;
      syncActiveSection();
    });
  }

  syncActiveSection();

  // Uma decisão única evita depender da ordem das entradas do observer.
  const observer = new IntersectionObserver(syncActiveSection, {
    rootMargin: '-40% 0px -55% 0px',
  });
  observedSections.forEach(section => observer.observe(section));

  // Complementa a faixa estreita do observer em saltos e mudanças de viewport.
  window.addEventListener('scroll', scheduleSync, { passive: true });
  window.addEventListener('resize', scheduleSync);
  window.addEventListener('hashchange', scheduleSync);
  window.addEventListener('load', scheduleSync, { once: true });
  window.addEventListener('pageshow', scheduleSync);
}

import { contact } from '../data/contact.js';

function profileUrl(value, host) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      [host, `www.${host}`].includes(url.hostname) &&
      !url.username && !url.password && !url.port && url.pathname !== '/'
      ? url : null;
  } catch {
    return null;
  }
}

export function initContact() {
  const email = contact.email.trim();
  const validEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email);
  const emailCard = document.querySelector('[data-contact="email"]');
  if (emailCard) {
    emailCard.removeAttribute('target');
    emailCard.removeAttribute('rel');
    if (validEmail) {
      emailCard.href = `mailto:${email}?subject=${encodeURIComponent('Contato via portfólio')}`;
      emailCard.querySelector('span').textContent = email;
      emailCard.setAttribute('aria-label', `Enviar e-mail para ${email}`);
      emailCard.removeAttribute('aria-disabled');
    }
  }

  for (const [key, label, host] of [
    ['linkedin', 'LinkedIn', 'linkedin.com'],
    ['github', 'GitHub', 'github.com'],
  ]) {
    const card = document.querySelector(`[data-contact="${key}"]`);
    if (!card) continue;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    const url = profileUrl(contact[key], host);
    if (!url) continue;
    card.href = url.href;
    card.querySelector('span').textContent = url.href.replace(/^https:\/\//, '').replace(/\/$/, '');
    card.setAttribute('aria-label', `Abrir perfil no ${label} (nova aba)`);
    card.removeAttribute('aria-disabled');
  }

  const copyButton = document.querySelector('.contact-copy');
  if (!copyButton) return;
  copyButton.disabled = !validEmail;
  let resetTimer;
  copyButton.onclick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      clearTimeout(resetTimer);
      copyButton.textContent = 'Copiado!';
      resetTimer = setTimeout(() => {
        copyButton.textContent = 'Copiar e-mail';
      }, 2000);
    } catch {
      // A ausência de permissão ou da API não interrompe a navegação.
    }
  };
}

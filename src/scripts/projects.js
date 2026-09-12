import { projects } from '../data/projects.js';

function isRepositoryUrl(value) {
  if (typeof value !== 'string' || !value.startsWith('https://github.com/')) return false;

  try {
    const url = new URL(value);
    return url.origin === 'https://github.com' && !url.username && !url.password
      && /^\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+\/?$/.test(url.pathname)
      && !url.search && !url.hash;
  } catch {
    return false;
  }
}

function createIcon(className) {
  const icon = document.createElement('i');
  icon.className = className;
  icon.setAttribute('aria-hidden', 'true');
  return icon;
}

export function initProjects() {
  const sidebar = document.querySelector('.projects-sidebar');
  const content = document.querySelector('.projects-content');
  if (!sidebar || !content) return;

  // Mantém os containers e o visual; a lista de dados determina botões e painéis.
  sidebar.querySelectorAll('.project-btn').forEach(button => button.remove());
  content.replaceChildren();

  projects.forEach((project, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `project-btn${index === 0 ? ' is-active' : ''}`;
    button.setAttribute('data-project', project.id);
    button.setAttribute('aria-controls', project.id);
    button.setAttribute('aria-label', `Mostrar projeto ${project.name}`);
    button.setAttribute('aria-pressed', String(index === 0));
    const label = document.createTextNode(` projeto-${String(index + 1).padStart(2, '0')}.js`);
    button.append(createIcon('fa-regular fa-file-code'), label);
    sidebar.append(button);

    const panel = document.createElement('div');
    panel.id = project.id;
    panel.className = `project-panel${index === 0 ? ' is-active' : ''}`;
    const title = document.createElement('h3');
    title.textContent = project.name;
    const description = document.createElement('p');
    description.textContent = project.description;
    const tags = document.createElement('div');
    tags.className = 'tech-tags';
    project.techs.forEach(tech => {
      const tag = document.createElement('span');
      tag.textContent = tech;
      tags.append(tag);
    });

    const link = document.createElement('a');
    link.className = 'btn-outline';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (isRepositoryUrl(project.githubUrl)) {
      link.href = project.githubUrl;
      link.setAttribute('aria-label', `Abrir repositório do projeto ${project.name} no GitHub (abre em nova aba)`);
      link.append(createIcon('fa-solid fa-arrow-up-right-from-square'), document.createTextNode(' Ver projeto'));
    } else {
      link.textContent = 'Link em breve';
      link.setAttribute('role', 'link');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('aria-label', `Repositório do projeto ${project.name} indisponível no momento`);
      if (import.meta.env.DEV) {
        console.warn(`[Projetos] githubUrl ausente ou inválida para "${project.name}". Preencha src/data/projects.js com https://github.com/usuario/repositorio.`);
      }
    }
    panel.append(title, description, tags, link);
    content.append(panel);
  });

  // ---------- Troca de projeto (sem recarregar a página) ----------
  const projectButtons = document.querySelectorAll('.project-btn');
  const projectPanels  = document.querySelectorAll('.project-panel');

  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-project');

      projectButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      projectPanels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      document.getElementById(target).classList.add('is-active');
    });
  });
}

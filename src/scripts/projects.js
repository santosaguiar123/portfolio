export function initProjects() {
  // ---------- Troca de projeto (sem recarregar a página) ----------
  const projectButtons = document.querySelectorAll('.project-btn');
  const projectPanels  = document.querySelectorAll('.project-panel');

  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-project');

      projectButtons.forEach(b => b.classList.remove('is-active'));
      projectPanels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      document.getElementById(target).classList.add('is-active');
    });
  });
}

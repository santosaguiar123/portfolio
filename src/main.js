// Estilos — ordem importa pouco aqui pois cada arquivo cuida de seletores
// próprios, mas manter tokens/base primeiro deixa a cascata mais previsível.
import './styles/tokens.css';
import './styles/base.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/sobre.css';
import './styles/skills.css';
import './styles/projetos.css';
import './styles/contato.css';
import './styles/footer.css';

// Comportamento
import { initNavbar } from './scripts/navbar.js';
import { initScrollspy } from './scripts/scrollspy.js';
import { initProjects } from './scripts/projects.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollspy();
  initProjects();
});

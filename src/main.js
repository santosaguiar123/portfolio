// Comportamento
import { initNavbar } from './scripts/navbar.js';
import { initScrollspy } from './scripts/scrollspy.js';
import { initProjects } from './scripts/projects.js';
import { initContact } from './scripts/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollspy();
  initProjects();
  initContact();
});

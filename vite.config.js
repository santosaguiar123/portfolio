import { defineConfig } from 'vite';

export default defineConfig({
  // base relativa: funciona tanto em localhost quanto em
  // https://<usuario>.github.io/<repositorio>/ sem precisar saber o nome
  // do repositório de antemão. Revisitar na Fase 5 se algo não carregar.
  base: './',
});

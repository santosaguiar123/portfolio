# Portfólio — Currículo Interativo

Site pessoal de portfólio/currículo, feito pra mostrar projetos e habilidades
pra recrutadores. Página única, com scroll suave entre seções e uma área de
projetos que troca de conteúdo sem recarregar a página.

Stack minimalista, de propósito: HTML5 + CSS3 + JavaScript puro (ES Modules),
com Vite só pra dev server e build. Sem framework, sem backend.

## Como rodar localmente

```bash
npm install
npm run dev
```

Isso sobe um servidor local com hot-reload (o Vite avisa a URL no terminal,
geralmente `http://localhost:5173`).

Outros comandos disponíveis:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a pasta dist/ localmente, pra conferir o build
```

## Estrutura de pastas

```
portfolio/
├── .github/workflows/     # pipeline de deploy automático (Fase 5)
├── public/
│   ├── favicon.svg
│   └── og-image.png       # placeholder — troca na Fase 5
├── src/
│   ├── main.js            # ponto de entrada: importa CSS e inicia os módulos JS
│   ├── styles/             # CSS separado por seção
│   ├── scripts/            # comportamento (navbar, scrollspy, projetos)
│   └── data/                # dados de projetos e contato, separados do HTML
├── index.html
├── vite.config.js
└── package.json
```

## Status do projeto

Este é o resultado da **Fase 1** do roadmap (fundação): o protótipo de arquivo
único foi modularizado em um projeto Vite organizado, **sem nenhuma mudança de
comportamento ainda**. Os bugs conhecidos (indicador de seção ativa, links dos
projetos e do contato) são corrigidos nas próximas fases.

- [ ] Fase 2 — corrigir o indicador de seção ativa no menu
- [ ] Fase 3 — ligar os botões de projeto aos repositórios reais
- [ ] Fase 4 — ajustar os redirecionamentos da seção de contato
- [ ] Fase 5 — SEO, acessibilidade e deploy automático

## Deploy

_A preencher na Fase 5, quando o GitHub Actions + GitHub Pages estiverem
configurados._

## Licença

Projeto pessoal — sinta-se livre pra usar como referência.

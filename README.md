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
│   ├── main.js            # inicia os módulos JS
│   ├── styles/             # CSS separado por seção
│   ├── scripts/            # comportamento (navbar, scrollspy, projetos)
│   └── data/                # dados de projetos e contato, separados do HTML
├── index.html
├── vite.config.js
└── package.json
```

## Status do projeto

As **Fases 1, 2 e 3** do roadmap estão implementadas: o protótipo foi modularizado
em um projeto Vite e o indicador do menu acompanha a seção visível, incluindo
acessos por âncora e o fim da página. O link ativo também recebe `aria-current`
para leitores de tela. Os projetos são renderizados a partir de um arquivo de dados,
com links para os repositórios em nova aba. Os contatos ficam para a próxima fase.

- [x] Fase 2 — corrigir o indicador de seção ativa no menu
- [x] Fase 3 — ligar os botões de projeto aos repositórios reais
- [ ] Fase 4 — ajustar os redirecionamentos da seção de contato
- [ ] Fase 5 — SEO, acessibilidade e deploy automático

## Como editar os projetos e links

Edite somente [`src/data/projects.js`](src/data/projects.js). A ordem dos objetos
nesse array define a ordem dos botões e painéis:

1. `p1` — Atendimento Inteligente: `https://github.com/santosaguiar123/atendimento-inteligente`
2. `p2` — API de Gerenciamento de Livros: `https://github.com/santosaguiar123/api-biblioteca`
3. `p3` — Portfólio Interativo: `https://github.com/santosaguiar123/portfolio`

Para trocar um link, substitua o valor de `githubUrl` entre aspas pela URL completa
do repositório, no formato `https://github.com/usuario/repositorio`. Também pode
editar `name` (título), `description` (descrição) e `techs` (lista de tecnologias).
Salve e confira com `npm run dev`; não é necessário alterar `index.html`.
Para produção, gere um novo build com `npm run build`.

Para adicionar outro projeto, copie um objeto, use um `id` único (por exemplo,
`p4`) e preencha seus dados. O botão e o painel são criados automaticamente.
Se `githubUrl` estiver vazio ou inválido, aparece “Link em breve”, sem navegação;
em desenvolvimento, o console também avisa qual projeto precisa de ajuste.
Os links válidos usam `target="_blank"`, `rel="noopener noreferrer"` e um
`aria-label` com o nome do projeto.

Links para repositórios privados continuam exigindo acesso autorizado no GitHub:
colocá-los no portfólio não torna o código público. Visitantes sem acesso podem
ver uma página 404. Nenhum token é necessário ou deve ser colocado neste site.

## Deploy

_A preencher na Fase 5, quando o GitHub Actions + GitHub Pages estiverem
configurados._

## Licença

Projeto pessoal — sinta-se livre pra usar como referência.

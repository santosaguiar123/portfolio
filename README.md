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

As **Fases 1, 2, 3 e 4** do roadmap estão implementadas: o protótipo foi modularizado
em um projeto Vite e o indicador do menu acompanha a seção visível, incluindo
acessos por âncora e o fim da página. O link ativo também recebe `aria-current`
para leitores de tela. Os projetos são renderizados a partir de um arquivo de dados,
com links para os repositórios em nova aba. Os contatos usam os dados de
`src/data/contact.js`. A preparação da Fase 5 está implementada, com publicação
e validações de navegador ainda pendentes.

- [x] Fase 2 — corrigir o indicador de seção ativa no menu
- [x] Fase 3 — ligar os botões de projeto aos repositórios reais
- [x] Fase 4 — ajustar os redirecionamentos da seção de contato
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

O workflow [deploy.yml](.github/workflows/deploy.yml) publica automaticamente
`dist/` a cada push em `main`, com jobs separados de build e deploy. Usa Node.js
LTS mais recente, `npm ci`, `npm audit --audit-level=high`, `node --test` e
`npm run build`, seguido das actions oficiais de upload e deploy do Pages.
Também pode ser iniciado manualmente na aba Actions.

Na primeira publicação, selecione **Settings → Pages → Build and deployment →
Source → GitHub Actions** no repositório. Após enviar as alterações, acompanhe
a execução em Actions. URL prevista: https://santosaguiar123.github.io/portfolio/.
O pipeline segue o [padrão oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

O Vite mantém `base: './'` para carregar os assets no subdiretório `/portfolio/`.
As URLs de compartilhamento são absolutas. Se mudar o domínio ou o nome do
repositório, atualize `index.html`, `public/robots.txt` e `public/sitemap.xml`.
O sitemap contém apenas a URL canônica: as âncoras são seções da mesma página.
Em um site de projeto, o robots.txt fica em `/portfolio/robots.txt`; os robôs
consultam o arquivo da raiz do domínio. Para controlar o domínio inteiro,
publique também o robots.txt no repositório `santosaguiar123.github.io`.

Antes de considerar a publicação final concluída:

- [ ] Substituir “Seu Nome” nos títulos e personalizar a descrição (TODO no head).
- [ ] Substituir `public/og-image.png`: a imagem atual é um placeholder de 1200 × 630.
- [ ] Confirmar o deploy público via HTTPS e a prévia ao compartilhar o link.
- [ ] Rodar Lighthouse no build servido por `npm run preview`: meta 90+ em
  Acessibilidade e Boas Práticas; revisar também Performance e SEO.
- [ ] Conferir Chrome e Firefox em 375, 768 e 1440 px, incluindo menu,
  scrollspy, troca de projetos, contatos, teclado e ausência de overflow.

## Segurança

O CSS do Font Awesome usa SRI (`integrity`) e `crossorigin="anonymous"`.
O CSS dinâmico do Google Fonts não usa SRI; para eliminar essa dependência,
uma alternativa futura é hospedar as fontes localmente. Links externos que
abrem nova aba usam `rel="noopener noreferrer"`.

Não inclua segredos no repositório nem em `public/`: tudo que vai para `dist/`
é público. `.gitignore` exclui `node_modules`, `dist`, `.env` e `.env.*`
(exceto `.env.example`, que deve conter apenas exemplos). Os arquivos rastreados
não incluem `.env` nem `node_modules`; isso não substitui auditoria do histórico.
Os dados de contato são públicos por finalidade e não exigem tokens.

O workflow bloqueia deploy se a auditoria detectar severidade alta/crítica.
Para corrigir, comece com `npm audit` e analise `npm audit fix --dry-run`;
use `npm audit fix` apenas após revisar as mudanças e refaça build e testes.
Evite `--force`, que pode trocar versões principais do Vite.

O arquivo `.github/dependabot.yml` configura atualizações semanais de npm e
GitHub Actions. Ative também **Dependabot alerts** nas configurações de
segurança do GitHub; o arquivo não ativa essa opção da conta/repositório.

GitHub Pages não permite cabeçalhos HTTP customizados. Em eventual migração
para Netlify/Vercel, configurar CSP conforme os domínios realmente usados
(Google Fonts e cdnjs), `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy`
restritiva. Confira HTTPS nas configurações do Pages, especialmente se usar
domínio próprio.

## Licença

Projeto pessoal — sinta-se livre pra usar como referência.

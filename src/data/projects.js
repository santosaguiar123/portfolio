// Fonte única de verdade para os projetos exibidos na seção "Projetos".
// Edite githubUrl para trocar o destino de "Ver projeto", sem mexer no HTML.
// Use a URL completa do repositório. Deixe vazio se o link ainda não estiver disponível.
export const projects = [
  {
    id: 'p1',
    name: 'Atendimento Inteligente',
    description: 'Plataforma em desenvolvimento para automatizar o atendimento de pequenas e médias empresas. Inclui cadastro de empresas, autenticação e persistência de conversas, com integração de IA planejada para responder perguntas a partir do contexto de cada negócio.',
    techs: ['Python', 'Django REST Framework', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
    githubUrl: 'https://github.com/santosaguiar123/atendimento-inteligente',
  },
  {
    id: 'p2',
    name: 'API de Gerenciamento de Livros',
    description: 'API REST para cadastrar, consultar, atualizar e remover livros, com filtros por título e autor. Conta com persistência em SQLite, interface web, documentação Swagger e testes automatizados.',
    techs: ['Python', 'Flask', 'SQLite', 'Swagger'],
    githubUrl: 'https://github.com/santosaguiar123/api-biblioteca',
  },
  {
    id: 'p3',
    name: 'Portfólio Interativo',
    description: 'Site pessoal para apresentar projetos, habilidades e trajetória. Desenvolvido com HTML, CSS e JavaScript modular, com navegação entre seções, menu responsivo e painéis de projetos configurados por dados.',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'Vite'],
    githubUrl: 'https://github.com/santosaguiar123/portfolio',
  },
];

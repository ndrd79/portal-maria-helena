# Portal Maria Helena

Portal completo para cidade com recursos de comércio, notícias e interação comunitária.

## Funcionalidades Principais

### Área Comercial

#### Cadastro de Empresas
- Perfil completo com informações, fotos e localização
- Geolocalização com mapa interativo
- Sistema de avaliações e comentários
- Categorização e tags para fácil busca

#### Recursos Premium
- **Mini Sites Personalizados**
  - Templates modernos e responsivos
  - Personalização de cores e fontes
  - Seções customizáveis
  - Editor visual intuitivo
  
- **Catálogo de Produtos**
  - Gerenciamento completo de produtos
  - Suporte a variações (tamanho, cor, etc)
  - Controle de estoque
  - Preços e promoções
  
- **Planos e Assinaturas**
  - Plano Básico: R$ 49,90/mês
    - Mini site básico
    - Até 50 produtos
    - Suporte por email
  - Plano Premium: R$ 99,90/mês
    - Mini site personalizado
    - Produtos ilimitados
    - Suporte prioritário
    - Relatórios avançados

### Área de Notícias
- Sistema completo de publicação
- Categorias e tags
- Galeria de mídia
- Comentários e interações

### Assistente Virtual
- Atendimento 24/7
- Recomendações personalizadas
- Auxílio na navegação
- Integração com IA avançada

### Área Administrativa
- Dashboard completo
- Gestão de empresas e conteúdo
- Relatórios e análises
- Moderação de conteúdo

### SEO e Performance
- Meta tags otimizadas
- Schema.org para rich snippets
- Sitemap dinâmico
- Otimização de imagens e conteúdo
- Core Web Vitals

## Plano de Desenvolvimento - Sistema de Permissões

### Fase 1: Preparação e Estrutura Base
- [ ] Criar tipos e interfaces base para o sistema de permissões
  - Definir Permission, Role, UserPermissions
  - Criar schemas de validação com Zod
- [ ] Configurar Vercel KV para cache de permissões
- [ ] Criar tabelas no banco de dados
  - roles (funções)
  - permissions (permissões)
  - user_roles (relacionamento usuário-função)
  - user_permissions (permissões específicas por usuário)

### Fase 2: Implementação do Core
- [ ] Implementar serviços base
  - PermissionService para gerenciar permissões
  - RoleService para gerenciar funções
  - CacheService para interface com Vercel KV
- [ ] Criar middlewares de autenticação/autorização
- [ ] Implementar hooks e contexts React
  - usePermissions
  - useRoles
  - PermissionContext

### Fase 3: Componentes e UI
- [ ] Criar componentes de proteção de rota
  - ProtectedRoute
  - PermissionGate
- [ ] Implementar UI de gerenciamento
  - Tela de gerenciamento de funções
  - Tela de gerenciamento de permissões
  - Interface de atribuição de permissões

### Fase 4: Migração e Testes
- [ ] Criar scripts de migração
  - Migrar dados do Supabase
  - Criar funções e permissões iniciais
- [ ] Implementar testes
  - Testes unitários dos serviços
  - Testes de integração
  - Testes E2E das rotas protegidas

### Fase 5: Deploy e Monitoramento
- [ ] Configurar ambiente de produção
  - Variáveis de ambiente
  - Secrets da Vercel
- [ ] Implementar logs e monitoramento
  - Integração com Vercel Analytics
  - Sistema de alertas
- [ ] Documentação final
  - Guia de uso
  - Documentação técnica
  - Exemplos de implementação

### Comandos Git por Fase

```bash
# Fase 1
git checkout -b feat/permissions-structure
# Commits após cada subfase
git push origin feat/permissions-structure

# Fase 2
git checkout -b feat/permissions-core
# Commits após cada serviço/middleware
git push origin feat/permissions-core

# Fase 3
git checkout -b feat/permissions-ui
# Commits após cada componente
git push origin feat/permissions-ui

# Fase 4
git checkout -b feat/permissions-migration
# Commits após scripts e testes
git push origin feat/permissions-migration

# Fase 5
git checkout -b feat/permissions-deploy
# Commits após configurações
git push origin feat/permissions-deploy
```

### Rollback Plan
Em caso de necessidade de rollback:
1. Manter sistema atual do Supabase em paralelo
2. Implementar feature flags para controle gradual
3. Manter backups dos dados antes da migração

## Tecnologias Utilizadas

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Styled Components

### Backend
- Supabase
- PostgreSQL
- OpenAI API

### Infraestrutura
- Vercel
- GitHub Actions
- Docker

## Requisitos de Sistema
- Node.js 18+
- PostgreSQL 15+
- NPM ou Yarn

## Instalação e Configuração

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/portal-maria-helena.git
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## Restaurando Checkpoints

Para garantir a estabilidade do desenvolvimento, mantemos checkpoints do projeto. Veja [CHECKPOINTS.md](CHECKPOINTS.md) para instruções de como restaurar o projeto para um estado anterior conhecido e estável.

## Estrutura do Projeto
```
portal-maria-helena/
├── app/                    # Rotas e páginas
├── components/             # Componentes React
├── lib/                    # Utilitários e configurações
├── public/                 # Arquivos estáticos
├── styles/                 # Estilos globais
└── types/                  # Definições de tipos
```

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Envie um pull request

## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

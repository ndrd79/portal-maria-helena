# Guia de Desenvolvimento e Deploy

## Padrões de Código

### 1. Estrutura de Componentes
```typescript
// ✅ Componente bem estruturado
const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  // Props tipadas
  const { title, url, views } = video;
  
  // Hooks agrupados no início
  const [isPlaying, setIsPlaying] = useState(false);
  const { data, error } = useQuery(['video', id]);

  // Funções auxiliares
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  // JSX limpo e organizado
  return (
    <div className="video-card">
      {/* Componentes aninhados com props explícitas */}
    </div>
  );
};

// ❌ Evitar
const BadComponent = (props) => {
  // Props não tipadas
  // Hooks espalhados
  // Funções não memoizadas
};
```

### 2. Convenções de Nomenclatura
```typescript
// Componentes: PascalCase
VideoPlayer.tsx
HeaderNavigation.tsx

// Hooks: useNomeDoHook
useVideoPlayer.ts
useAuthentication.ts

// Funções: camelCase
async function fetchVideoData() {}
const handleSubmit = () => {}

// Constantes: SNAKE_CASE
const MAX_VIDEO_DURATION = 60;
const API_BASE_URL = '/api/v1';
```

## Checklist de Deploy

### 1. Pré-Deploy
```markdown
□ Todos os console.log removidos
□ Variáveis de ambiente configuradas
□ Tipos TypeScript verificados (não há any)
□ Testes unitários passando
□ Build local testado
□ Dependências desnecessárias removidas
```

### 2. Durante Deploy
```markdown
□ Branch correta selecionada
□ Migrations do banco testadas
□ Backup do banco realizado
□ Variáveis de ambiente verificadas
□ Cache invalidado se necessário
```

### 3. Pós-Deploy
```markdown
□ Verificar logs de erro
□ Testar funcionalidades críticas
□ Verificar performance
□ Monitorar métricas
□ Backup confirmado
```

## Prevenção de Código Duplicado

### 1. Componentes Reutilizáveis
```typescript
// components/common/Button.tsx
export const Button = {
  Primary: styled.button`...`,
  Secondary: styled.button`...`,
  Text: styled.button`...`
};

// components/common/Card.tsx
export const Card = {
  Base: styled.div`...`,
  Interactive: styled.div`...`,
  Highlighted: styled.div`...`
};
```

### 2. Hooks Customizados
```typescript
// hooks/useAPI.ts
export const useAPI = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  // Lógica comum de API
  return { data, error, loading };
};

// hooks/useForm.ts
export const useForm = <T>(initialValues: T) => {
  // Lógica comum de formulários
};
```

### 3. Utilitários
```typescript
// utils/format.ts
export const formatters = {
  currency: (value: number) => ...,
  date: (value: Date) => ...,
  phone: (value: string) => ...
};

// utils/validation.ts
export const validators = {
  email: (value: string) => ...,
  password: (value: string) => ...,
  phone: (value: string) => ...
};
```

## Sistema de Logs e Monitoramento

### 1. Logs Estruturados
```typescript
const logger = {
  info: (message: string, data?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      message,
      data
    }));
  },
  error: (message: string, error?: Error) => {
    console.error(JSON.stringify({
      level: 'error',
      timestamp: new Date().toISOString(),
      message,
      stack: error?.stack
    }));
  }
};
```

### 2. Monitoramento de Performance
```typescript
const performance = {
  start: (label: string) => {
    performance.mark(`${label}-start`);
  },
  end: (label: string) => {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
  }
};
```

## Automação de Tarefas

### 1. Husky Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### 2. Scripts NPM
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "test": "jest",
    "prepare": "husky install"
  }
}
```

## Dicas de Performance

1. Lazy Loading de componentes pesados
2. Memoização de componentes que recebem props estáveis
3. Code splitting automático
4. Otimização de imagens
5. Caching adequado

## Segurança

1. Sanitização de inputs
2. Validação de dados
3. Rate limiting
4. CORS configurado
5. Headers de segurança

# Planejamento Técnico - Portal Maria Helena

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx (Homepage)
│   ├── noticias/
│   ├── comercio/
│   └── eventos/
├── components/
│   ├── Header/
│   ├── VideoFeed/
│   ├── Anuncios/
│   └── Maps/
└── styles/
```

## Banco de Dados (Supabase)

### Tabelas Principais
```sql
-- usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY,
    nome TEXT,
    email TEXT UNIQUE,
    tipo TEXT, -- admin, comerciante, usuario
    created_at TIMESTAMP WITH TIME ZONE
);

-- comercios
CREATE TABLE comercios (
    id UUID PRIMARY KEY,
    nome TEXT,
    descricao TEXT,
    endereco TEXT,
    telefone TEXT,
    categoria TEXT,
    status TEXT -- ativo, pendente, suspenso
);

-- videos
CREATE TABLE videos (
    id UUID PRIMARY KEY,
    comercio_id UUID,
    titulo TEXT,
    url TEXT,
    visualizacoes INT DEFAULT 0,
    status TEXT
);

-- assinaturas
CREATE TABLE assinaturas (
    id UUID PRIMARY KEY,
    comercio_id UUID,
    plano TEXT,
    valor DECIMAL,
    vencimento DATE,
    status TEXT
);

-- licenses
CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    expiration_date TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    last_check TIMESTAMP WITH TIME ZONE,
    license_key VARCHAR UNIQUE NOT NULL,
    allowed_features JSONB,
    max_users INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## APIs Necessárias

### Autenticação
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/logout

### Comércio
- GET /api/comercios
- POST /api/comercios
- PUT /api/comercios/:id
- DELETE /api/comercios/:id

### Vídeos
- GET /api/videos
- POST /api/videos
- PUT /api/videos/:id
- DELETE /api/videos/:id

### Assinaturas
- GET /api/assinaturas
- POST /api/assinaturas
- PUT /api/assinaturas/:id

### Licenças
- GET /api/licenses
- POST /api/licenses
- PUT /api/licenses/:id

## Integrações Necessárias

### Redes Sociais
- Instagram Graph API
- Facebook Graph API
- TikTok API

### Serviços
- Stripe (pagamentos)
- AWS S3 (storage)
- SendGrid (emails)
- Twilio (SMS)

## Sistema de Gerenciamento de Conteúdo (CMS)

### Escolha do CMS: Strapi

#### Motivos da Escolha
1. **Integração com Stack**
   - Compatibilidade total com Next.js
   - Integração fácil com Supabase
   - API REST/GraphQL nativa

2. **Recursos Principais**
   - Painel administrativo customizável
   - Sistema robusto de roles e permissões
   - Gerenciamento de mídia embutido
   - Suporte a múltiplos idiomas
   - Webhooks para automações

3. **Funcionalidades Específicas**
   - Gestão de vídeos para feed estilo TikTok/Reels
   - Sistema de categorias para comércio
   - Gerenciamento de usuários e perfis
   - Controle de permissões por área
   - Gestão de conteúdo de notícias

4. **Vantagens Técnicas**
   - Self-hosted para controle total
   - Escalável conforme crescimento
   - Backup e versionamento de conteúdo
   - API builder automático
   - Documentação automática

### Alternativas Consideradas
1. **Payload CMS**
   - Forte integração com TypeScript
   - Controle total do código

2. **Sanity.io**
   - Interface WYSIWYG
   - Updates em tempo real

3. **Solução Custom**
   - Dashboard Next.js próprio
   - Next-Auth + Supabase

### Implementação Planejada
1. **Fase 1: Setup Inicial**
   - Instalação do Strapi
   - Configuração inicial de tipos de conteúdo
   - Integração com Next.js

2. **Fase 2: Customização**
   - Personalização do painel admin
   - Configuração de roles
   - Setup de workflows de conteúdo

3. **Fase 3: Integrações**
   - Conexão com sistema de vídeos
   - Setup de notificações
   - Integração com sistema de pontos

## Cadastro de Empresas

### 1. Interface de Cadastro

#### 1.1 Formulário Principal
```typescript
// types/business.ts
interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  logo: string;
  coverImage?: string;
  images: string[];
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  contact: {
    phone: string;
    whatsapp?: string;
    email: string;
    website?: string;
    socialMedia: {
      instagram?: string;
      facebook?: string;
      youtube?: string;
    }
  };
  businessHours: {
    weekday: string;
    open: string;
    close: string;
    isOpen: boolean;
  }[];
  features: {
    delivery: boolean;
    parking: boolean;
    wifi: boolean;
    creditCard: boolean;
    debitCard: boolean;
    pix: boolean;
  };
  keywords: string[];
  status: 'pending' | 'active' | 'inactive';
  plan: 'free' | 'basic' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}
```

#### 1.2 Componente de Cadastro
```typescript
// components/business/BusinessForm.tsx
const BusinessForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Business>({});
  
  const steps = [
    {
      title: 'Informações Básicas',
      fields: ['name', 'description', 'category']
    },
    {
      title: 'Localização',
      fields: ['address']
    },
    {
      title: 'Contato',
      fields: ['contact', 'businessHours']
    },
    {
      title: 'Mídia',
      fields: ['logo', 'images']
    },
    {
      title: 'Recursos',
      fields: ['features', 'keywords']
    }
  ];

  const handleSubmit = async (data: Business) => {
    try {
      await supabase
        .from('businesses')
        .insert(data);
      
      await indexBusinessForSearch(data);
      
      toast.success('Empresa cadastrada com sucesso!');
    } catch (error) {
      toast.error('Erro ao cadastrar empresa');
    }
  };

  return (
    <FormProvider>
      <StepIndicator currentStep={step} steps={steps} />
      
      {step === 1 && <BasicInfoStep />}
      {step === 2 && <LocationStep />}
      {step === 3 && <ContactStep />}
      {step === 4 && <MediaStep />}
      {step === 5 && <FeaturesStep />}
      
      <FormNavigation 
        onNext={() => setStep(s => s + 1)}
        onBack={() => setStep(s => s - 1)}
        onSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
```

### 2. Backend e Validação

#### 2.1 Validação de Dados
```typescript
// utils/validation.ts
const businessValidation = {
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome muito curto')
    .max(100, 'Nome muito longo'),
    
  description: yup
    .string()
    .required('Descrição é obrigatória')
    .min(20, 'Descrição muito curta')
    .max(500, 'Descrição muito longa'),
    
  address: yup.object({
    street: yup.string().required('Rua é obrigatória'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    state: yup.string().required('Estado é obrigatório'),
    zipCode: yup.string().required('CEP é obrigatório')
  }),
  
  contact: yup.object({
    phone: yup.string().required('Telefone é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório')
  })
};
```

#### 2.2 API Endpoints
```typescript
// app/api/business/route.ts
export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validar dados
    await businessValidation.validate(data);
    
    // Processar imagens
    const processedImages = await processBusinessImages(data.images);
    
    // Salvar no banco
    const business = await supabase
      .from('businesses')
      .insert({
        ...data,
        images: processedImages,
        status: 'pending'
      })
      .select()
      .single();
      
    // Notificar administradores
    await notifyAdmins('new-business', business);
    
    return NextResponse.json(business);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
```

### 3. Recursos Adicionais

#### 3.1 Upload de Imagens
```typescript
// components/business/ImageUpload.tsx
const ImageUpload = () => {
  const handleUpload = async (files: File[]) => {
    const optimizedImages = await Promise.all(
      files.map(async file => {
        // Redimensionar
        const resized = await resizeImage(file, {
          width: 800,
          height: 600,
          fit: 'cover'
        });
        
        // Comprimir
        const compressed = await compressImage(resized, {
          quality: 0.8
        });
        
        // Upload
        const { data, error } = await supabase
          .storage
          .from('business-images')
          .upload(`${uuid()}.jpg`, compressed);
          
        return data?.path;
      })
    );
    
    return optimizedImages;
  };
  
  return (
    <DropZone
      accept="image/*"
      maxFiles={5}
      onDrop={handleUpload}
    />
  );
};
```

#### 3.2 Geolocalização
```typescript
// components/business/LocationPicker.tsx
const LocationPicker = () => {
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  
  const handleAddressChange = async (address: string) => {
    try {
      const coords = await geocodeAddress(address);
      setCoordinates(coords);
    } catch (error) {
      toast.error('Erro ao obter localização');
    }
  };
  
  return (
    <div>
      <AddressAutocomplete onChange={handleAddressChange} />
      <Map
        center={coordinates}
        zoom={15}
        markers={[coordinates]}
      />
    </div>
  );
};
```

### 4. Administração

#### 4.1 Dashboard de Gestão
```typescript
// app/admin/businesses/page.tsx
const BusinessManagement = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    plan: 'all'
  });
  
  const handleApprove = async (id: string) => {
    await supabase
      .from('businesses')
      .update({ status: 'active' })
      .eq('id', id);
      
    await notifyBusiness(id, 'approved');
  };
  
  const handleReject = async (id: string, reason: string) => {
    await supabase
      .from('businesses')
      .update({ 
        status: 'inactive',
        rejectionReason: reason
      })
      .eq('id', id);
      
    await notifyBusiness(id, 'rejected', reason);
  };
  
  return (
    <AdminLayout>
      <FilterBar filters={filters} onChange={setFilters} />
      <BusinessTable
        data={businesses}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <BusinessStats data={businesses} />
    </AdminLayout>
  );
};
```

#### 4.2 Análise e Relatórios
```typescript
// utils/analytics.ts
const businessAnalytics = {
  getStats: async () => {
    const stats = await supabase
      .rpc('get_business_stats')
      .select('*');
      
    return {
      total: stats.total,
      activeByCategory: stats.by_category,
      signupTrend: stats.signup_trend,
      popularFeatures: stats.popular_features,
      averageRating: stats.avg_rating
    };
  },
  
  generateReport: async (period: 'daily' | 'weekly' | 'monthly') => {
    const data = await getBusinessReportData(period);
    
    return {
      newSignups: data.new_signups,
      conversion: data.conversion_rate,
      retention: data.retention_rate,
      engagement: data.engagement_metrics
    };
  }
};
```

### 5. Integração com SEO

#### 5.1 Indexação Automática
```typescript
// utils/seo.ts
const businessSEO = {
  indexBusiness: async (business: Business) => {
    // Gerar meta tags
    const metaTags = generateBusinessMetaTags(business);
    
    // Atualizar sitemap
    await updateSitemap('businesses', business.id);
    
    // Gerar schema.org
    const schema = generateBusinessSchema(business);
    
    // Indexar para busca
    await indexForSearch({
      id: business.id,
      type: 'business',
      title: business.name,
      description: business.description,
      keywords: business.keywords,
      location: business.address,
      schema
    });
  }
};
```

#### 5.2 Páginas Otimizadas
```typescript
// app/comercio/[slug]/page.tsx
export async function generateMetadata({ params }: Props) {
  const business = await getBusiness(params.slug);
  
  return {
    title: business.name,
    description: business.description,
    openGraph: {
      title: business.name,
      description: business.description,
      images: [business.logo, ...business.images]
    },
    schema: generateBusinessSchema(business)
  };
}
```

## Arquitetura do Sistema

### 1. Frontend (Next.js 14)
```
src/
├── app/                    # App Router
│   ├── (auth)/            # Rotas autenticadas
│   ├── (public)/          # Rotas públicas
│   ├── api/               # API Routes
│   └── layout.tsx         # Layout principal
├── components/
│   ├── common/            # Componentes reutilizáveis
│   ├── features/          # Componentes específicos
│   └── layouts/           # Layouts específicos
├── hooks/                 # Custom hooks
├── lib/                   # Bibliotecas e utilitários
├── services/             # Serviços externos
└── styles/               # Estilos globais
```

### 2. Backend (Supabase)
```
database/
├── auth/                  # Autenticação
├── storage/              # Armazenamento de mídia
└── tables/
    ├── users             # Usuários
    ├── businesses        # Empresas
    ├── videos            # Vídeos
    ├── posts            # Postagens
    ├── comments         # Comentários
    ├── subscriptions    # Assinaturas
    └── licenses         # Licenças
```

### 3. Componentes Principais

#### Core Components
1. **AuthProvider**
   - Gestão de autenticação
   - Controle de sessão
   - Middleware de proteção

2. **VideoPlayer**
   - Player customizado
   - Controles personalizados
   - Analytics integrado

3. **FeedManager**
   - Scroll infinito
   - Cache de dados
   - Prefetch inteligente

4. **NotificationSystem**
   - WebSocket real-time
   - Push notifications
   - Email/SMS gateway

#### Feature Components
1. **BusinessProfile**
   - Página da empresa
   - Galeria de produtos
   - Sistema de avaliações

2. **UserDashboard**
   - Estatísticas
   - Gerenciamento de conteúdo
   - Histórico de atividades

3. **AdminPanel**
   - Gestão de usuários
   - Moderação de conteúdo
   - Analytics avançado

### 4. Integrações

#### APIs Externas
1. **Pagamento**
   - Stripe
   - PayPal
   - PIX

2. **Storage**
   - Supabase Storage
   - CDN
   - Cache Layer

3. **Analytics**
   - Google Analytics
   - Mixpanel
   - Hotjar

### 5. Segurança

#### Camadas de Proteção
1. **Autenticação**
   - JWT
   - OAuth 2.0
   - 2FA (opcional)

2. **Autorização**
   - RBAC (Role-Based Access Control)
   - Políticas de acesso
   - Row Level Security

3. **Dados**
   - Criptografia em trânsito
   - Criptografia em repouso
   - Backup automático

### 6. Performance

#### Otimizações
1. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Service Workers

2. **Backend**
   - Query caching
   - Connection pooling
   - Rate limiting

3. **CDN**
   - Edge caching
   - Geo-distribuição
   - Cache invalidation

### 7. Monitoramento

#### Sistemas
1. **Logs**
   - Error tracking
   - User actions
   - Performance metrics

2. **Alertas**
   - Uptime monitoring
   - Error thresholds
   - Resource usage

3. **Analytics**
   - User behavior
   - Business metrics
   - Performance KPIs

### 8. Escalabilidade

#### Estratégias
1. **Horizontal**
   - Load balancing
   - Microservices (futuro)
   - Database sharding

2. **Vertical**
   - Resource optimization
   - Query optimization
   - Cache strategies

3. **Infraestrutura**
   - Auto-scaling
   - Serverless functions
   - Edge computing

### 9. DevOps

#### Pipeline
1. **CI/CD**
   - GitHub Actions
   - Automated testing
   - Deployment checks

2. **Ambiente**
   - Development
   - Staging
   - Production

3. **Qualidade**
   - Linting
   - Type checking
   - Test coverage

### 10. Backup e Recuperação

#### Estratégias
1. **Backup**
   - Daily snapshots
   - Incremental backups
   - Geo-replication

2. **Recuperação**
   - Point-in-time recovery
   - Disaster recovery
   - Failover automation

## Fases de Desenvolvimento

### Fase 1: MVP (Minimum Viable Product)
1. **Core do Sistema**
   - Setup inicial Next.js
   - Configuração Supabase
   - Autenticação básica
   - Layout responsivo base

2. **Funcionalidades Básicas**
   - Cadastro de usuários
   - Feed de notícias simples
   - Página de comércios
   - Sistema de busca básico

3. **Prazo Estimado**: 4-6 semanas
   - 2 semanas para setup e estrutura
   - 2-3 semanas para funcionalidades
   - 1 semana para testes e ajustes

### Fase 2: Recursos Sociais
1. **Feed de Vídeos**
   - Upload de vídeos
   - Player customizado
   - Sistema de likes/comentários
   - Compartilhamento

2. **Interação Social**
   - Perfis de usuário
   - Sistema de seguir
   - Feed personalizado
   - Notificações básicas

3. **Prazo Estimado**: 6-8 semanas
   - 3 semanas para feed de vídeos
   - 3 semanas para interações
   - 2 semanas para testes

### Fase 3: Área Comercial
1. **Perfis Comerciais**
   - Cadastro de empresas
   - Páginas personalizadas
   - Sistema de avaliações
   - Galeria de produtos/serviços

2. **Sistema de Assinaturas**
   - Planos e preços
   - Gateway de pagamento
   - Gestão de assinaturas
   - Relatórios básicos

3. **Prazo Estimado**: 6-8 semanas
   - 3 semanas para perfis
   - 3 semanas para assinaturas
   - 2 semanas para testes

### Fase 4: Gamificação e Engajamento
1. **Sistema de Pontos**
   - Regras de pontuação
   - Ranking de usuários
   - Badges e conquistas
   - Recompensas

2. **Promoções e Eventos**
   - Cupons digitais
   - Eventos temporários
   - Desafios comunitários
   - Sistema de presentes

3. **Prazo Estimado**: 4-6 semanas
   - 2 semanas para pontuação
   - 2 semanas para promoções
   - 2 semanas para testes

### Fase 5: CMS e Administração
1. **Painel Administrativo**
   - Dashboard analytics
   - Gestão de conteúdo
   - Moderação de usuários
   - Relatórios avançados

2. **Strapi CMS**
   - Instalação e configuração
   - Customização do painel
   - Integração com Next.js
   - Workflows de conteúdo

3. **Prazo Estimado**: 6-8 semanas
   - 3 semanas para painel admin
   - 3 semanas para CMS
   - 2 semanas para testes

### Fase 6: Licenciamento e Finalização
1. **Sistema de Licença**
   - Controle de expiração
   - Notificações automáticas
   - Sistema de renovação
   - Backup e segurança

2. **Otimizações Finais**
   - Performance
   - SEO
   - Testes de carga
   - Documentação

3. **Prazo Estimado**: 4-6 semanas
   - 2 semanas para licenciamento
   - 2 semanas para otimizações
   - 2 semanas para testes finais

### Resumo do Cronograma
- **Fase 1 (MVP)**: 4-6 semanas
- **Fase 2 (Social)**: 6-8 semanas
- **Fase 3 (Comercial)**: 6-8 semanas
- **Fase 4 (Gamificação)**: 4-6 semanas
- **Fase 5 (CMS)**: 6-8 semanas
- **Fase 6 (Licença)**: 4-6 semanas

**Tempo Total Estimado**: 30-42 semanas (7-10 meses)

### Observações Importantes
1. **Entregas Incrementais**
   - Cada fase terá suas próprias entregas
   - Sistema utilizável desde a Fase 1
   - Atualizações contínuas

2. **Flexibilidade**
   - Prazos podem ser ajustados
   - Prioridades podem mudar
   - Feedback constante do cliente

3. **Qualidade**
   - Testes em cada fase
   - Code review regular
   - Documentação atualizada
   - Monitoramento de performance

## Proteção do Código

### 1. Ofuscação de Código
```typescript
// Configuração do JavaScript Obfuscator
const obfuscatorConfig = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: 2000,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  rotateStringArray: true,
  selfDefending: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: true
}
```

### 2. Estratégias de Proteção

#### 2.1 Proteção do Frontend
1. **Code Splitting Avançado**
   - Divisão de código crítico
   - Lazy loading estratégico
   - Roteamento protegido

2. **Proteção de Assets**
   - Watermark em imagens
   - Fingerprinting de arquivos
   - Proteção contra download direto

3. **Proteção contra DevTools**
   ```typescript
   // Anti-DevTools
   setInterval(() => {
     const devtools = /./;
     devtools.toString = function() {
       this.opened = true;
     }
     console.log('%c', devtools);
     if (devtools.opened) {
       // Ação de proteção
     }
   }, 1000);
   ```

#### 2.2 Proteção do Backend
1. **Criptografia de Dados Sensíveis**
   ```typescript
   import { encrypt, decrypt } from './crypto';

   // Dados criptografados em memória
   const sensitiveData = encrypt(data, process.env.SECRET_KEY);
   
   // Descriptografia apenas quando necessário
   const decryptedData = decrypt(sensitiveData, process.env.SECRET_KEY);
   ```

2. **Rate Limiting Avançado**
   ```typescript
   // Rate limiting por IP e usuário
   const rateLimiter = {
     windowMs: 15 * 60 * 1000,
     max: 100,
     message: 'Too many requests',
     keyGenerator: (req) => {
       return req.ip + req.user?.id
     }
   }
   ```

3. **Validação de Requisições**
   ```typescript
   // Middleware de validação
   const validateRequest = (schema) => async (req, res, next) => {
     try {
       await schema.validate(req.body);
       next();
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   }
   ```

### 3. Licenciamento e DRM

#### 3.1 Sistema de Licença
```typescript
// Verificação de licença
const checkLicense = async (licenseKey: string) => {
  const license = await db.licenses.findUnique({
    where: { key: licenseKey }
  });

  if (!license || !license.isValid) {
    throw new Error('Invalid license');
  }

  // Verificações adicionais
  const isExpired = new Date() > license.expirationDate;
  const isOverLimit = await checkUserLimit(license);
  const isValidDomain = await checkDomain(license);

  return { isValid: !isExpired && !isOverLimit && isValidDomain };
}
```

#### 3.2 Proteção por Hardware
```typescript
// Identificação de hardware
const getHardwareId = () => {
  const os = require('os');
  const crypto = require('crypto');

  const hardware = {
    cpu: os.cpus()[0].model,
    hostname: os.hostname(),
    network: Object.values(os.networkInterfaces())
      .flat()
      .filter(ni => ni?.mac && ni.mac !== '00:00:00:00:00:00')
      .map(ni => ni?.mac)
      .join(',')
  };

  return crypto
    .createHash('sha256')
    .update(JSON.stringify(hardware))
    .digest('hex');
}
```

### 4. Monitoramento e Detecção

#### 4.1 Sistema de Alertas
```typescript
// Monitor de atividades suspeitas
const monitorActivity = {
  checkForCloning: async () => {
    const instances = await getActiveInstances();
    if (instances.length > 1) {
      await notifyAdmin('Multiple instances detected');
      await deactivateInstance();
    }
  },

  checkForTampering: async () => {
    const hash = await getCodeHash();
    if (hash !== originalHash) {
      await notifyAdmin('Code tampering detected');
      await lockSystem();
    }
  }
}
```

#### 4.2 Logs de Segurança
```typescript
// Sistema de logs seguros
const securityLog = {
  log: async (event: SecurityEvent) => {
    await db.securityLogs.create({
      data: {
        event: encrypt(event.type),
        details: encrypt(event.details),
        timestamp: new Date(),
        hash: generateEventHash(event)
      }
    });
  }
}
```

### 5. Medidas Adicionais

1. **Compilação Protegida**
   - Uso de TypeScript com configurações estritas
   - Minificação avançada
   - Remoção de source maps em produção

2. **Proteção de Dependências**
   - Auditoria automática de pacotes
   - Lockfile com hashes
   - Versões fixas de dependências

3. **Proteção de Ambiente**
   - Variáveis de ambiente criptografadas
   - Rotação automática de chaves
   - Validação de ambiente de execução

4. **Proteção Legal**
   - Termos de uso restritivos
   - Licença comercial
   - Registro de propriedade intelectual

## Deploy e CI/CD

### 1. Configuração GitHub
```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint
      - name: Type check
        run: npm run type-check

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### 2. Configuração Vercel
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_key",
    "OPENAI_API_KEY": "@openai_key"
  },
  "regions": ["gru1"],
  "github": {
    "enabled": true,
    "silent": true
  }
}
```

### 3. Ambientes de Deploy

#### 3.1 Development
```typescript
// Ambiente de desenvolvimento
const devConfig = {
  url: 'dev.portalmariahelena.com.br',
  branch: 'develop',
  autoDeployment: true,
  protection: {
    password: true,
    allowedIPs: ['escritório', 'desenvolvedores']
  }
}
```

#### 3.2 Staging
```typescript
// Ambiente de homologação
const stagingConfig = {
  url: 'staging.portalmariahelena.com.br',
  branch: 'staging',
  autoDeployment: false,
  protection: {
    password: true,
    allowedIPs: ['escritório', 'cliente']
  }
}
```

#### 3.3 Production
```typescript
// Ambiente de produção
const productionConfig = {
  url: 'portalmariahelena.com.br',
  branch: 'main',
  autoDeployment: false,
  protection: {
    ddosProtection: true,
    rateLimit: true,
    ssl: true
  }
}
```

### 4. Monitoramento e Analytics

#### 4.1 Vercel Analytics
```typescript
// Configuração de analytics
const analyticsConfig = {
  webVitals: true,
  customEvents: true,
  errorTracking: true,
  performanceMonitoring: {
    fps: true,
    memory: true,
    network: true
  }
}
```

#### 4.2 Status Monitoring
```typescript
// Monitoramento de status
const statusChecks = {
  endpoints: [
    '/api/health',
    '/api/videos',
    '/api/commerce'
  ],
  interval: '1m',
  alertThreshold: {
    responseTime: '500ms',
    errorRate: '1%',
    downtime: '1m'
  }
}
```

### 5. Backup e Recuperação

#### 5.1 GitHub Backup
```typescript
// Backup do código
const codeBackup = {
  repository: 'github.com/mh-portal',
  schedule: 'daily',
  retention: '90d',
  mirrors: ['GitLab', 'Bitbucket']
}
```

#### 5.2 Database Backup
```typescript
// Backup do banco de dados
const databaseBackup = {
  provider: 'Supabase',
  schedule: {
    full: '1d',
    incremental: '1h'
  },
  retention: {
    daily: '7d',
    weekly: '4w',
    monthly: '12m'
  },
  encryption: true
}
```

### 6. Proteção e Segurança

#### 6.1 Headers de Segurança
```typescript
// Headers de segurança
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'"
}
```

#### 6.2 Rate Limiting
```typescript
// Configuração de rate limit
const rateLimiting = {
  public: {
    window: '1m',
    max: 60
  },
  api: {
    window: '1m',
    max: 30,
    keyGenerator: 'ip'
  }
}
```

### 7. Otimizações

#### 7.1 Edge Functions
```typescript
// Funções na edge
const edgeFunctions = {
  enabled: true,
  routes: [
    '/api/feed',
    '/api/search',
    '/api/recommendations'
  ],
  caching: {
    ttl: '1h',
    strategy: 'stale-while-revalidate'
  }
}
```

#### 7.2 Image Optimization
```typescript
// Otimização de imagens
const imageOptimization = {
  quality: 80,
  formats: ['webp', 'avif'],
  sizes: [640, 750, 828, 1080, 1200],
  domains: ['assets.portalmariahelena.com.br'],
  minimumCacheTTL: 60
}
```

## Requisitos Técnicos

### Performance
- Tempo de carregamento < 3s
- First Paint < 1.5s
- Time to Interactive < 4s

### SEO
- Meta tags dinâmicas
- Sitemap automático
- Schema.org markup
- Open Graph tags

### Segurança
- HTTPS
- Rate limiting
- CORS configurado
- Sanitização de inputs

## Monitoramento
- Google Analytics
- Error tracking
- Performance monitoring
- User behavior analytics

## Backups
- Banco de dados: diário
- Media files: semanal
- Configurações: por mudança

## Ambiente de Desenvolvimento
- Node.js 18+
- TypeScript
- ESLint + Prettier
- Husky (git hooks)

## Ambiente de Produção
- Vercel
- Supabase
- CDN configurado
- SSL/TLS

## Otimização para SEO

### 1. Metadata e Tags

#### 1.1 Next.js Metadata
```typescript
// app/layout.tsx
export const metadata = {
  metadataBase: new URL('https://portalmariahelena.com.br'),
  title: {
    default: 'Portal Maria Helena - Seu guia local',
    template: '%s | Portal Maria Helena'
  },
  description: 'O melhor portal de notícias, comércio e eventos da região',
  keywords: ['portal', 'notícias', 'comércio local', 'eventos'],
  authors: [{ name: 'Maria Helena' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://portalmariahelena.com.br',
    siteName: 'Portal Maria Helena',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630
    }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}
```

#### 1.2 Componentes SEO
```typescript
// components/SEO/ArticleSchema.tsx
const ArticleSchema = ({ article }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'Portal Maria Helena'
    },
    datePublished: article.publishDate,
    dateModified: article.updateDate,
    image: article.image,
    publisher: {
      '@type': 'Organization',
      name: 'Portal Maria Helena',
      logo: {
        '@type': 'ImageObject',
        url: 'https://portalmariahelena.com.br/logo.png'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
```

### 2. Performance SEO

#### 2.1 Otimização de Imagens
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['assets.portalmariahelena.com.br'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}

// Componente de imagem otimizado
const OptimizedImage = ({ src, alt, ...props }) => (
  <Image
    src={src}
    alt={alt}
    placeholder="blur"
    blurDataURL={getBlurHash(src)}
    loading="lazy"
    {...props}
  />
);
```

#### 2.2 Otimização de Fonte
```typescript
// Font optimization
const fontOptimization = {
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
}
```

### 3. URL e Sitemap

#### 3.1 Geração de Sitemap
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const baseUrl = 'https://portalmariahelena.com.br';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/sobre',
    '/contato',
    '/comercio',
    '/noticias'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0
  }));

  // Páginas dinâmicas
  const articles = await getArticles();
  const businesses = await getBusinesses();
  
  const dynamicPages = [
    ...articles.map(article => ({
      url: `${baseUrl}/noticias/${article.slug}`,
      lastModified: article.updateDate,
      changeFrequency: 'weekly',
      priority: 0.8
    })),
    ...businesses.map(business => ({
      url: `${baseUrl}/comercio/${business.slug}`,
      lastModified: business.updateDate,
      changeFrequency: 'weekly',
      priority: 0.8
    }))
  ];

  return [...staticPages, ...dynamicPages];
}
```

#### 3.2 URL Amigáveis
```typescript
// utils/slug.ts
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
```

### 4. Conteúdo Otimizado

#### 4.1 Estrutura HTML Semântica
```typescript
const ArticlePage = () => (
  <article>
    <header>
      <h1>Título do Artigo</h1>
      <time dateTime="2024-01-01">1 de Janeiro de 2024</time>
    </header>
    
    <main>
      <section>
        <h2>Subtítulo</h2>
        <p>Conteúdo...</p>
      </section>
    </main>
    
    <footer>
      <nav aria-label="Navegação entre artigos">
        <a rel="prev" href="/anterior">Artigo anterior</a>
        <a rel="next" href="/proximo">Próximo artigo</a>
      </nav>
    </footer>
  </article>
);
```

#### 4.2 Rich Snippets
```typescript
const LocalBusinessSchema = ({ business }) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  image: business.images,
  '@id': `https://portalmariahelena.com.br/comercio/${business.slug}`,
  url: `https://portalmariahelena.com.br/comercio/${business.slug}`,
  telephone: business.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.zip,
    addressCountry: 'BR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.coordinates.lat,
    longitude: business.coordinates.lng
  },
  openingHoursSpecification: business.hours.map(hour => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: hour.day,
    opens: hour.open,
    closes: hour.close
  }))
});
```

### 5. Monitoramento SEO

#### 5.1 Analytics e Métricas
```typescript
const seoMetrics = {
  core: {
    LCP: 'Largest Contentful Paint',
    FID: 'First Input Delay',
    CLS: 'Cumulative Layout Shift',
    TTFB: 'Time to First Byte'
  },
  social: {
    shares: 'Social Media Shares',
    engagement: 'Social Engagement',
    reach: 'Social Reach'
  },
  search: {
    position: 'Search Position',
    clicks: 'Search Clicks',
    impressions: 'Search Impressions',
    ctr: 'Click Through Rate'
  }
}
```

#### 5.2 Monitoramento de Links
```typescript
const linkChecker = {
  checkInternalLinks: async () => {
    const pages = await getAllPages();
    const brokenLinks = [];
    
    for (const page of pages) {
      const links = await getPageLinks(page);
      for (const link of links) {
        const status = await checkLinkStatus(link);
        if (status !== 200) {
          brokenLinks.push({ page, link, status });
        }
      }
    }
    
    return brokenLinks;
  },
  
  checkExternalLinks: async () => {
    // Similar ao checkInternalLinks mas para links externos
  }
}
```

### 6. UI/UX e Controle de Qualidade

#### 6.1 Design System

#### 6.2 Garantia de Qualidade

#### 6.3 Prevenção de Erros

#### 6.4 Responsividade

#### 6.5 Acessibilidade

### 7. Sistema de IA Assistente

#### 7.1 Funcionalidades do Assistente Virtual

#### 7.2 Integração com APIs de IA

#### 7.3 Recursos Avançados

#### 7.4 Limites para Não-Membros

#### 7.5 Cache e Otimização

#### 7.6 Monitoramento

#### 7.7 Recursos Premium (Membros)

## Recursos Premium para Empresas

### 1. Mini Site Personalizado
```typescript
// types/business-site.ts
interface BusinessSite {
  businessId: string;
  template: 'modern' | 'classic' | 'minimal';
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  sections: {
    id: string;
    type: 'hero' | 'about' | 'gallery' | 'contact' | 'testimonials' | 'custom';
    content: {
      title?: string;
      subtitle?: string;
      text?: string;
      images?: string[];
      buttons?: {
        label: string;
        url: string;
        style: 'primary' | 'secondary';
      }[];
      customHtml?: string;
    };
    order: number;
    isActive: boolean;
  }[];
}

// components/admin/SiteBuilder.tsx
const SiteBuilder = () => {
  const [site, setSite] = useState<BusinessSite>();
  const [activeSection, setActiveSection] = useState(null);
  
  const templates = {
    modern: {
      name: 'Moderno',
      preview: '/templates/modern.jpg',
      features: ['Layout responsivo', 'Animações suaves', 'Design minimalista']
    },
    classic: {
      name: 'Clássico',
      preview: '/templates/classic.jpg',
      features: ['Layout tradicional', 'Cores sóbrias', 'Fácil navegação']
    },
    minimal: {
      name: 'Minimalista',
      preview: '/templates/minimal.jpg',
      features: ['Design clean', 'Foco no conteúdo', 'Carregamento rápido']
    }
  };

  const handleSave = async () => {
    await supabase
      .from('business_sites')
      .upsert({
        business_id: site.businessId,
        template: site.template,
        theme: site.theme,
        sections: site.sections
      });
      
    await deployBusinessSite(site);
  };

  return (
    <div className="site-builder">
      <Sidebar>
        <TemplateSelector 
          templates={templates}
          selected={site?.template}
          onSelect={template => setSite(s => ({...s, template}))}
        />
        <ThemeCustomizer
          theme={site?.theme}
          onChange={theme => setSite(s => ({...s, theme}))}
        />
        <SectionList
          sections={site?.sections}
          activeSection={activeSection}
          onSectionClick={setActiveSection}
          onReorder={handleReorder}
        />
      </Sidebar>
      
      <Preview site={site}>
        {activeSection && (
          <SectionEditor
            section={activeSection}
            onSave={section => handleSectionUpdate(section)}
          />
        )}
      </Preview>
      
      <ActionBar>
        <Button onClick={() => previewSite(site)}>Visualizar</Button>
        <Button onClick={handleSave}>Publicar</Button>
      </ActionBar>
    </div>
  );
};
```

### 2. Catálogo de Produtos
```typescript
// types/product-catalog.ts
interface Product {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  categories: string[];
  tags: string[];
  images: string[];
  variations?: {
    name: string;
    options: {
      name: string;
      price?: number;
      stock?: number;
    }[];
  }[];
  specifications?: {
    name: string;
    value: string;
  }[];
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
}

// components/admin/ProductManager.tsx
const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priceRange: [0, 1000]
  });
  
  const handleBulkAction = async (action: string, selectedIds: string[]) => {
    switch (action) {
      case 'activate':
        await updateProductStatus(selectedIds, 'active');
        break;
      case 'deactivate':
        await updateProductStatus(selectedIds, 'inactive');
        break;
      case 'delete':
        await deleteProducts(selectedIds);
        break;
    }
    
    refreshProducts();
  };

  return (
    <div className="product-manager">
      <Toolbar>
        <ViewToggle value={view} onChange={setView} />
        <FilterBar filters={filters} onChange={setFilters} />
        <Button onClick={() => openProductModal()}>Novo Produto</Button>
      </Toolbar>
      
      {view === 'grid' ? (
        <ProductGrid
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <ProductTable
          products={products}
          onBulkAction={handleBulkAction}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      
      <ProductModal
        isOpen={!!editingProduct}
        product={editingProduct}
        onSave={handleSave}
        onClose={() => setEditingProduct(null)}
      />
    </div>
  );
};

// components/admin/ProductForm.tsx
const ProductForm = ({ product, onSave }) => {
  const [images, setImages] = useState(product?.images || []);
  const [variations, setVariations] = useState(product?.variations || []);
  
  const handleImageUpload = async (files: File[]) => {
    const uploadedImages = await Promise.all(
      files.map(async file => {
        const optimized = await optimizeProductImage(file);
        const { data } = await supabase.storage
          .from('product-images')
          .upload(`${uuid()}.jpg`, optimized);
          
        return data.path;
      })
    );
    
    setImages([...images, ...uploadedImages]);
  };
  
  const handleVariationAdd = () => {
    setVariations([
      ...variations,
      { name: '', options: [{ name: '', price: 0, stock: 0 }] }
    ]);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <ImageUpload
        images={images}
        onUpload={handleImageUpload}
        onRemove={handleImageRemove}
      />
      
      <TextField name="name" label="Nome do Produto" required />
      <TextArea name="description" label="Descrição" />
      <PriceField name="price" label="Preço" />
      <PriceField name="salePrice" label="Preço Promocional" />
      
      <CategorySelector
        selected={product?.categories}
        onChange={handleCategoryChange}
      />
      
      <VariationBuilder
        variations={variations}
        onAdd={handleVariationAdd}
        onChange={setVariations}
      />
      
      <SpecificationBuilder
        specs={product?.specifications}
        onChange={handleSpecChange}
      />
      
      <StockManager
        stock={product?.stock}
        variations={variations}
        onChange={handleStockChange}
      />
      
      <Button type="submit">Salvar Produto</Button>
    </Form>
  );
};
```

### 3. Integração com Pagamentos
```typescript
// utils/payment.ts
const paymentPlans = {
  basic: {
    name: 'Básico',
    price: 49.90,
    features: [
      'Mini site básico',
      'Até 50 produtos no catálogo',
      'Suporte por email'
    ]
  },
  premium: {
    name: 'Premium',
    price: 99.90,
    features: [
      'Mini site personalizado',
      'Produtos ilimitados',
      'Suporte prioritário',
      'Relatórios avançados'
    ]
  }
};

const subscriptionManager = {
  createSubscription: async (businessId: string, plan: string) => {
    // Criar assinatura no gateway de pagamento
    const subscription = await paymentGateway.createSubscription({
      businessId,
      plan,
      amount: paymentPlans[plan].price
    });
    
    // Atualizar status no banco
    await supabase
      .from('businesses')
      .update({
        plan,
        subscription_id: subscription.id,
        subscription_status: 'active'
      })
      .eq('id', businessId);
      
    // Ativar recursos premium
    await activatePremiumFeatures(businessId, plan);
  },
  
  cancelSubscription: async (businessId: string) => {
    const { data: business } = await supabase
      .from('businesses')
      .select('subscription_id')
      .eq('id', businessId)
      .single();
      
    await paymentGateway.cancelSubscription(business.subscription_id);
    
    await supabase
      .from('businesses')
      .update({
        plan: 'free',
        subscription_status: 'cancelled'
      })
      .eq('id', businessId);
      
    await deactivatePremiumFeatures(businessId);
  }
};
```

{{ ... }}

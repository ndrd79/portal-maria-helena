-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Remover objetos existentes se necessário (em ordem reversa de dependência)
DROP TRIGGER IF EXISTS update_comentarios_updated_at ON comentarios;
DROP TRIGGER IF EXISTS update_noticias_updated_at ON noticias;
DROP TRIGGER IF EXISTS update_produtos_updated_at ON produtos;
DROP TRIGGER IF EXISTS update_comercios_updated_at ON comercios;
DROP TRIGGER IF EXISTS update_usuarios_updated_at ON usuarios;

DROP FUNCTION IF EXISTS update_updated_at_column();

DROP TABLE IF EXISTS item_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS avaliacoes;
DROP TABLE IF EXISTS comentarios;
DROP TABLE IF EXISTS produto_variacoes;
DROP TABLE IF EXISTS produto_imagens;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS comercio_imagens;
DROP TABLE IF EXISTS noticias;
DROP TABLE IF EXISTS comercios;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;

-- Recria os tipos se não existirem
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'comerciante', 'usuario');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_type AS ENUM ('ativo', 'pendente', 'suspenso', 'inativo');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tabela de categorias
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    descricao TEXT,
    tipo TEXT NOT NULL CHECK (tipo IN ('comercio', 'produto', 'noticia')),
    ordem INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de usuários
CREATE TABLE usuarios (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    tipo user_role NOT NULL DEFAULT 'usuario',
    telefone TEXT,
    avatar_url TEXT,
    status status_type DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de comercios
CREATE TABLE comercios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id),
    categoria_id UUID REFERENCES categorias(id),
    nome TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    descricao TEXT,
    meta_title TEXT,
    meta_description TEXT,
    endereco TEXT,
    telefone TEXT,
    whatsapp TEXT,
    email TEXT,
    website TEXT,
    subcategoria TEXT,
    logo_url TEXT,
    capa_url TEXT,
    horario_funcionamento JSONB,
    coordenadas POINT,
    status status_type DEFAULT 'pendente',
    plano TEXT DEFAULT 'basic',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de imagens do comércio
CREATE TABLE comercio_imagens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    comercio_id UUID REFERENCES comercios(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    descricao TEXT,
    ordem INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de produtos
CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    comercio_id UUID REFERENCES comercios(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES categorias(id),
    nome TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    descricao TEXT,
    meta_title TEXT,
    meta_description TEXT,
    preco DECIMAL(10,2),
    preco_promocional DECIMAL(10,2),
    estoque INTEGER DEFAULT 0,
    status status_type DEFAULT 'ativo',
    destaque BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de imagens do produto
CREATE TABLE produto_imagens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    ordem INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de variações de produto
CREATE TABLE produto_variacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    valor TEXT NOT NULL,
    preco_adicional DECIMAL(10,2) DEFAULT 0,
    estoque INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de notícias
CREATE TABLE noticias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id),
    categoria_id UUID REFERENCES categorias(id),
    titulo TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    subtitulo TEXT,
    conteudo TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    imagem_capa TEXT,
    tags TEXT[],
    status status_type DEFAULT 'pendente',
    destaque BOOLEAN DEFAULT false,
    visualizacoes INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de tags
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de relacionamento de tags
CREATE TABLE item_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    comercio_id UUID REFERENCES comercios(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    noticia_id UUID REFERENCES noticias(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    CHECK (
        (comercio_id IS NOT NULL AND produto_id IS NULL AND noticia_id IS NULL) OR
        (comercio_id IS NULL AND produto_id IS NOT NULL AND noticia_id IS NULL) OR
        (comercio_id IS NULL AND produto_id IS NULL AND noticia_id IS NOT NULL)
    )
);

-- Tabela de comentários
CREATE TABLE comentarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id),
    noticia_id UUID REFERENCES noticias(id) ON DELETE CASCADE,
    comercio_id UUID REFERENCES comercios(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    status status_type DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    CHECK (
        (noticia_id IS NOT NULL AND comercio_id IS NULL) OR
        (noticia_id IS NULL AND comercio_id IS NOT NULL)
    )
);

-- Tabela de avaliações
CREATE TABLE avaliacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id),
    comercio_id UUID REFERENCES comercios(id) ON DELETE CASCADE,
    nota INTEGER CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    status status_type DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Função para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_comercios_updated_at
    BEFORE UPDATE ON comercios
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_produtos_updated_at
    BEFORE UPDATE ON produtos
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_noticias_updated_at
    BEFORE UPDATE ON noticias
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_comentarios_updated_at
    BEFORE UPDATE ON comentarios
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Índices para melhor performance
CREATE INDEX idx_categorias_tipo ON categorias(tipo);
CREATE INDEX idx_comercios_usuario ON comercios(usuario_id);
CREATE INDEX idx_comercios_categoria ON comercios(categoria_id);
CREATE INDEX idx_comercios_slug ON comercios(slug);
CREATE INDEX idx_produtos_comercio ON produtos(comercio_id);
CREATE INDEX idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX idx_produtos_slug ON produtos(slug);
CREATE INDEX idx_noticias_usuario ON noticias(usuario_id);
CREATE INDEX idx_noticias_categoria ON noticias(categoria_id);
CREATE INDEX idx_noticias_slug ON noticias(slug);
CREATE INDEX idx_comentarios_usuario ON comentarios(usuario_id);
CREATE INDEX idx_avaliacoes_comercio ON avaliacoes(comercio_id);
CREATE INDEX idx_item_tags_tag ON item_tags(tag_id);

-- Índices de busca textual
CREATE INDEX idx_comercios_busca ON comercios USING gin(to_tsvector('portuguese', nome || ' ' || COALESCE(descricao, '')));
CREATE INDEX idx_produtos_busca ON produtos USING gin(to_tsvector('portuguese', nome || ' ' || COALESCE(descricao, '')));
CREATE INDEX idx_noticias_busca ON noticias USING gin(to_tsvector('portuguese', titulo || ' ' || COALESCE(subtitulo, '') || ' ' || COALESCE(conteudo, '')));

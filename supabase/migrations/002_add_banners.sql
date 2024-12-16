-- Criar tipos de banner e posição
DO $$ BEGIN
    CREATE TYPE banner_tipo AS ENUM ('quadrado', 'retangular-horizontal', 'retangular-vertical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE banner_posicao AS ENUM ('topo', 'meio', 'rodape');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tabela de banners
CREATE TABLE banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    imagem TEXT NOT NULL,
    link TEXT,
    tipo banner_tipo NOT NULL,
    posicao banner_posicao NOT NULL,
    largura INTEGER NOT NULL,
    altura INTEGER NOT NULL,
    ordem INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_banners_updated_at
    BEFORE UPDATE ON banners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Criar tipos de banner e posição
CREATE TYPE banner_tipo AS ENUM ('quadrado', 'retangular-horizontal', 'retangular-vertical');
CREATE TYPE banner_posicao AS ENUM ('topo', 'meio', 'rodape');

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
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_banners_updated_at
    BEFORE UPDATE ON banners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Políticas de segurança para banners
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública de banners ativos
CREATE POLICY "Permitir leitura pública de banners ativos" ON banners
    FOR SELECT
    USING (status = true);

-- Permitir todas as operações para administradores
CREATE POLICY "Permitir todas as operações para administradores" ON banners
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            WHERE u.id = auth.uid()
            AND u.tipo = 'admin'
        )
    );

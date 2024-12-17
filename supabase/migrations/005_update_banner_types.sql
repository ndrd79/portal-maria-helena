-- Remover tipos antigos
DROP TYPE IF EXISTS banner_tipo CASCADE;
DROP TYPE IF EXISTS banner_posicao CASCADE;

-- Criar novo tipo de banner
CREATE TYPE banner_tipo AS ENUM (
  'slide',
  'topo-central',
  'lateral-esquerda',
  'lateral-direita',
  'meio-pagina',
  'rodape',
  'submenu'
);

-- Recriar tabela de banners com novo schema
CREATE TABLE IF NOT EXISTS banners_new (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    imagem TEXT NOT NULL,
    link TEXT,
    tipo banner_tipo NOT NULL,
    largura INTEGER NOT NULL,
    altura INTEGER NOT NULL,
    ordem INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migrar dados existentes (se houver)
INSERT INTO banners_new (
    id, titulo, imagem, link, tipo, largura, altura, ordem, status, created_at, updated_at
)
SELECT 
    id, titulo, imagem, link,
    CASE 
        WHEN tipo = 'quadrado' THEN 'slide'::banner_tipo
        WHEN tipo = 'retangular-horizontal' THEN 'topo-central'::banner_tipo
        WHEN tipo = 'retangular-vertical' THEN 'lateral-direita'::banner_tipo
    END,
    largura, altura, ordem, status, created_at, updated_at
FROM banners;

-- Remover tabela antiga e renomear a nova
DROP TABLE IF EXISTS banners;
ALTER TABLE banners_new RENAME TO banners;

-- Recriar trigger para updated_at
DROP TRIGGER IF EXISTS update_banners_updated_at ON banners;
CREATE TRIGGER update_banners_updated_at
    BEFORE UPDATE ON banners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Recriar políticas de segurança
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de banners ativos" ON banners
    FOR SELECT
    USING (status = true);

CREATE POLICY "Permitir todas as operações para administradores" ON banners
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM auth.users u
            JOIN usuarios ON usuarios.id = u.id
            WHERE u.id = auth.uid()
            AND usuarios.tipo = 'admin'
        )
    );

-- Atualiza os banners existentes
UPDATE banners
SET tipo = CASE
  WHEN tipo = 'quadrado' THEN 'slide'
  WHEN tipo = 'retangular-horizontal' THEN 'topo-central'
  WHEN tipo = 'retangular-vertical' THEN 'lateral-esquerda'
  ELSE tipo
END;

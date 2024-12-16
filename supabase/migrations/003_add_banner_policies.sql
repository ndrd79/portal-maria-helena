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

-- Criar bucket para imagens se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Permitir acesso público para leitura
CREATE POLICY "Permitir acesso público para leitura 1jof2gw_0" ON storage.objects FOR SELECT TO public USING (bucket_id = 'images');

-- Permitir upload apenas para usuários autenticados
CREATE POLICY "Permitir upload para usuários autenticados 1jof2gw_0" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

-- Permitir atualização apenas para o proprietário
CREATE POLICY "Permitir atualização para o proprietário 1jof2gw_0" ON storage.objects FOR UPDATE TO authenticated USING (auth.uid() = owner) WITH CHECK (bucket_id = 'images');

-- Permitir exclusão apenas para o proprietário
CREATE POLICY "Permitir exclusão para o proprietário 1jof2gw_0" ON storage.objects FOR DELETE TO authenticated USING (auth.uid() = owner AND bucket_id = 'images');

-- Criar tabela de empresas
create table public.empresas (
  id uuid default uuid_generate_v4() primary key,
  nome text not null,
  descricao text not null,
  categoria text not null,
  endereco text not null,
  cidade text not null,
  estado text not null,
  cep text not null,
  telefone text not null,
  email text not null,
  website text,
  horario_funcionamento text not null,
  logo_url text,
  fotos text[],
  status text not null default 'pendente',
  usuario_id uuid not null references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar policy para inserção
create policy "Usuários autenticados podem criar empresas"
  on empresas for insert
  with check (auth.uid() = usuario_id);

-- Criar policy para visualização
create policy "Qualquer um pode ver empresas aprovadas"
  on empresas for select
  using (status = 'aprovada');

-- Criar policy para usuários verem suas próprias empresas
create policy "Usuários podem ver suas próprias empresas"
  on empresas for select
  using (auth.uid() = usuario_id);

-- Criar policy para usuários editarem suas próprias empresas
create policy "Usuários podem editar suas próprias empresas"
  on empresas for update
  using (auth.uid() = usuario_id);

-- Criar policy para usuários excluírem suas próprias empresas
create policy "Usuários podem excluir suas próprias empresas"
  on empresas for delete
  using (auth.uid() = usuario_id);

-- Habilitar RLS
alter table empresas enable row level security;

-- Criar bucket para armazenamento de imagens
insert into storage.buckets (id, name, public) values ('empresas', 'empresas', true);

-- Criar policy para upload de imagens
create policy "Usuários autenticados podem fazer upload"
  on storage.objects for insert
  with check (bucket_id = 'empresas' and auth.role() = 'authenticated');

-- Criar policy para visualização de imagens
create policy "Qualquer um pode ver imagens"
  on storage.objects for select
  using (bucket_id = 'empresas');

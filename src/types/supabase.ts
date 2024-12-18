export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'admin' | 'comerciante' | 'usuario'
export type StatusType = 'ativo' | 'pendente' | 'suspenso' | 'inativo'
export type AnuncioTipo = 'banner' | 'carrossel' | 'card' | 'popup' | 'nativo'
export type AnuncioStatus = 'ativo' | 'inativo' | 'agendado'

export interface Usuario {
  id: string
  email: string
  nome: string
  tipo: UserRole
  telefone?: string
  avatar_url?: string
  status: StatusType
  created_at: string
  updated_at: string
}

export interface Anuncio {
  id: string
  usuario_id: string
  titulo: string
  descricao?: string
  tipo: AnuncioTipo
  imagem_url: string
  link_url?: string
  data_inicio: string
  data_fim: string
  status: AnuncioStatus
  posicao: string
  prioridade: number
  visualizacoes: number
  cliques: number
  created_at: string
  updated_at: string
}

export interface Categoria {
  id: string
  nome: string
  descricao?: string
  tipo: 'comercio' | 'produto' | 'noticia'
  ordem?: number
  created_at: string
}

export interface Comercio {
  id: string
  usuario_id: string
  categoria_id: string
  nome: string
  slug: string
  descricao?: string
  meta_title?: string
  meta_description?: string
  endereco?: string
  telefone?: string
  whatsapp?: string
  email?: string
  website?: string
  subcategoria?: string
  logo_url?: string
  capa_url?: string
  horario_funcionamento?: Record<string, any>
  coordenadas?: [number, number]
  status: StatusType
  plano: string
  created_at: string
  updated_at: string
}

export interface ComercioImagem {
  id: string
  comercio_id: string
  url: string
  descricao?: string
  ordem?: number
  created_at: string
}

export interface Produto {
  id: string
  comercio_id: string
  categoria_id: string
  nome: string
  slug: string
  descricao?: string
  meta_title?: string
  meta_description?: string
  preco?: number
  preco_promocional?: number
  estoque: number
  status: StatusType
  destaque: boolean
  created_at: string
  updated_at: string
}

export interface ProdutoImagem {
  id: string
  produto_id: string
  url: string
  ordem?: number
  created_at: string
}

export interface ProdutoVariacao {
  id: string
  produto_id: string
  nome: string
  valor: string
  preco_adicional: number
  estoque: number
  created_at: string
}

export interface Noticia {
  id: string
  usuario_id: string
  categoria_id: string
  titulo: string
  slug: string
  subtitulo?: string
  conteudo: string
  meta_title?: string
  meta_description?: string
  imagem_capa?: string
  tags?: string[]
  status: StatusType
  destaque: boolean
  visualizacoes: number
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  nome: string
  created_at: string
}

export interface ItemTag {
  id: string
  tag_id: string
  comercio_id?: string
  produto_id?: string
  noticia_id?: string
  created_at: string
}

export interface Comentario {
  id: string
  usuario_id: string
  noticia_id?: string
  comercio_id?: string
  conteudo: string
  status: StatusType
  created_at: string
  updated_at: string
}

export interface Avaliacao {
  id: string
  usuario_id: string
  comercio_id: string
  nota: number
  comentario?: string
  status: StatusType
  created_at: string
}

// Tipos de resposta da API
export type ApiResponse<T> = {
  data: T
  error: null
} | {
  data: null
  error: {
    message: string
    details?: string
    code?: string
  }
}

export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: Usuario
        Insert: Partial<Usuario>
        Update: Partial<Usuario>
      }
      anuncios: {
        Row: Anuncio
        Insert: Partial<Anuncio>
        Update: Partial<Anuncio>
      }
      categorias: {
        Row: Categoria
        Insert: Partial<Categoria>
        Update: Partial<Categoria>
      }
      comercios: {
        Row: Comercio
        Insert: Partial<Comercio>
        Update: Partial<Comercio>
      }
      comercio_imagens: {
        Row: ComercioImagem
        Insert: Partial<ComercioImagem>
        Update: Partial<ComercioImagem>
      }
      produtos: {
        Row: Produto
        Insert: Partial<Produto>
        Update: Partial<Produto>
      }
      produto_imagens: {
        Row: ProdutoImagem
        Insert: Partial<ProdutoImagem>
        Update: Partial<ProdutoImagem>
      }
      produto_variacoes: {
        Row: ProdutoVariacao
        Insert: Partial<ProdutoVariacao>
        Update: Partial<ProdutoVariacao>
      }
      noticias: {
        Row: Noticia
        Insert: Partial<Noticia>
        Update: Partial<Noticia>
      }
      tags: {
        Row: Tag
        Insert: Partial<Tag>
        Update: Partial<Tag>
      }
      item_tags: {
        Row: ItemTag
        Insert: Partial<ItemTag>
        Update: Partial<ItemTag>
      }
      comentarios: {
        Row: Comentario
        Insert: Partial<Comentario>
        Update: Partial<Comentario>
      }
      avaliacoes: {
        Row: Avaliacao
        Insert: Partial<Avaliacao>
        Update: Partial<Avaliacao>
      }
    }
  }
}

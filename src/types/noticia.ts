export type NoticiaCategoria = 'geral' | 'agro' | 'economia' | 'politica' | 'esporte' | 'cultura'

export interface Noticia {
  id: number
  titulo: string
  slug: string
  resumo: string
  conteudo: string
  imagem?: string
  imagem_alt?: string
  categoria: NoticiaCategoria
  destaque: boolean
  autor: string
  status: boolean
  data_publicacao: string
  tags?: string[]
  views: number
  created_at?: string
  updated_at?: string
}

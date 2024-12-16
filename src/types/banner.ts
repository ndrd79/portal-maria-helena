export type BannerTipo = 'premium' | 'lateral' | 'superior' | 'agro'

export interface Banner {
  id: number
  titulo: string
  empresa?: string
  descricao?: string
  imagem?: string
  cor?: string
  tipo: BannerTipo
  status: boolean
  data_inicio: string
  data_fim?: string
  ordem: number
  link?: string
  created_at?: string
  updated_at?: string
}

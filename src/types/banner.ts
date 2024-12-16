export type BannerTipo = 'premium' | 'lateral' | 'superior' | 'agro'

export interface Banner {
  id?: string
  titulo: string
  imagem: string
  link?: string
  tipo: 'premium' | 'simples'
  status?: boolean
  created_at?: string
  updated_at?: string
}

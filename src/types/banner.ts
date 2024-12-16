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

export interface BannerLateral extends Banner {
  posicao: 'esquerda' | 'direita';
  altura?: number; // altura em pixels
  largura?: number; // largura em pixels
  fixo?: boolean; // se o banner deve ficar fixo ao rolar a página
}

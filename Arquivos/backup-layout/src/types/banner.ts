export type BannerTipo = 'slide' | 'topo-central' | 'lateral-esquerda' | 'lateral-direita' | 'meio-pagina' | 'rodape' | 'submenu'

export interface Banner {
  id?: string
  titulo: string
  imagem: string
  link?: string
  tipo: BannerTipo
  largura: number
  altura: number
  ordem?: number
  status?: boolean
  created_at?: string
  updated_at?: string
}

// Dimensões padrão para cada tipo de banner
export const BANNER_DIMENSIONS = {
  'slide': { width: 1200, height: 400 },
  'topo-central': { width: 728, height: 90 },
  'lateral-esquerda': { width: 160, height: 600 },
  'lateral-direita': { width: 160, height: 600 },
  'meio-pagina': { width: 728, height: 90 },
  'rodape': { width: 728, height: 90 },
  'submenu': { width: 300, height: 100 }
} as const

// Descrições amigáveis para cada tipo de banner
export const BANNER_DESCRIPTIONS = {
  'slide': 'Banner do Slideshow (1200x400)',
  'topo-central': 'Banner Central do Topo (728x90)',
  'lateral-esquerda': 'Banner Lateral Esquerdo (160x600)',
  'lateral-direita': 'Banner Lateral Direito (160x600)',
  'meio-pagina': 'Banner do Meio da Página (728x90)',
  'rodape': 'Banner do Rodapé (728x90)',
  'submenu': 'Banner Abaixo do Menu (300x100)'
} as const

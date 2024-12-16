export type BannerTipo = 'quadrado' | 'retangular-horizontal' | 'retangular-vertical'
export type BannerPosicao = 'topo' | 'meio' | 'rodape'

export interface Banner {
  id?: string
  titulo: string
  imagem: string
  link?: string
  tipo: BannerTipo
  posicao: BannerPosicao
  largura: number
  altura: number
  ordem?: number
  status?: boolean
  created_at?: string
  updated_at?: string
}

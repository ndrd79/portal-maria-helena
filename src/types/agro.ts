export interface Cotacao {
  id: number
  produto: string
  preco: number
  unidade: string
  variacao: number
  data: string
  fonte: string
  created_at?: string
  updated_at?: string
}

export interface PrevisaoTempo {
  id: number
  data: string
  temperatura_min: number
  temperatura_max: number
  condicao: string // ensolarado, nublado, chuvoso, etc
  probabilidade_chuva: number
  precipitacao: number // em mm
  umidade: number
  vento: number // em km/h
  fonte: string
  created_at?: string
  updated_at?: string
}

export interface Feira {
  id: number
  data: string
  hora_inicio: string
  hora_fim: string
  local: string
  descricao?: string
  produtos?: string[]
  status: boolean
  created_at?: string
  updated_at?: string
}

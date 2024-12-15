export interface Empresa {
  id: string
  nome: string
  descricao: string
  categoria: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  telefone: string
  email: string
  website?: string
  horario_funcionamento: string
  logo_url?: string
  fotos: string[]
  status: 'pendente' | 'aprovada' | 'rejeitada'
  usuario_id: string
  created_at: string
  updated_at: string
}

export interface EmpresaFormData {
  nome: string
  descricao: string
  categoria: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  telefone: string
  email: string
  website?: string
  horario_funcionamento: string
  logo?: File
  fotos?: FileList
}

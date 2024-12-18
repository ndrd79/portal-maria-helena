import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Usuario } from '@/types/supabase'

export async function criarOuAtualizarUsuario(dadosUsuario: {
  id: string
  email: string
  nome?: string
}) {
  const supabase = createClientComponentClient()
  const { id, email, nome } = dadosUsuario

  try {
    // Verifica se o usuário já existe
    const { data: usuarioExistente, error: erroConsulta } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single()

    if (erroConsulta && erroConsulta.code !== 'PGRST116') {
      throw erroConsulta
    }

    if (!usuarioExistente) {
      // Cria um novo usuário
      const novoUsuario: Partial<Usuario> = {
        id,
        email,
        nome: nome || email.split('@')[0],
        tipo: 'usuario',
        status: 'ativo',
      }

      const { error: erroInsercao } = await supabase
        .from('usuarios')
        .insert([novoUsuario])

      if (erroInsercao) throw erroInsercao

      return { ...novoUsuario } as Usuario
    }

    return usuarioExistente
  } catch (erro) {
    console.error('Erro ao criar/atualizar usuário:', erro)
    throw erro
  }
}

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
    // Primeiro tenta buscar por email
    const { data: usuarioExistente, error: erroConsulta } = await supabase
      .from('usuarios')
      .select()
      .eq('email', email)
      .single()

    if (erroConsulta && erroConsulta.code !== 'PGRST116') {
      console.error('Erro ao consultar usuário:', erroConsulta)
      throw erroConsulta
    }

    // Se encontrou usuário, atualiza
    if (usuarioExistente) {
      const { data: usuarioAtualizado, error: erroUpdate } = await supabase
        .from('usuarios')
        .update({
          id,
          email,
          nome: nome || email.split('@')[0],
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
        .select()
        .single()

      if (erroUpdate) {
        console.error('Erro ao atualizar usuário:', erroUpdate)
        throw erroUpdate
      }

      return usuarioAtualizado as Usuario
    }

    // Se não encontrou, cria novo
    const { data: usuarioCriado, error: erroInsert } = await supabase
      .from('usuarios')
      .insert({
        id,
        email,
        nome: nome || email.split('@')[0],
        tipo: 'usuario',
        status: 'ativo'
      })
      .select()
      .single()

    if (erroInsert) {
      console.error('Erro ao inserir usuário:', erroInsert)
      throw erroInsert
    }

    return usuarioCriado as Usuario
  } catch (erro) {
    console.error('Erro ao criar/atualizar usuário:', erro)
    throw erro
  }
}

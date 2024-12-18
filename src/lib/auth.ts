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
    // Primeiro tenta atualizar
    const { data: usuarioAtualizado, error: erroUpdate } = await supabase
      .from('usuarios')
      .update({
        email,
        nome: nome || email.split('@')[0],
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    // Se o usuário não existe, tenta criar
    if (!usuarioAtualizado) {
      const { data: usuarioCriado, error: erroInsert } = await supabase
        .from('usuarios')
        .insert({
          id,
          email,
          nome: nome || email.split('@')[0],
          tipo: 'usuario',
          status: 'ativo',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (erroInsert) {
        console.error('Erro ao inserir usuário:', erroInsert)
        throw erroInsert
      }

      return usuarioCriado as Usuario
    }

    if (erroUpdate) {
      console.error('Erro ao atualizar usuário:', erroUpdate)
      throw erroUpdate
    }

    return usuarioAtualizado as Usuario
  } catch (erro) {
    console.error('Erro ao criar/atualizar usuário:', erro)
    throw erro
  }
}

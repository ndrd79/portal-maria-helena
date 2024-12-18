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
    const novoUsuario: Partial<Usuario> = {
      id,
      email,
      nome: nome || email.split('@')[0],
      tipo: 'usuario',
      status: 'ativo',
      updated_at: new Date().toISOString()
    }

    const { data: usuario, error: erroUpsert } = await supabase
      .from('usuarios')
      .upsert(novoUsuario, {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (erroUpsert) {
      console.error('Erro ao criar/atualizar usuário:', erroUpsert)
      throw erroUpsert
    }

    return usuario as Usuario
  } catch (erro) {
    console.error('Erro ao criar/atualizar usuário:', erro)
    throw erro
  }
}

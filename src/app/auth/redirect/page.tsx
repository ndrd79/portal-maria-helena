'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthRedirect() {
  useEffect(() => {
    async function redirect() {
      try {
        console.log('Verificando sessão...')
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user) {
          console.log('Sem sessão ativa, redirecionando para login...')
          window.location.href = '/login'
          return
        }

        console.log('Sessão encontrada, verificando tipo do usuário...')
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('tipo')
          .eq('id', session.user.id)
          .single()

        if (userError) {
          console.error('Erro ao buscar tipo do usuário:', userError)
          throw userError
        }

        if (!userData) {
          console.error('Usuário não encontrado na tabela usuarios')
          throw new Error('Perfil não encontrado')
        }

        console.log('Tipo do usuário:', userData.tipo)
        
        // Redirecionar baseado no tipo
        if (userData.tipo === 'admin') {
          window.location.href = '/admin/dashboard'
        } else if (userData.tipo === 'comerciante') {
          window.location.href = '/comerciante/dashboard'
        } else {
          window.location.href = '/dashboard'
        }
      } catch (error) {
        console.error('Erro no redirecionamento:', error)
        window.location.href = '/login'
      }
    }

    redirect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <span className="block mt-2 text-gray-600">Redirecionando...</span>
      </div>
    </div>
  )
}

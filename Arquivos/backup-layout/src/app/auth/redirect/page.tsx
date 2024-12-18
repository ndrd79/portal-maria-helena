'use client'

import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthRedirect() {
  useEffect(() => {
    const supabase = createClientComponentClient()
    async function redirect() {
      try {
        console.log('Verificando sessão...')
        const { data: { session } } = await supabase.auth.getSession()
        
        console.log('Dados da sessão:', session)
        
        if (!session?.user) {
          console.log('Sem sessão ativa, redirecionando para login...')
          window.location.href = '/login'
          return
        }

        console.log('ID do usuário:', session.user.id)
        console.log('Email do usuário:', session.user.email)
        console.log('Sessão encontrada, verificando tipo do usuário...')
        
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .single()

        console.log('Dados do usuário:', userData)
        console.log('Erro ao buscar usuário:', userError)

        if (userError) {
          console.error('Erro ao buscar tipo do usuário:', userError)
          throw userError
        }

        if (!userData) {
          console.error('Usuário não encontrado na tabela usuarios')
          throw new Error('Perfil não encontrado')
        }

        console.log('Tipo do usuário:', userData.tipo)
        
        // Por enquanto, vamos redirecionar para uma rota que sabemos que existe
        window.location.href = '/'
        
      } catch (error) {
        console.error('Erro no redirecionamento:', error)
        // Não redirecionamos para login aqui para poder ver os erros no console
        // window.location.href = '/login'
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

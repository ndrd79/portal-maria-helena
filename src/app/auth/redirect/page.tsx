'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthRedirect() {
  useEffect(() => {
    async function redirect() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user) {
          window.location.href = '/login'
          return
        }

        const { data: userData } = await supabase
          .from('usuarios')
          .select('tipo')
          .eq('id', session.user.id)
          .single()

        if (userData?.tipo === 'admin') {
          window.location.href = '/admin/dashboard'
        } else if (userData?.tipo === 'comerciante') {
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
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <span className="ml-2 text-gray-600">Redirecionando...</span>
    </div>
  )
}

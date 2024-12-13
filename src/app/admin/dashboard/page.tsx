'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Usuario } from '@/types/supabase'
import { Alert } from '@/components/Alert'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUser() {
      try {
        console.log('Verificando sessão...')
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Erro ao obter sessão:', sessionError)
          throw sessionError
        }

        if (!session) {
          console.log('Sem sessão ativa, redirecionando...')
          router.push('/login')
          return
        }

        console.log('Buscando dados do usuário...')
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (userError) {
          console.error('Erro ao buscar usuário:', userError)
          throw userError
        }

        if (!userData) {
          console.error('Usuário não encontrado')
          throw new Error('Usuário não encontrado')
        }

        if (userData.tipo !== 'admin') {
          console.error('Usuário não é admin')
          throw new Error('Acesso não autorizado')
        }

        console.log('Dados do usuário carregados:', userData)
        setUser(userData)
      } catch (err) {
        console.error('Erro ao carregar usuário:', err)
        setError(err instanceof Error ? err.message : 'Erro ao carregar usuário')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [router])

  const handleLogout = async () => {
    try {
      console.log('Fazendo logout...')
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/login')
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
      setError(err instanceof Error ? err.message : 'Erro ao fazer logout')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-2 text-gray-600">Carregando...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <Alert type="error" message={error} />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <Alert type="error" message="Usuário não encontrado" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Portal Maria Helena - Admin</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Olá, {user.nome}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Comércios</h3>
                <p className="mt-1 text-sm text-gray-500">Gerenciar comércios cadastrados</p>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <button 
                  onClick={() => router.push('/admin/comercios')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Ver todos →
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Usuários</h3>
                <p className="mt-1 text-sm text-gray-500">Gerenciar usuários do sistema</p>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <button 
                  onClick={() => router.push('/admin/usuarios')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Ver todos →
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Notícias</h3>
                <p className="mt-1 text-sm text-gray-500">Gerenciar notícias do portal</p>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <button 
                  onClick={() => router.push('/admin/noticias')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Ver todas →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

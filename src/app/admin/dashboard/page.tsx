'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Usuario, Anuncio } from '@/types/supabase'
import { Alert } from '@/components/Alert'
import Image from 'next/image'

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [showAnuncios, setShowAnuncios] = useState(false)
  const [novoAnuncio, setNovoAnuncio] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      if (!session) {
        router.push('/login')
        return
      }

      await loadUser(session.user.id)
    } catch (err) {
      console.error('Erro ao verificar sessão:', err)
      setError(err instanceof Error ? err.message : 'Erro ao verificar sessão')
      router.push('/login')
    }
  }

  async function loadUser(userId: string) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      if (!data) throw new Error('Usuário não encontrado')
      if (data.tipo !== 'admin') throw new Error('Acesso não autorizado')

      setUser(data)
      await loadAnuncios()
    } catch (err) {
      console.error('Erro ao carregar usuário:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar usuário')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  async function loadAnuncios() {
    try {
      const { data, error } = await supabase
        .from('anuncios')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAnuncios(data || [])
    } catch (err) {
      console.error('Erro ao carregar anúncios:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar anúncios')
    }
  }

  const handleLogout = async () => {
    try {
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

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4">
              <Alert type="error" message={error} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Anúncios</h3>
                <p className="mt-1 text-sm text-gray-500">Gerenciar publicidade no portal</p>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <button 
                  onClick={() => setShowAnuncios(!showAnuncios)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  {showAnuncios ? 'Fechar' : 'Gerenciar'} →
                </button>
              </div>
            </div>
          </div>

          {showAnuncios && (
            <div className="mt-8">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Gerenciamento de Anúncios
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Gerencie todos os anúncios e campanhas do portal
                    </p>
                  </div>
                  <button
                    onClick={() => setNovoAnuncio(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Novo Anúncio
                  </button>
                </div>

                <div className="border-t border-gray-200">
                  {anuncios.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      Nenhum anúncio cadastrado
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {anuncios.map((anuncio) => (
                        <li key={anuncio.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 relative">
                                <Image
                                  src={anuncio.imagem_url || '/placeholder.png'}
                                  alt={anuncio.titulo}
                                  width={48}
                                  height={48}
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-indigo-600">
                                  {anuncio.titulo}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {anuncio.descricao}
                                </div>
                                <div className="mt-1 text-xs text-gray-400">
                                  {new Date(anuncio.data_inicio).toLocaleDateString()} até {new Date(anuncio.data_fim).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-sm text-gray-500">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                  ${anuncio.status === 'ativo' ? 'bg-green-100 text-green-800' : 
                                    anuncio.status === 'agendado' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'}`}>
                                  {anuncio.status.charAt(0).toUpperCase() + anuncio.status.slice(1)}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500">
                                <div className="flex items-center space-x-2">
                                  <span title="Visualizações">👁️ {anuncio.visualizacoes}</span>
                                  <span title="Cliques">🖱️ {anuncio.cliques}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => {/* Implementar edição */}}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Editar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

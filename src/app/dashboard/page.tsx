'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Alert } from '@/components/Alert'
import { Usuario } from '@/types/supabase'
import {
  NewspaperIcon,
  ChartBarIcon,
  UsersIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline'

export default function PainelPrincipal() {
  const router = useRouter()
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    noticias: 0,
    visitantes: 0,
    comercios: 0,
    posts: 0,
  })
  const supabase = createClientComponentClient()

  useEffect(() => {
    verificarUsuario()
  }, [])

  async function verificarUsuario() {
    try {
      const { data: { session }, error: erroSessao } = await supabase.auth.getSession()
      
      if (erroSessao) throw erroSessao
      if (!session) {
        router.push('/login')
        return
      }

      await carregarUsuario(session.user.id)
    } catch (erro) {
      console.error('Erro ao verificar sessão:', erro)
      setError(erro instanceof Error ? erro.message : 'Erro ao verificar sessão')
      router.push('/login')
    }
  }

  async function carregarUsuario(idUsuario: string) {
    try {
      const { data: usuario, error: erroUsuario } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', idUsuario)
        .single()

      if (erroUsuario) throw erroUsuario
      if (!usuario) throw new Error('Usuário não encontrado')
      
      setUser(usuario)
      await carregarEstatisticas()
    } catch (erro) {
      console.error('Erro ao carregar usuário:', erro)
      setError(erro instanceof Error ? erro.message : 'Erro ao carregar usuário')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  async function carregarEstatisticas() {
    try {
      // Carregar contagem de notícias
      const { count: totalNoticias, error: erroNoticias } = await supabase
        .from('noticias')
        .select('*', { count: 'exact', head: true })

      if (erroNoticias) throw erroNoticias

      // Carregar contagem de comércios
      const { count: totalComercios, error: erroComercios } = await supabase
        .from('comercios')
        .select('*', { count: 'exact', head: true })

      if (erroComercios) throw erroComercios

      // Carregar contagem de posts
      const { count: totalPosts, error: erroPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })

      if (erroPosts) throw erroPosts
      
      setStats({
        noticias: totalNoticias || 0,
        comercios: totalComercios || 0,
        posts: totalPosts || 0,
        visitantes: 0, // Implementar analytics posteriormente
      })
    } catch (erro) {
      console.error('Erro ao carregar estatísticas:', erro)
      setError(erro instanceof Error ? erro.message : 'Erro ao carregar estatísticas')
    }
  }

  async function fazerLogout() {
    try {
      const { error: erroLogout } = await supabase.auth.signOut()
      if (erroLogout) throw erroLogout
      router.push('/login')
    } catch (erro) {
      console.error('Erro ao fazer logout:', erro)
      setError(erro instanceof Error ? erro.message : 'Erro ao fazer logout')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Carregando...</span>
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

  const cartoesEstatisticas = [
    { 
      nome: 'Notícias', 
      valor: stats.noticias, 
      icone: NewspaperIcon, 
      cor: 'bg-blue-500',
      link: '/admin/noticias'
    },
    { 
      nome: 'Comércios', 
      valor: stats.comercios, 
      icone: BuildingStorefrontIcon, 
      cor: 'bg-green-500',
      link: '/admin/comercios'
    },
    { 
      nome: 'Visitantes', 
      valor: stats.visitantes, 
      icone: UsersIcon, 
      cor: 'bg-purple-500',
      link: '/admin/analytics'
    },
    { 
      nome: 'Posts', 
      valor: stats.posts, 
      icone: ChartBarIcon, 
      cor: 'bg-yellow-500',
      link: '/admin/posts'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar onLogout={fazerLogout} />
      
      <div className="pl-64">
        <Header user={user} />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4">
              <Alert type="error" message={error} />
            </div>
          )}

          {/* Cartões de Estatísticas */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cartoesEstatisticas.map((cartao) => (
              <div
                key={cartao.nome}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => router.push(cartao.link)}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <cartao.icone className={`h-10 w-10 ${cartao.cor} text-white rounded-lg p-2`} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {cartao.nome}
                        </dt>
                        <dd className="text-2xl font-semibold text-gray-900">
                          {cartao.valor}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Seção de Atividades Recentes */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Atividades Recentes
                  </h3>
                  <button
                    onClick={() => router.push('/admin/atividades')}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Ver todas →
                  </button>
                </div>
                <div className="mt-5">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {/* Exemplo de atividade - Será implementado posteriormente */}
                      <li className="relative pb-8">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                              <NewspaperIcon className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Aguardando implementação do sistema de atividades
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={new Date().toISOString()}>
                                {new Date().toLocaleDateString()}
                              </time>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

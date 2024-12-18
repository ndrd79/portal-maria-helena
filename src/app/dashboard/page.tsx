'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import {
  NewspaperIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    noticias: 0,
    visitantes: 0,
    posts: 0,
  })
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          window.location.href = '/login'
          return
        }
        setUser(session.user)
        await loadStats()
      } catch (err) {
        console.error('Erro ao carregar usuário:', err)
        setError('Erro ao carregar usuário')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  const loadStats = async () => {
    // Carregar estatísticas do Supabase
    const { data: noticias } = await supabase.from('noticias').select('*', { count: 'exact' })
    
    setStats({
      noticias: noticias?.length || 0,
      visitantes: 1234, // Exemplo - implementar analytics real
      posts: 56, // Exemplo - implementar contagem real
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    )
  }

  const statCards = [
    { name: 'Notícias', value: stats.noticias, icon: NewspaperIcon, color: 'bg-blue-500' },
    { name: 'Visitantes', value: stats.visitantes, icon: UsersIcon, color: 'bg-purple-500' },
    { name: 'Posts', value: stats.posts, icon: ChartBarIcon, color: 'bg-yellow-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      
      <div className="pl-64">
        <Header user={user} />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((card) => (
              <div
                key={card.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon className={`h-6 w-6 text-white ${card.color} rounded-md p-1`} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {card.name}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {card.value}
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
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Atividades Recentes
                </h3>
                <div className="mt-5">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {/* Exemplo de atividade */}
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
                                Nova notícia publicada: <span className="font-medium text-gray-900">Título da Notícia</span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2024-12-16">Há 2 horas</time>
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

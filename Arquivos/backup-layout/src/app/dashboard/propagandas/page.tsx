'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function PropagandasPage() {
  const [user, setUser] = useState<any>(null)
  const [propagandas, setPropagandas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkAuth()
    loadPropagandas()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }
    setUser(session.user)
  }

  const loadPropagandas = async () => {
    const { data, error } = await supabase
      .from('propagandas')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setPropagandas(data)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir esta propaganda?')
    if (!confirmed) return

    await supabase
      .from('propagandas')
      .delete()
      .match({ id })

    loadPropagandas()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      
      <div className="pl-64">
        <Header user={user} />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Gerenciar Propagandas
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Nova Propaganda
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Anunciante
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Posição
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Período
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Ações</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {propagandas.map((propaganda) => (
                        <tr key={propaganda.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{propaganda.anunciante}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{propaganda.posicao}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(propaganda.data_inicio).toLocaleDateString('pt-BR')} - 
                              {new Date(propaganda.data_fim).toLocaleDateString('pt-BR')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              new Date(propaganda.data_fim) > new Date() 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {new Date(propaganda.data_fim) > new Date() ? 'Ativo' : 'Expirado'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              onClick={() => {/* Implementar edição */}}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDelete(propaganda.id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

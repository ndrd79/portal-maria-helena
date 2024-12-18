'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Alert } from '@/components/Alert'
import Image from 'next/image'

type Anuncio = {
  id: string
  titulo: string
  descricao: string | null
  tipo: 'banner' | 'carrossel' | 'card' | 'popup' | 'nativo'
  imagem_url: string
  link_url: string | null
  data_inicio: string
  data_fim: string
  status: 'ativo' | 'inativo' | 'agendado'
  posicao: string
  prioridade: number
  visualizacoes: number
  cliques: number
  created_at: string
}

export default function AnunciosPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAnuncios()
  }, [])

  async function loadAnuncios() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      if (!session) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('anuncios')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setAnuncios(data || [])
    } catch (err) {
      console.error('Erro ao carregar anúncios:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar anúncios')
    } finally {
      setLoading(false)
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gerenciar Anúncios</h1>
            <p className="mt-1 text-sm text-gray-600">
              Gerencie todos os anúncios e campanhas do portal
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/anuncios/novo')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Novo Anúncio
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {anuncios.map((anuncio) => (
              <li key={anuncio.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                     onClick={() => router.push(`/admin/anuncios/${anuncio.id}`)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 relative">
                        <Image
                          src={anuncio.imagem_url}
                          alt={anuncio.titulo}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-indigo-600">{anuncio.titulo}</div>
                        <div className="text-sm text-gray-500">{anuncio.descricao}</div>
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
                          <span>👁️ {anuncio.visualizacoes}</span>
                          <span>🖱️ {anuncio.cliques}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

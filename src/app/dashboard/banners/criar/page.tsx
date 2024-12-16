'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Banner, BannerTipo } from '@/types/banner'

export default function CriarBannerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState<Partial<Banner>>({
    titulo: '',
    empresa: '',
    descricao: '',
    tipo: 'premium' as BannerTipo,
    status: true,
    data_inicio: new Date().toISOString().split('T')[0],
    ordem: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banner),
      })

      if (!response.ok) throw new Error('Erro ao criar banner')

      router.push('/dashboard/banners')
    } catch (error) {
      console.error('Erro ao criar banner:', error)
      alert('Erro ao criar banner')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setBanner(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar Novo Banner</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              required
              value={banner.titulo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
              Empresa
            </label>
            <input
              type="text"
              name="empresa"
              id="empresa"
              value={banner.empresa || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              name="descricao"
              id="descricao"
              rows={3}
              value={banner.descricao || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              name="tipo"
              id="tipo"
              required
              value={banner.tipo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="premium">Premium</option>
              <option value="lateral">Lateral</option>
              <option value="superior">Superior</option>
              <option value="agro">Agro</option>
            </select>
          </div>

          <div>
            <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">
              URL da Imagem
            </label>
            <input
              type="url"
              name="imagem"
              id="imagem"
              value={banner.imagem || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              name="link"
              id="link"
              value={banner.link || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="data_inicio" className="block text-sm font-medium text-gray-700">
                Data de Início
              </label>
              <input
                type="date"
                name="data_inicio"
                id="data_inicio"
                required
                value={banner.data_inicio?.split('T')[0]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="data_fim" className="block text-sm font-medium text-gray-700">
                Data de Fim
              </label>
              <input
                type="date"
                name="data_fim"
                id="data_fim"
                value={banner.data_fim?.split('T')[0] || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ordem" className="block text-sm font-medium text-gray-700">
              Ordem
            </label>
            <input
              type="number"
              name="ordem"
              id="ordem"
              required
              value={banner.ordem}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="status"
              id="status"
              checked={banner.status}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="status" className="ml-2 block text-sm text-gray-900">
              Banner ativo
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

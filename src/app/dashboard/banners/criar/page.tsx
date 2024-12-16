'use client'

import { Banner, BannerTipo, BannerPosicao } from '@/types/banner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CriarBannerPage() {
  const router = useRouter()
  const [banner, setBanner] = useState<Partial<Banner>>({
    titulo: '',
    imagem: '',
    tipo: 'quadrado',
    posicao: 'topo',
    largura: 300,
    altura: 300,
    status: true,
    ordem: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from('banners')
      .insert(banner)

    if (error) {
      alert('Erro ao criar banner: ' + error.message)
      return
    }

    router.push('/dashboard/banners')
    router.refresh()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">
              Imagem (URL)
            </label>
            <input
              type="url"
              name="imagem"
              id="imagem"
              required
              value={banner.imagem}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              Link (opcional)
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

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              name="tipo"
              id="tipo"
              required
              value={banner.tipo}
              onChange={(e) => {
                const tipo = e.target.value as BannerTipo
                let altura = banner.altura
                let largura = banner.largura
                
                // Ajusta dimensões baseado no tipo
                switch (tipo) {
                  case 'quadrado':
                    altura = 300
                    largura = 300
                    break
                  case 'retangular-horizontal':
                    altura = 300
                    largura = 533 // ~16:9
                    break
                  case 'retangular-vertical':
                    altura = 533
                    largura = 300 // ~9:16
                    break
                }
                
                setBanner(prev => ({ ...prev, tipo, altura, largura }))
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="quadrado">Quadrado</option>
              <option value="retangular-horizontal">Retangular Horizontal</option>
              <option value="retangular-vertical">Retangular Vertical</option>
            </select>
          </div>

          <div>
            <label htmlFor="posicao" className="block text-sm font-medium text-gray-700">
              Posição
            </label>
            <select
              name="posicao"
              id="posicao"
              required
              value={banner.posicao}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="topo">Topo</option>
              <option value="meio">Meio</option>
              <option value="rodape">Rodapé</option>
            </select>
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
              min="0"
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
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Criar Banner
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

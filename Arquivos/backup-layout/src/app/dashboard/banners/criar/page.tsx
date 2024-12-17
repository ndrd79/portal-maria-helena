'use client'

import { Banner, BannerTipo, BANNER_DIMENSIONS, BANNER_DESCRIPTIONS } from '@/types/banner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ImageUpload from '@/components/ImageUpload'

export default function CriarBannerPage() {
  const router = useRouter()
  const [banner, setBanner] = useState<Partial<Banner>>({
    titulo: '',
    imagem: '',
    tipo: 'slide',
    largura: BANNER_DIMENSIONS['slide'].width,
    altura: BANNER_DIMENSIONS['slide'].height,
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
    
    if (name === 'tipo') {
      const tipo = value as BannerTipo
      setBanner(prev => ({
        ...prev,
        tipo,
        largura: BANNER_DIMENSIONS[tipo].width,
        altura: BANNER_DIMENSIONS[tipo].height
      }))
    } else {
      setBanner(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  }

  return (
    <div className="p-6 pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar Novo Banner</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
              Tipo de Banner
            </label>
            <select
              name="tipo"
              id="tipo"
              required
              value={banner.tipo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {Object.entries(BANNER_DESCRIPTIONS).map(([value, description]) => (
                <option key={value} value={value}>
                  {description}
                </option>
              ))}
            </select>
          </div>

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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ex: Banner Principal do Topo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Imagem ({banner.largura}x{banner.altura})
            </label>
            {banner.tipo && (
              <ImageUpload 
                onUpload={(url) => setBanner(prev => ({ ...prev, imagem: url }))}
                width={BANNER_DIMENSIONS[banner.tipo].width}
                height={BANNER_DIMENSIONS[banner.tipo].height}
              />
            )}
            <p className="mt-2 text-sm text-gray-500">
              Dimensões recomendadas: {banner.largura}x{banner.altura} pixels
            </p>
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="https://exemplo.com"
            />
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              A ordem define a posição do banner quando houver múltiplos banners do mesmo tipo
            </p>
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

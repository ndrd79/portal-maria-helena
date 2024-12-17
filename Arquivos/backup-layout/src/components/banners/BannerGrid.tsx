'use client'

import { Banner, BannerTipo } from '@/types/banner'
import Image from 'next/image'
import Link from 'next/link'

interface BannerGridProps {
  banners: Banner[]
  className?: string
}

export default function BannerGrid({ banners, className = '' }: BannerGridProps) {
  // Agrupa banners por tipo
  const bannersPorTipo = banners.reduce((acc, banner) => {
    if (!acc[banner.tipo]) {
      acc[banner.tipo] = []
    }
    acc[banner.tipo].push(banner)
    return acc
  }, {} as Record<BannerTipo, Banner[]>)

  // Ordena banners dentro de cada grupo
  Object.keys(bannersPorTipo).forEach(tipo => {
    bannersPorTipo[tipo as BannerTipo].sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
  })

  const renderBanner = (banner: Banner) => {
    const content = (
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <Image
          src={banner.imagem}
          alt={banner.titulo}
          width={banner.largura}
          height={banner.altura}
          className="object-cover w-full h-full"
        />
      </div>
    )

    return banner.link ? (
      <Link 
        key={banner.id} 
        href={banner.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </Link>
    ) : (
      <div key={banner.id}>{content}</div>
    )
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Slideshow */}
      {bannersPorTipo.slide && (
        <div className="grid grid-cols-1 gap-4">
          {bannersPorTipo.slide.map(renderBanner)}
        </div>
      )}

      {/* Banner Central do Topo */}
      {bannersPorTipo['topo-central'] && (
        <div className="grid grid-cols-1 gap-4">
          {bannersPorTipo['topo-central'].map(renderBanner)}
        </div>
      )}

      {/* Banner Abaixo do Menu */}
      {bannersPorTipo.submenu && (
        <div className="grid grid-cols-1 gap-4">
          {bannersPorTipo.submenu.map(renderBanner)}
        </div>
      )}

      {/* Banners Laterais */}
      <div className="grid grid-cols-12 gap-4">
        {/* Lateral Esquerdo */}
        {bannersPorTipo['lateral-esquerda'] && (
          <div className="col-span-2">
            {bannersPorTipo['lateral-esquerda'].map(renderBanner)}
          </div>
        )}

        {/* Conteúdo Central */}
        <div className="col-span-8 space-y-4">
          {/* Banners do Meio da Página */}
          {bannersPorTipo['meio-pagina'] && (
            <div className="grid grid-cols-1 gap-4">
              {bannersPorTipo['meio-pagina'].map(renderBanner)}
            </div>
          )}
        </div>

        {/* Lateral Direito */}
        {bannersPorTipo['lateral-direita'] && (
          <div className="col-span-2">
            {bannersPorTipo['lateral-direita'].map(renderBanner)}
          </div>
        )}
      </div>

      {/* Banner do Rodapé */}
      {bannersPorTipo.rodape && (
        <div className="grid grid-cols-1 gap-4">
          {bannersPorTipo.rodape.map(renderBanner)}
        </div>
      )}
    </div>
  )
}

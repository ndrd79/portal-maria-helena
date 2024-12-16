'use client'

import { Banner } from '@/types/banner'
import Image from 'next/image'
import Link from 'next/link'

interface BannerGridProps {
  banners: Banner[]
  className?: string
}

export default function BannerGrid({ banners, className = '' }: BannerGridProps) {
  // Agrupa banners por posição
  const bannersPorPosicao = banners.reduce((acc, banner) => {
    if (!acc[banner.posicao]) {
      acc[banner.posicao] = []
    }
    acc[banner.posicao].push(banner)
    return acc
  }, {} as Record<string, Banner[]>)

  // Ordena banners dentro de cada grupo
  Object.keys(bannersPorPosicao).forEach(posicao => {
    bannersPorPosicao[posicao].sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
  })

  const renderBanner = (banner: Banner) => {
    const content = (
      <div className={`
        relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow
        ${banner.tipo === 'quadrado' ? 'aspect-square' : ''}
        ${banner.tipo === 'retangular-horizontal' ? 'aspect-[16/9]' : ''}
        ${banner.tipo === 'retangular-vertical' ? 'aspect-[9/16]' : ''}
      `}>
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
      {/* Banners do topo - Layout horizontal */}
      {bannersPorPosicao.topo && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bannersPorPosicao.topo.map(renderBanner)}
        </div>
      )}

      {/* Banners do meio - Layout flexível */}
      {bannersPorPosicao.meio && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bannersPorPosicao.meio.map(renderBanner)}
        </div>
      )}

      {/* Banners do rodapé - Layout horizontal */}
      {bannersPorPosicao.rodape && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bannersPorPosicao.rodape.map(renderBanner)}
        </div>
      )}
    </div>
  )
}

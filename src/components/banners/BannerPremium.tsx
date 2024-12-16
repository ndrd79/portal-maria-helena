'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Banner } from '@/types/banner'

interface BannerPremiumProps {
  banners: Banner[]
}

export default function BannerPremium({ banners }: BannerPremiumProps) {
  const [bannerAtivo, setBannerAtivo] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerAtivo((atual) => (atual + 1) % banners.length)
    }, 5000) // Muda a cada 5 segundos

    return () => clearInterval(timer)
  }, [banners.length])

  if (!banners || banners.length === 0) return null

  return (
    <div className="relative h-[300px]">
      {/* Banners */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === bannerAtivo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${banner.cor || 'from-blue-600 via-blue-700 to-blue-800'} flex items-center justify-center`}>
              {banner.imagem ? (
                <Image
                  src={banner.imagem}
                  alt={banner.titulo}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm mb-4 inline-block">
                    {banner.empresa}
                  </span>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    {banner.titulo}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">
                    {banner.descricao}
                  </p>
                  <Link
                    href={banner.link || '/contato'}
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-flex items-center"
                  >
                    Saiba Mais
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setBannerAtivo(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === bannerAtivo ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        onClick={() => setBannerAtivo((atual) => (atual - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Banner anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setBannerAtivo((atual) => (atual + 1) % banners.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Próximo banner"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

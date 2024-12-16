'use client'

import { BannerLateral as BannerLateralType } from '@/types/banner'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface BannerLateralProps {
  banner: BannerLateralType
  className?: string
}

export default function BannerLateral({ banner, className = '' }: BannerLateralProps) {
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    if (!banner.fixo) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsFixed(scrollY > 100) // começa a fixar após rolar 100px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [banner.fixo])

  const style = {
    width: banner.largura || 'auto',
    height: banner.altura || 'auto',
    position: isFixed ? 'fixed' : 'relative',
    top: isFixed ? '20px' : 'auto',
    [banner.posicao]: isFixed ? '20px' : 'auto',
  } as const

  return (
    <div 
      className={`banner-lateral ${className}`}
      style={style}
    >
      {banner.link ? (
        <Link href={banner.link} target="_blank" rel="noopener noreferrer">
          <Image
            src={banner.imagem}
            alt={banner.titulo}
            width={banner.largura || 300}
            height={banner.altura || 600}
            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          />
        </Link>
      ) : (
        <Image
          src={banner.imagem}
          alt={banner.titulo}
          width={banner.largura || 300}
          height={banner.altura || 600}
          className="rounded-lg shadow-lg"
        />
      )}
    </div>
  )
}

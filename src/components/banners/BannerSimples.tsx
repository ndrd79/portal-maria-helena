'use client'

import { Banner } from '@/types/banner'
import Image from 'next/image'
import Link from 'next/link'

interface BannerSimplesProps {
  banner: Banner
  className?: string
}

export default function BannerSimples({ banner, className = '' }: BannerSimplesProps) {
  const content = (
    <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
      {banner.imagem && (
        <Image
          src={banner.imagem}
          alt={banner.titulo}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h2 className="text-2xl font-bold">{banner.titulo}</h2>
        </div>
      </div>
    </div>
  )

  return (
    <div className={className}>
      {banner.link ? (
        <Link href={banner.link} target="_blank" rel="noopener noreferrer">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}

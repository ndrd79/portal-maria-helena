'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Banner } from '@/types/banner'

interface BannerSimplesProps {
  banner?: Banner
  width: number
  height: number
}

export default function BannerSimples({ banner, width, height }: BannerSimplesProps) {
  if (!banner) {
    return (
      <div>
        <div className="text-[10px] text-slate-500 mb-1">
          Publicidade
        </div>
        <div 
          className="bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center"
          style={{ width: '100%', height }}
        >
          <span className="text-slate-400 text-sm">{width} x {height}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-[10px] text-slate-500 mb-1">
        Publicidade
      </div>
      <Link href={banner.link || '#'}>
        <div 
          className="relative rounded-lg border border-slate-200 overflow-hidden"
          style={{ width: '100%', height }}
        >
          {banner.imagem ? (
            <Image
              src={banner.imagem}
              alt={banner.titulo}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
              <div className="text-center p-4">
                <h3 className="font-bold text-gray-900">{banner.titulo}</h3>
                <p className="text-sm text-gray-600 mt-2">{banner.descricao}</p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

'use client'

import { Banner } from '@/types/banner'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface BannerPremiumProps {
  banners: Banner[]
  className?: string
}

export default function BannerPremium({ banners, className = '' }: BannerPremiumProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length])

  if (!banners.length) return null

  const banner = banners[currentIndex]

  const content = (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      <div
        className={`absolute inset-0 transition-transform duration-500`}
      >
        <div className="h-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center">
          {banner.imagem && (
            <Image
              src={banner.imagem}
              alt={banner.titulo}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h2 className="text-3xl font-bold mb-2">{banner.titulo}</h2>
          </div>
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
      
      {banners.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

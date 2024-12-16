'use client'

import { BannerLateral as BannerLateralType } from '@/types/banner'
import BannerLateral from '@/components/banners/BannerLateral'

interface SidebarProps {
  banners: BannerLateralType[]
  posicao: 'esquerda' | 'direita'
}

export default function Sidebar({ banners, posicao }: SidebarProps) {
  const bannersDaPosicao = banners.filter(b => b.posicao === posicao)

  return (
    <aside className={`hidden lg:flex flex-col gap-4 w-[300px] p-4 ${
      posicao === 'direita' ? 'ml-4' : 'mr-4'
    }`}>
      {bannersDaPosicao.map((banner) => (
        <BannerLateral
          key={banner.id}
          banner={banner}
          className={posicao === 'direita' ? 'ml-auto' : 'mr-auto'}
        />
      ))}
    </aside>
  )
}

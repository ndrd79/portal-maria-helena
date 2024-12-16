import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/navigation/navbar'
import Footer from '@/components/navigation/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portal Maria Helena',
  description: 'Portal de serviços contábeis',
}

// Array de banners laterais
const bannersLaterais = [
  {
    id: 1,
    titulo: 'Anúncio 1',
    cor: 'from-blue-400 to-blue-600',
    link: '/anuncio-1'
  },
  {
    id: 2,
    titulo: 'Anúncio 2',
    cor: 'from-purple-400 to-purple-600',
    link: '/anuncio-2'
  },
  {
    id: 3,
    titulo: 'Anúncio 3',
    cor: 'from-green-400 to-green-600',
    link: '/anuncio-3'
  },
  {
    id: 4,
    titulo: 'Anúncio 4',
    cor: 'from-red-400 to-red-600',
    link: '/anuncio-4'
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen relative">
          <Navbar />
          {/* Banners Laterais - Visíveis apenas em telas grandes */}
          <div className="hidden xl:block">
            {/* Banner Lateral Esquerdo */}
            <div className="fixed left-0 top-1/2 -translate-y-1/2 z-20 w-[160px] space-y-4">
              {bannersLaterais.slice(0, 2).map((banner) => (
                <Link
                  key={banner.id}
                  href={banner.link}
                  className={`block h-[600px] bg-gradient-to-b ${banner.cor} rounded-r-lg shadow-lg hover:shadow-xl transition-shadow p-4 text-white`}
                >
                  <span className="writing-mode-vertical-lr transform rotate-180 text-sm font-medium">
                    {banner.titulo}
                  </span>
                </Link>
              ))}
            </div>

            {/* Banner Lateral Direito */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20 w-[160px] space-y-4">
              {bannersLaterais.slice(2, 4).map((banner) => (
                <Link
                  key={banner.id}
                  href={banner.link}
                  className={`block h-[600px] bg-gradient-to-b ${banner.cor} rounded-l-lg shadow-lg hover:shadow-xl transition-shadow p-4 text-white`}
                >
                  <span className="writing-mode-vertical-lr transform rotate-180 text-sm font-medium">
                    {banner.titulo}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Banners Horizontais - Visíveis apenas em telas médias */}
          <div className="hidden md:block xl:hidden">
            <div className="sticky top-0 z-20 w-full bg-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 py-2">
                <div className="grid grid-cols-4 gap-4">
                  {bannersLaterais.map((banner) => (
                    <Link
                      key={banner.id}
                      href={banner.link}
                      className={`block h-20 bg-gradient-to-r ${banner.cor} rounded-lg shadow hover:shadow-lg transition-shadow p-2 text-white flex items-center justify-center text-center`}
                    >
                      <span className="text-sm font-medium">{banner.titulo}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Banners Mobile - Visíveis apenas em telas pequenas */}
          <div className="block md:hidden">
            <div className="sticky top-0 z-20 w-full bg-white shadow-md">
              <div className="px-4 py-2">
                <div className="grid grid-cols-2 gap-2">
                  {bannersLaterais.map((banner) => (
                    <Link
                      key={banner.id}
                      href={banner.link}
                      className={`block h-16 bg-gradient-to-r ${banner.cor} rounded-lg shadow hover:shadow-lg transition-shadow p-2 text-white flex items-center justify-center text-center`}
                    >
                      <span className="text-xs font-medium">{banner.titulo}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 xl:px-[180px]">
            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  )
}

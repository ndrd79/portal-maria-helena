import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/navigation/navbar'
import Footer from '@/components/navigation/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portal Maria Helena - Notícias, Agronegócio e Serviços',
  description: 'O principal portal de notícias de Maria Helena-PR. Encontre informações sobre agronegócio, feira local, cotações, previsão do tempo e muito mais.',
  keywords: 'Maria Helena, Paraná, notícias, agronegócio, feira local, cotações, previsão do tempo',
  authors: [{ name: 'Portal Maria Helena' }],
  creator: 'Portal Maria Helena',
  publisher: 'Portal Maria Helena',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Portal Maria Helena - Notícias, Agronegócio e Serviços',
    description: 'O principal portal de notícias de Maria Helena-PR. Encontre informações sobre agronegócio, feira local, cotações, previsão do tempo e muito mais.',
    url: 'https://portalmariahena.com.br',
    siteName: 'Portal Maria Helena',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal Maria Helena - Notícias, Agronegócio e Serviços',
    description: 'O principal portal de notícias de Maria Helena-PR. Encontre informações sobre agronegócio, feira local, cotações, previsão do tempo e muito mais.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Array de banners laterais
const bannersLaterais = [
  {
    id: 1,
    empresa: 'Empresa Premium',
    descricao: 'Soluções empresariais',
    imagem: '/banner1.jpg',
  },
  {
    id: 2,
    empresa: 'Consultoria Empresarial',
    descricao: 'Especialistas em gestão',
    imagem: '/banner2.jpg',
  },
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
          
          {/* Wide Skyscraper Banners - Desktop Only */}
          <div className="hidden xl:block">
            {/* Left Skyscraper */}
            <div className="fixed left-2 top-1/2 -translate-y-1/2 z-20">
              <div className="bg-white rounded shadow-sm border border-slate-200 w-[120px] h-[400px] overflow-hidden">
                <div className="text-[10px] text-slate-500 px-2 py-1 border-b border-slate-100">
                  Publicidade
                </div>
                <div className="w-full h-[380px] bg-slate-50 flex items-center justify-center">
                  <span className="text-slate-400 text-sm">120 x 400</span>
                </div>
              </div>
            </div>

            {/* Right Skyscraper */}
            <div className="fixed right-2 top-1/2 -translate-y-1/2 z-20">
              <div className="bg-white rounded shadow-sm border border-slate-200 w-[120px] h-[400px] overflow-hidden">
                <div className="text-[10px] text-slate-500 px-2 py-1 border-b border-slate-100">
                  Publicidade
                </div>
                <div className="w-full h-[380px] bg-slate-50 flex items-center justify-center">
                  <span className="text-slate-400 text-sm">120 x 400</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Rectangle - Tablet */}
          <div className="hidden md:block xl:hidden">
            <div className="sticky top-0 z-20 bg-white border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center">
                <div className="bg-white rounded shadow-sm border border-slate-200 w-[300px] h-[250px] overflow-hidden">
                  <div className="text-[10px] text-slate-500 px-2 py-1 border-b border-slate-100">
                    Publicidade
                  </div>
                  <div className="w-full h-[230px] bg-slate-50 flex items-center justify-center">
                    <span className="text-slate-400 text-sm">300 x 250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small Banner - Mobile */}
          <div className="block md:hidden">
            <div className="sticky top-[64px] z-20 bg-white border-b border-slate-100">
              <div className="px-4 py-2">
                <div className="bg-white rounded shadow-sm border border-slate-200 h-[100px] overflow-hidden">
                  <div className="text-[10px] text-slate-500 px-2 py-1 border-b border-slate-100">
                    Publicidade
                  </div>
                  <div className="w-full h-[80px] bg-slate-50 flex items-center justify-center">
                    <span className="text-slate-400 text-sm">320 x 100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 xl:px-[140px]">
            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  )
}

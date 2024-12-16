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
    empresa: 'Empresa Premium',
    descricao: 'Soluções empresariais',
    cor: 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200',
    textoCor: 'text-slate-800',
  },
  {
    id: 2,
    empresa: 'Consultoria Empresarial',
    descricao: 'Especialistas em gestão',
    cor: 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200',
    textoCor: 'text-slate-800',
  },
  {
    id: 3,
    empresa: 'Serviços Financeiros',
    descricao: 'Soluções personalizadas',
    cor: 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200',
    textoCor: 'text-slate-800',
  },
  {
    id: 4,
    empresa: 'Assessoria Contábil',
    descricao: 'Expertise em contabilidade',
    cor: 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200',
    textoCor: 'text-slate-800',
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
            <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 w-[200px] space-y-4">
              {bannersLaterais.slice(0, 2).map((banner) => (
                <Link
                  key={banner.id}
                  href="#"
                  className={`block h-[300px] ${banner.cor} rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden group`}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className={`font-semibold mb-2 ${banner.textoCor} group-hover:text-blue-600 transition-colors`}>
                        {banner.empresa}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {banner.descricao}
                      </p>
                    </div>
                    <div className="text-sm text-blue-600 group-hover:translate-x-2 transition-transform">
                      Saiba mais →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Banner Lateral Direito */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 w-[200px] space-y-4">
              {bannersLaterais.slice(2, 4).map((banner) => (
                <Link
                  key={banner.id}
                  href="#"
                  className={`block h-[300px] ${banner.cor} rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden group`}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className={`font-semibold mb-2 ${banner.textoCor} group-hover:text-blue-600 transition-colors`}>
                        {banner.empresa}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {banner.descricao}
                      </p>
                    </div>
                    <div className="text-sm text-blue-600 group-hover:translate-x-2 transition-transform">
                      Saiba mais →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Banners Horizontais - Visíveis apenas em telas médias */}
          <div className="hidden md:block xl:hidden">
            <div className="bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid grid-cols-4 gap-4">
                  {bannersLaterais.map((banner) => (
                    <Link
                      key={banner.id}
                      href="#"
                      className={`${banner.cor} rounded-lg p-4 hover:shadow-md transition-all duration-300 group`}
                    >
                      <h3 className={`font-medium text-sm ${banner.textoCor} group-hover:text-blue-600 transition-colors`}>
                        {banner.empresa}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Banners Mobile - Visíveis apenas em telas pequenas */}
          <div className="block md:hidden">
            <div className="bg-white border-b border-slate-200">
              <div className="px-4 py-3">
                <div className="grid grid-cols-2 gap-3">
                  {bannersLaterais.map((banner) => (
                    <Link
                      key={banner.id}
                      href="#"
                      className={`${banner.cor} rounded-lg p-3 hover:shadow-md transition-all duration-300 group`}
                    >
                      <h3 className={`font-medium text-xs ${banner.textoCor} group-hover:text-blue-600 transition-colors`}>
                        {banner.empresa}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 xl:px-[220px]">
            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  )
}

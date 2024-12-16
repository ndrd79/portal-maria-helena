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
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}

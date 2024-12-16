import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/layout/Layout'
import Navbar from '@/components/navigation/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portal Maria Helena',
  description: 'Portal de serviços contábeis da Maria Helena Contabilidade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}

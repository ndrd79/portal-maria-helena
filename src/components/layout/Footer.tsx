'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Sobre o Portal</h3>
            <p className="text-gray-300 text-sm">
              O Portal Maria Helena é uma plataforma dedicada a conectar empresas e clientes,
              fornecendo informações atualizadas e relevantes para a comunidade.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/empresas" className="text-gray-300 hover:text-white text-sm">
                  Empresas
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-gray-300 hover:text-white text-sm">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white text-sm">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white text-sm">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                contato@portalmh.com.br
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Portal Maria Helena. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

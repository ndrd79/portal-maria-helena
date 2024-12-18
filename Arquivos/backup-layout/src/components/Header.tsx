'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setIsLoggedIn(!!session)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            Portal Maria Helena
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Início
            </Link>
            <Link href="/empresas" className="text-gray-600 hover:text-blue-600">
              Empresas
            </Link>
            <Link href="/noticias" className="text-gray-600 hover:text-blue-600">
              Notícias
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              href="/"
              className="block text-gray-600 hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/empresas"
              className="block text-gray-600 hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Empresas
            </Link>
            <Link
              href="/noticias"
              className="block text-gray-600 hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Notícias
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block text-gray-600 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-600 hover:text-blue-600 py-2"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

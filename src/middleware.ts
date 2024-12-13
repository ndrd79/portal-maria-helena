import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    console.log('Middleware - URL:', req.nextUrl.pathname)
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    console.log('Middleware - Sessão:', !!session)

    // Se estiver na página de login e tiver sessão, redireciona para o dashboard
    if (session && req.nextUrl.pathname === '/login') {
      console.log('Middleware - Usuário logado tentando acessar login, redirecionando...')
      const redirectUrl = new URL('/admin/dashboard', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Se não houver sessão e a rota requer autenticação
    if (!session && (
      req.nextUrl.pathname.startsWith('/admin') ||
      req.nextUrl.pathname.startsWith('/comerciante') ||
      req.nextUrl.pathname.startsWith('/dashboard')
    )) {
      // Não redirecionar se for a página de registro de admin
      if (req.nextUrl.pathname === '/admin/register') {
        console.log('Middleware - Permitindo acesso à página de registro')
        return res
      }

      console.log('Middleware - Usuário não autenticado, redirecionando para login')
      const redirectUrl = new URL('/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    console.log('Middleware - Permitindo acesso à rota:', req.nextUrl.pathname)
    return res
  } catch (error) {
    console.error('Middleware - Erro:', error)
    return NextResponse.next()
  }
}

// Removendo middleware temporariamente para debug
export const config = {
  matcher: [],
}

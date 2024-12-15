import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/config/routes'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname

  // Se o usuário não estiver autenticado e tentar acessar uma rota protegida
  if (!session && !publicRoutes.includes(path)) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(redirectUrl)
  }

  // Se o usuário estiver autenticado e tentar acessar uma rota de auth
  if (session && authRoutes.includes(path)) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = DEFAULT_LOGIN_REDIRECT
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PermissionService } from './services/permission.service';

// Configurar rotas protegidas
const protectedRoutes = {
  '/dashboard': ['read:dashboard'],
  '/dashboard/comercios': ['read:comercios'],
  '/dashboard/produtos': ['read:produtos'],
  '/dashboard/noticias': ['read:noticias'],
  '/dashboard/anuncios': ['read:anuncios'],
  '/dashboard/usuarios': ['read:usuarios'],
};

// Configurar rotas admin
const adminRoutes = [
  '/dashboard/usuarios',
  '/dashboard/configuracoes'
];

export const config = {
  matcher: ['/dashboard/:path*']
};

export async function middleware(request: NextRequest) {
  try {
    // Criar cliente Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Verificar sessão
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Pegar permissões do usuário
    const permissionService = PermissionService.getInstance();
    const permissions = await permissionService.getUserPermissions(session.user.id);

    if (!permissions) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verificar permissões da rota
    const path = request.nextUrl.pathname;
    const requiredPermissions = protectedRoutes[path as keyof typeof protectedRoutes];

    if (requiredPermissions) {
      const hasPermission = await Promise.all(
        requiredPermissions.map(permission =>
          permissionService.hasPermission(session.user.id, permission)
        )
      );

      if (!hasPermission.every(Boolean)) {
        return NextResponse.redirect(new URL('/acesso-negado', request.url));
      }
    }

    // Verificar rotas admin
    if (adminRoutes.includes(path)) {
      const isAdmin = await permissionService.hasPermission(session.user.id, 'manage:usuarios');
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/acesso-negado', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Erro no middleware:', error);
    return NextResponse.redirect(new URL('/erro', request.url));
  }
}

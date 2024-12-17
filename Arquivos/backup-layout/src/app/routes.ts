/**
 * Rotas que requerem autenticação
 */
export const protectedRoutes = ['/dashboard', '/admin']

/**
 * Rotas que só podem ser acessadas quando não autenticado
 */
export const authRoutes = ['/login', '/register']

/**
 * Rota padrão após o login
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

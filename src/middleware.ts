import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Desativando middleware temporariamente
export async function middleware(req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: []
}

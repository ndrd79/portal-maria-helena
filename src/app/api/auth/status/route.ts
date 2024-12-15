import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    return NextResponse.json({ 
      authenticated: !!session,
      user: session?.user || null
    })
  } catch (error) {
    console.error('Erro ao verificar status da autenticação:', error)
    return NextResponse.json({ 
      error: 'Erro ao verificar autenticação' 
    }, { status: 500 })
  }
}

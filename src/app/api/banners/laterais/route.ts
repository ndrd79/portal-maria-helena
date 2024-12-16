import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  const { data: banners, error } = await supabase
    .from('banners_laterais')
    .select('*')
    .eq('status', true)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(banners)
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const data = await request.json()

  const { error } = await supabase
    .from('banners_laterais')
    .insert(data)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Banner criado com sucesso' })
}

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const data = await request.json()
  const { id, ...updates } = data

  const { error } = await supabase
    .from('banners_laterais')
    .update(updates)
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Banner atualizado com sucesso' })
}

export async function DELETE(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 })
  }

  const { error } = await supabase
    .from('banners_laterais')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Banner excluído com sucesso' })
}

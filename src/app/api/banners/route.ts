import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET - Lista todos os banners ativos
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: banners, error } = await supabase
      .from('banners')
      .select('*')
      .eq('status', true)
      .gte('data_inicio', new Date().toISOString())
      .or(`data_fim.is.null,data_fim.gt.${new Date().toISOString()}`)
      .order('ordem', { ascending: true })

    if (error) throw error

    return NextResponse.json(banners)
  } catch (error) {
    console.error('Erro ao buscar banners:', error)
    return NextResponse.json({ error: 'Erro ao buscar banners' }, { status: 500 })
  }
}

// POST - Cria um novo banner
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()

    const { data, error } = await supabase
      .from('banners')
      .insert([json])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao criar banner:', error)
    return NextResponse.json({ error: 'Erro ao criar banner' }, { status: 500 })
  }
}

// PUT - Atualiza um banner existente
export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()
    const { id, ...updates } = json

    const { data, error } = await supabase
      .from('banners')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao atualizar banner:', error)
    return NextResponse.json({ error: 'Erro ao atualizar banner' }, { status: 500 })
  }
}

// DELETE - Remove um banner
export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 })
    }

    const { error } = await supabase
      .from('banners')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar banner:', error)
    return NextResponse.json({ error: 'Erro ao deletar banner' }, { status: 500 })
  }
}

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET - Lista todos os banners ativos
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const posicao = searchParams.get('posicao')
  const tipo = searchParams.get('tipo')

  const supabase = createRouteHandlerClient({ cookies })
  let query = supabase
    .from('banners')
    .select('*')
    .eq('status', true)

  if (posicao) {
    query = query.eq('posicao', posicao)
  }

  if (tipo) {
    query = query.eq('tipo', tipo)
  }

  const { data: banners, error } = await query.order('ordem', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(banners)
}

// POST - Cria um novo banner
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const data = await request.json()

  // Valida o tipo e posição do banner
  if (!['quadrado', 'retangular-horizontal', 'retangular-vertical'].includes(data.tipo)) {
    return NextResponse.json({ error: 'Tipo de banner inválido' }, { status: 400 })
  }

  if (!['topo', 'meio', 'rodape'].includes(data.posicao)) {
    return NextResponse.json({ error: 'Posição de banner inválida' }, { status: 400 })
  }

  const { error } = await supabase
    .from('banners')
    .insert(data)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Banner criado com sucesso' })
}

// PUT - Atualiza um banner existente
export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const data = await request.json()
  const { id, ...updates } = data

  // Valida o tipo e posição do banner se estiverem sendo atualizados
  if (updates.tipo && !['quadrado', 'retangular-horizontal', 'retangular-vertical'].includes(updates.tipo)) {
    return NextResponse.json({ error: 'Tipo de banner inválido' }, { status: 400 })
  }

  if (updates.posicao && !['topo', 'meio', 'rodape'].includes(updates.posicao)) {
    return NextResponse.json({ error: 'Posição de banner inválida' }, { status: 400 })
  }

  const { error } = await supabase
    .from('banners')
    .update(updates)
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Banner atualizado com sucesso' })
}

// DELETE - Remove um banner
export async function DELETE(request: Request) {
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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Banner excluído com sucesso' })
}

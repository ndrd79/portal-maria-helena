import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    const width = parseInt(formData.get('width') as string)
    const height = parseInt(formData.get('height') as string)
    const quality = parseInt(formData.get('quality') as string) || 80

    if (!file || !width || !height) {
      return NextResponse.json(
        { error: 'Imagem, largura e altura são obrigatórios' },
        { status: 400 }
      )
    }

    // Converte o File para Buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Otimiza a imagem
    const optimizedImage = await sharp(buffer)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality,
        effort: 6
      })
      .toBuffer()

    // Retorna a imagem otimizada como Buffer
    return new NextResponse(optimizedImage, {
      headers: {
        'Content-Type': 'image/webp',
        'Content-Length': optimizedImage.length.toString()
      }
    })
  } catch (error) {
    console.error('Erro ao otimizar imagem:', error)
    return NextResponse.json(
      { error: 'Erro ao otimizar imagem' },
      { status: 500 }
    )
  }
}

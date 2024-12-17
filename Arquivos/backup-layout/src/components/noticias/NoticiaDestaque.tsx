'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Noticia } from '@/types/noticia'

interface NoticiaDestaqueProps {
  noticia: Noticia
}

export default function NoticiaDestaque({ noticia }: NoticiaDestaqueProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="aspect-[16/9] relative bg-slate-100">
        {noticia.imagem && (
          <Image
            src={noticia.imagem}
            alt={noticia.imagem_alt || noticia.titulo}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4 capitalize">
          {noticia.categoria}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          <Link href={`/noticias/${noticia.slug}`} className="hover:text-blue-600">
            {noticia.titulo}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">
          {noticia.resumo}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(noticia.data_publicacao).toLocaleDateString()}
          </span>
          <Link 
            href={`/noticias/${noticia.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    </div>
  )
}

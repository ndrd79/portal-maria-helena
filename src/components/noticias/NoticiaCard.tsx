'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Noticia } from '@/types/noticia'

interface NoticiaCardProps {
  noticia: Noticia
  compact?: boolean
}

export default function NoticiaCard({ noticia, compact = false }: NoticiaCardProps) {
  if (compact) {
    return (
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0 relative overflow-hidden">
          {noticia.imagem && (
            <Image
              src={noticia.imagem}
              alt={noticia.imagem_alt || noticia.titulo}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div>
          <span className="text-sm text-gray-500">
            {new Date(noticia.data_publicacao).toLocaleDateString()}
          </span>
          <h4 className="text-base font-medium text-gray-900 mt-1 hover:text-blue-600">
            <Link href={`/noticias/${noticia.slug}`}>
              {noticia.titulo}
            </Link>
          </h4>
        </div>
      </div>
    )
  }

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
      <div className="p-4">
        <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3 capitalize">
          {noticia.categoria}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          <Link href={`/noticias/${noticia.slug}`} className="hover:text-blue-600">
            {noticia.titulo}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {noticia.resumo}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(noticia.data_publicacao).toLocaleDateString()}
          </span>
          <Link
            href={`/noticias/${noticia.slug}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    </div>
  )
}

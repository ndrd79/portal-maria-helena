'use client'

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface ImageUploadProps {
  onUpload: (url: string) => void
  width: number
  height: number
}

export default function ImageUpload({ onUpload, width, height }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState<string | null>(null)
  const [optimizedSize, setOptimizedSize] = useState<string | null>(null)

  // Formata o tamanho do arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null)
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você precisa selecionar uma imagem para fazer upload')
      }

      const file = event.target.files[0]
      setOriginalSize(formatFileSize(file.size))

      // Cria FormData para enviar a imagem
      const formData = new FormData()
      formData.append('image', file)
      formData.append('width', width.toString())
      formData.append('height', height.toString())
      formData.append('quality', '80')

      // Otimiza a imagem
      const optimizeResponse = await fetch('/api/optimize-image', {
        method: 'POST',
        body: formData
      })

      if (!optimizeResponse.ok) {
        throw new Error('Erro ao otimizar imagem')
      }

      // Pega a imagem otimizada como Blob
      const optimizedBlob = await optimizeResponse.blob()
      setOptimizedSize(formatFileSize(optimizedBlob.size))

      // Cria URL para preview
      const objectUrl = URL.createObjectURL(optimizedBlob)
      setPreview(objectUrl)

      // Faz upload para o Supabase
      const supabase = createClientComponentClient()
      const fileName = `${Math.random()}${Date.now()}.webp`
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, optimizedBlob, {
          contentType: 'image/webp'
        })

      if (uploadError) {
        throw uploadError
      }

      // Pega a URL pública da imagem
      const { data: { publicUrl } } = await supabase.storage
        .from('images')
        .getPublicUrl(data.path)

      onUpload(publicUrl)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {preview && (
        <div className="mb-4">
          <div className="relative" style={{ width, height }}>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {originalSize && optimizedSize && (
            <div className="mt-2 text-sm text-gray-500">
              <p>Tamanho original: {originalSize}</p>
              <p>Tamanho otimizado: {optimizedSize}</p>
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block">
          <span className="sr-only">Escolher imagem</span>
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </label>

        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {uploading && (
          <div className="mt-2 text-sm text-gray-500">
            Otimizando e enviando imagem...
          </div>
        )}
      </div>
    </div>
  )
}

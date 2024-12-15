'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { EmpresaFormData } from '@/types/empresa'
import { useRouter } from 'next/navigation'

export default function CadastroEmpresa() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      const empresaData: Partial<EmpresaFormData> = {
        nome: formData.get('nome') as string,
        descricao: formData.get('descricao') as string,
        categoria: formData.get('categoria') as string,
        endereco: formData.get('endereco') as string,
        cidade: formData.get('cidade') as string,
        estado: formData.get('estado') as string,
        cep: formData.get('cep') as string,
        telefone: formData.get('telefone') as string,
        email: formData.get('email') as string,
        website: formData.get('website') as string,
        horario_funcionamento: formData.get('horario_funcionamento') as string,
      }

      // Obter usuário atual
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Usuário não autenticado')
      }

      // Upload do logo
      const logo = formData.get('logo') as File
      let logo_url = null
      if (logo && logo.size > 0) {
        const { data: logoData, error: logoError } = await supabase.storage
          .from('empresas')
          .upload(`${session.user.id}/${Date.now()}_logo`, logo)

        if (logoError) throw logoError
        logo_url = logoData.path
      }

      // Upload das fotos
      const fotosInput = e.currentTarget.querySelector('input[name="fotos"]') as HTMLInputElement
      const fotos = fotosInput?.files
      const fotos_urls = []
      
      if (fotos && fotos.length > 0) {
        for (let i = 0; i < fotos.length; i++) {
          const foto = fotos[i]
          const { data: fotoData, error: fotoError } = await supabase.storage
            .from('empresas')
            .upload(`${session.user.id}/${Date.now()}_foto_${i}`, foto)

          if (fotoError) throw fotoError
          fotos_urls.push(fotoData.path)
        }
      }

      // Inserir empresa no banco
      const { error: insertError } = await supabase
        .from('empresas')
        .insert([
          {
            ...empresaData,
            logo_url,
            fotos_urls,
            user_id: session.user.id
          }
        ])

      if (insertError) throw insertError

      // Redirecionar para a lista de empresas
      router.push('/empresas')
    } catch (err) {
      console.error('Erro ao cadastrar empresa:', err)
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar empresa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Cadastrar Nova Empresa</h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Informações Básicas</h2>
            
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome da Empresa *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <input
                type="text"
                id="categoria"
                name="categoria"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Endereço</h2>
            
            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                  Cidade
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                CEP
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contato</h2>
            
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <label htmlFor="horario_funcionamento" className="block text-sm font-medium text-gray-700">
              Horário de Funcionamento
            </label>
            <input
              type="text"
              id="horario_funcionamento"
              name="horario_funcionamento"
              placeholder="Ex: Segunda a Sexta, 9h às 18h"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Imagens */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Imagens</h2>
            
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Logo da Empresa
              </label>
              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label htmlFor="fotos" className="block text-sm font-medium text-gray-700">
                Fotos da Empresa
              </label>
              <input
                type="file"
                id="fotos"
                name="fotos"
                accept="image/*"
                multiple
                className="mt-1 block w-full"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

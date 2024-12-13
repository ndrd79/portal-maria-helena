'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Alert } from '@/components/Alert'

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      console.log('Tentando fazer login...', { email })

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Erro no login:', signInError)
        throw signInError
      }

      if (!signInData.user) {
        console.error('Usuário não encontrado após login')
        throw new Error('Usuário não encontrado')
      }

      console.log('Login bem sucedido, buscando perfil do usuário...')

      // Verificar se o usuário existe na tabela usuarios e está ativo
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', signInData.user.id)
        .single()

      if (userError) {
        console.error('Erro ao buscar usuário:', userError)
        throw userError
      }

      if (!userData) {
        console.error('Perfil de usuário não encontrado')
        throw new Error('Perfil de usuário não encontrado')
      }

      if (userData.status !== 'ativo') {
        console.error('Usuário inativo')
        throw new Error('Usuário inativo. Entre em contato com o administrador.')
      }

      console.log('Perfil encontrado, redirecionando...', { tipo: userData.tipo })

      // Redirecionar baseado no tipo de usuário
      switch (userData.tipo) {
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'comerciante':
          router.push('/comerciante/dashboard')
          break
        default:
          router.push('/dashboard')
      }
    } catch (err) {
      console.error('Erro completo:', err)
      if (err instanceof Error) {
        if (err.message.includes('Invalid login credentials')) {
          setError('Email ou senha incorretos')
        } else {
          setError(err.message)
        }
      } else {
        setError('Erro ao fazer login')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>
                
                {error && <Alert type="error" message={error} />}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

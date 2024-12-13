'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Alert } from '@/components/Alert'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const form = e.currentTarget
      const emailInput = form.querySelector<HTMLInputElement>('input[type="email"]')
      const passwordInput = form.querySelector<HTMLInputElement>('input[type="password"]')

      if (!emailInput || !passwordInput) {
        console.error('Campos de formulário não encontrados')
        throw new Error('Erro interno do formulário')
      }

      const email = emailInput.value
      const password = passwordInput.value

      console.log('Iniciando processo de login...')
      console.log('Email:', email)
      console.log('Senha disponível:', !!password)

      // Verificar se os campos estão preenchidos
      if (!email || !password) {
        throw new Error('Por favor, preencha todos os campos')
      }

      // Tentar fazer login
      console.log('Chamando Supabase auth.signInWithPassword...')
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Erro no login:', signInError)
        throw signInError
      }

      if (!data.user) {
        console.error('Login bem sucedido mas usuário não encontrado')
        throw new Error('Usuário não encontrado')
      }

      console.log('Login bem sucedido!')
      console.log('Usuário:', data.user)
      console.log('Sessão:', data.session)
      
      // Redirecionar para a página de redirecionamento
      console.log('Redirecionando para /auth/redirect...')
      window.location.href = '/auth/redirect'

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

  const handleClick = () => {
    console.log('Botão clicado')
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
                    onClick={handleClick}
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

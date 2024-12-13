'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Alert } from '@/components/Alert'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<{[key: string]: string}>({})

  useEffect(() => {
    // Mostrar variáveis de ambiente públicas
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'não definido',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'não definido',
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      console.log('Iniciando login...')
      console.log('Variáveis de ambiente:', envVars)

      // Verificar se já existe uma sessão
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      if (currentSession) {
        console.log('Já existe uma sessão, fazendo logout primeiro...')
        await supabase.auth.signOut()
      }

      // Tentar fazer login
      console.log('Tentando fazer login...')
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

      console.log('Login bem sucedido, verificando tipo do usuário...')

      // Verificar tipo do usuário
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('tipo')
        .eq('id', data.user.id)
        .single()

      if (userError) {
        console.error('Erro ao buscar tipo do usuário:', userError)
        throw userError
      }

      if (!userData) {
        console.error('Usuário não encontrado na tabela usuarios')
        throw new Error('Perfil não encontrado')
      }

      console.log('Tipo do usuário:', userData.tipo)

      // Redirecionar baseado no tipo
      const baseUrl = window.location.origin
      const redirectTo = userData.tipo === 'admin' 
        ? '/admin/dashboard'
        : userData.tipo === 'comerciante'
          ? '/comerciante/dashboard'
          : '/dashboard'

      console.log('Redirecionando para:', baseUrl + redirectTo)
      window.location.href = baseUrl + redirectTo

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

                {/* Debug de variáveis de ambiente */}
                <div className="bg-gray-100 p-4 rounded-md text-sm mb-4">
                  <h2 className="font-bold mb-2">Debug:</h2>
                  {Object.entries(envVars).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {value}
                    </div>
                  ))}
                </div>

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

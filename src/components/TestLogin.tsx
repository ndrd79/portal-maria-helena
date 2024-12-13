'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function TestLogin() {
  const [message, setMessage] = useState('')

  const handleTest = async () => {
    try {
      setMessage('Iniciando teste...')

      // Criar cliente Supabase diretamente
      const supabase = createClient(
        'https://mqyuspqsvcxvfqbmzhch.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeXVzcHFzdmN4dmZxYm16aGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwOTE5OTMsImV4cCI6MjA0OTY2Nzk5M30.R-_esL_-qAXgyrH2TbKVVn4q8auH3egNAX_Tg-glBpE'
      )

      setMessage('Cliente Supabase criado')

      // Teste 1: Verificar sessão
      const { data: sessionData } = await supabase.auth.getSession()
      setMessage('Sessão atual: ' + (sessionData.session ? 'Ativa' : 'Inativa'))

      // Teste 2: Tentar login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'ndrd7980@gmail.com',
        password: 'admin123',
      })

      if (error) {
        setMessage('Erro no login: ' + error.message)
        console.error('Detalhes do erro:', error)
      } else {
        setMessage('Login bem sucedido! Usuário: ' + data.user?.email)
        console.log('Dados do usuário:', data.user)
        
        // Verificar se existe na tabela usuarios
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', data.user?.id)
          .single()
        
        if (userError) {
          console.error('Erro ao buscar usuário na tabela:', userError)
          setMessage(message + '\nErro ao buscar na tabela usuarios: ' + userError.message)
        } else if (!userData) {
          console.log('Usuário não encontrado na tabela usuarios')
          setMessage(message + '\nUsuário não encontrado na tabela usuarios')
        } else {
          console.log('Dados do usuário na tabela:', userData)
          setMessage(message + '\nTipo do usuário: ' + userData.tipo)
        }
      }

    } catch (err) {
      setMessage('Erro: ' + (err instanceof Error ? err.message : 'Erro desconhecido'))
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Teste de Login</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">{message}</p>
      </div>

      <button
        onClick={handleTest}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Testar Login
      </button>
    </div>
  )
}

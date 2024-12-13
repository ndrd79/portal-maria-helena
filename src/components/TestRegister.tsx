'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function TestRegister() {
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    try {
      setMessage('Iniciando registro...')

      // Criar cliente Supabase diretamente
      const supabase = createClient(
        'https://mqyuspqsvcxvfqbmzhch.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeXVzcHFzdmN4dmZxYm16aGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwOTE5OTMsImV4cCI6MjA0OTY2Nzk5M30.R-_esL_-qAXgyrH2TbKVVn4q8auH3egNAX_Tg-glBpE'
      )

      // Registrar usuário
      const { data, error } = await supabase.auth.signUp({
        email: 'ndrd7980@gmail.com',
        password: 'admin123',
      })

      if (error) {
        console.error('Erro no registro:', error)
        setMessage('Erro no registro: ' + error.message)
        return
      }

      console.log('Registro bem sucedido:', data)
      setMessage('Registro bem sucedido! Verifique seu email.')

      // Se o registro foi bem sucedido, criar entrada na tabela usuarios
      if (data.user) {
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              nome: 'Fernando',
              tipo: 'admin',
              status: 'ativo'
            }
          ])

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
          setMessage(message + '\nErro ao criar perfil: ' + profileError.message)
        } else {
          setMessage(message + '\nPerfil criado com sucesso!')
        }
      }

    } catch (err) {
      console.error('Erro:', err)
      setMessage('Erro: ' + (err instanceof Error ? err.message : 'Erro desconhecido'))
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Teste de Registro</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 whitespace-pre-line">{message}</p>
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Registrar Usuário
      </button>
    </div>
  )
}

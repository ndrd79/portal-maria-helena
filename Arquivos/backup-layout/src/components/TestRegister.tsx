'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestRegister() {
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    try {
      setMessage('Iniciando registro...')

      // Usar a instância global do Supabase
      const { data, error } = await supabase.auth.signUp({
        email: 'ndrd7980@gmail.com',
        password: 'admin123',
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            nome: 'Fernando',
            tipo: 'admin'
          }
        }
      })

      if (error) {
        console.error('Erro no registro:', error)
        setMessage('Erro no registro: ' + error.message)
        return
      }

      console.log('Registro bem sucedido:', data)
      console.log('ID do usuário:', data.user?.id)
      console.log('Email do usuário:', data.user?.email)
      console.log('Email confirmado?', data.user?.email_confirmed_at)
      console.log('Último login:', data.user?.last_sign_in_at)
      
      setMessage('Registro bem sucedido! ID: ' + data.user?.id)

      // Se o registro foi bem sucedido, criar entrada na tabela usuarios
      if (data.user) {
        try {
          // Primeiro, tentar deletar qualquer usuário existente com este email
          const { error: deleteError } = await supabase
            .from('usuarios')
            .delete()
            .eq('email', data.user.email)

          if (deleteError) {
            console.error('Erro ao deletar usuário existente:', deleteError)
          }

          // Agora, inserir o novo usuário
          const { error: insertError } = await supabase
            .from('usuarios')
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
                nome: 'Fernando',
                tipo: 'admin',
                created_at: new Date().toISOString()
              }
            ])

          if (insertError) {
            console.error('Erro ao inserir na tabela usuarios:', insertError)
            setMessage(message + '\nErro ao criar entrada na tabela usuarios: ' + insertError.message)
          } else {
            setMessage(message + '\nEntrada criada na tabela usuarios com sucesso!')
          }
        } catch (err) {
          console.error('Erro ao interagir com a tabela usuarios:', err)
          setMessage(message + '\nErro ao interagir com a tabela usuarios')
        }
      }

    } catch (err) {
      console.error('Erro geral:', err)
      setMessage('Erro geral no processo de registro')
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Teste de Registro</h2>
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Registrar Usuário de Teste
      </button>
      {message && (
        <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
          {message}
        </pre>
      )}
    </div>
  )
}

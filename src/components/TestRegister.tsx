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
      
      setMessage('Registro bem sucedido! Verifique seu email para confirmar o cadastro.\nID: ' + data.user?.id)

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
          } else {
            console.log('Usuário existente deletado ou não encontrado')
          }

          // Agora criar o novo usuário
          const { error: insertError } = await supabase
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

          if (insertError) {
            console.error('Erro ao criar perfil:', insertError)
            setMessage(message + '\nErro ao criar perfil: ' + insertError.message)
          } else {
            setMessage(message + '\nPerfil criado com sucesso!')
          }
        } catch (err) {
          console.error('Erro ao manipular perfil:', err)
          setMessage(message + '\nErro ao manipular perfil: ' + (err instanceof Error ? err.message : 'Erro desconhecido'))
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

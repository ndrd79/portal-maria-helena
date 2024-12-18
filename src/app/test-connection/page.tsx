'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Usuario } from '@/types/supabase'

export default function TestConnection() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<Usuario[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
        
        if (error) {
          throw error
        }

        setUsers(data || [])
      } catch (e) {
        console.error('Erro ao buscar usuários:', e)
        setError(e instanceof Error ? e.message : 'Erro ao buscar usuários')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teste de Conexão com Supabase</h1>
      
      {loading ? (
        <div className="text-blue-600">Carregando...</div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Erro na conexão:</p>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Conexão estabelecida com sucesso!</p>
            <p>O cliente Supabase está configurado corretamente.</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Usuários no Banco:</h2>
            {users.length === 0 ? (
              <p className="text-gray-600">Nenhum usuário cadastrado ainda.</p>
            ) : (
              <ul className="space-y-4">
                {users.map((user) => (
                  <li key={user.id} className="bg-white shadow rounded p-4">
                    <p className="font-semibold">{user.nome}</p>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      Tipo: {user.tipo} | Status: {user.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}

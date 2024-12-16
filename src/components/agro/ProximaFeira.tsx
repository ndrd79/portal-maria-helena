'use client'

import { Feira } from '@/types/agro'

interface ProximaFeiraProps {
  feira: Feira
}

export default function ProximaFeira({ feira }: ProximaFeiraProps) {
  const calcularDiasRestantes = () => {
    const hoje = new Date()
    const dataFeira = new Date(feira.data)
    const diffTime = Math.abs(dataFeira.getTime() - hoje.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="bg-yellow-50 rounded-lg p-4">
      <h3 className="font-semibold text-yellow-800 mb-2">Próxima Feira</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            {new Date(feira.data).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </p>
          <p className="text-sm text-gray-500">
            Das {feira.hora_inicio} às {feira.hora_fim}
          </p>
          {feira.local && (
            <p className="text-sm text-gray-500 mt-1">
              Local: {feira.local}
            </p>
          )}
        </div>
        <div className="text-center bg-white rounded-lg px-4 py-2">
          <span className="block text-2xl font-bold text-yellow-600">
            {calcularDiasRestantes()}
          </span>
          <span className="text-xs text-gray-500">dias</span>
        </div>
      </div>
      {feira.produtos && feira.produtos.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Produtos em Destaque
          </h4>
          <div className="flex flex-wrap gap-2">
            {feira.produtos.map((produto, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
              >
                {produto}
              </span>
            ))}
          </div>
        </div>
      )}
      {feira.descricao && (
        <p className="text-sm text-gray-600 mt-4">
          {feira.descricao}
        </p>
      )}
    </div>
  )
}

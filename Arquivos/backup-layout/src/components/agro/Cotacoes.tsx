'use client'

import { Cotacao } from '@/types/agro'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

interface CotacoesProps {
  cotacoes: Cotacao[]
}

export default function Cotacoes({ cotacoes }: CotacoesProps) {
  return (
    <div className="bg-green-50 rounded-lg p-4">
      <h3 className="font-semibold text-green-800 mb-2">Cotações do Dia</h3>
      <ul className="space-y-2 text-sm">
        {cotacoes.map((cotacao) => (
          <li key={cotacao.id} className="flex justify-between items-center">
            <span className="text-gray-600">
              {cotacao.produto} ({cotacao.unidade}):
            </span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">
                R$ {cotacao.preco.toFixed(2)}
              </span>
              {cotacao.variacao !== 0 && (
                <span className={`flex items-center text-xs ${
                  cotacao.variacao > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {cotacao.variacao > 0 ? (
                    <ArrowUpIcon className="w-3 h-3" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3" />
                  )}
                  {Math.abs(cotacao.variacao)}%
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="text-xs text-gray-500 mt-4">
        Fonte: {cotacoes[0]?.fonte}
        <br />
        Atualizado em: {new Date(cotacoes[0]?.data).toLocaleString()}
      </div>
    </div>
  )
}

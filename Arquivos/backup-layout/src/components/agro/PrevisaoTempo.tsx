'use client'

import { PrevisaoTempo as PrevisaoTempoType } from '@/types/agro'
import { 
  SunIcon, 
  CloudIcon,
  CloudArrowDownIcon,
  BoltIcon
} from '@heroicons/react/24/solid'

interface PrevisaoTempoProps {
  previsao: PrevisaoTempoType
}

const iconesPorCondicao: Record<string, React.ComponentType<any>> = {
  ensolarado: SunIcon,
  nublado: CloudIcon,
  chuvoso: CloudArrowDownIcon,
  tempestade: BoltIcon,
}

export default function PrevisaoTempo({ previsao }: PrevisaoTempoProps) {
  const Icone = iconesPorCondicao[previsao.condicao] || CloudIcon

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <h3 className="font-semibold text-blue-800 mb-2">Previsão do Tempo</h3>
      <div className="text-center">
        <Icone className="w-12 h-12 mx-auto text-blue-600 mb-2" />
        <div className="flex justify-center items-baseline space-x-2">
          <span className="text-3xl font-bold text-blue-600">
            {previsao.temperatura_max}°
          </span>
          <span className="text-lg text-blue-500">
            {previsao.temperatura_min}°
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1 capitalize">
          {previsao.condicao}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="block text-gray-500">Chuva</span>
            <span className="font-medium">{previsao.probabilidade_chuva}%</span>
          </div>
          <div>
            <span className="block text-gray-500">Precipitação</span>
            <span className="font-medium">{previsao.precipitacao}mm</span>
          </div>
          <div>
            <span className="block text-gray-500">Umidade</span>
            <span className="font-medium">{previsao.umidade}%</span>
          </div>
          <div>
            <span className="block text-gray-500">Vento</span>
            <span className="font-medium">{previsao.vento}km/h</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-4">
        Fonte: {previsao.fonte}
        <br />
        Atualizado em: {new Date(previsao.data).toLocaleString()}
      </div>
    </div>
  )
}

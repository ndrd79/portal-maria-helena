import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agronegócio | Portal Maria Helena',
  description: 'Informações sobre o agronegócio em Maria Helena-PR. Cotações, previsão do tempo, notícias e mais.',
}

export default function Agronegocio() {
  return (
    <main className="min-h-screen py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna da Esquerda - Cotações */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Cotações</h2>
            {/* Adicionar componente de cotações aqui */}
          </div>
        </div>

        {/* Coluna Central - Notícias */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Notícias do Agro</h2>
            {/* Adicionar componente de notícias aqui */}
          </div>
        </div>

        {/* Coluna da Direita - Banner e Previsão do Tempo */}
        <div className="lg:col-span-1">
          {/* Banner Publicitário */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="text-[10px] text-slate-500 mb-2">
              Publicidade
            </div>
            <div className="relative w-full h-[400px] bg-slate-50">
              <Image
                src="/banners/banner-agro.jpg"
                alt="Banner Agronegócio"
                fill
                className="object-cover rounded"
              />
            </div>
          </div>

          {/* Previsão do Tempo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Previsão do Tempo</h2>
            {/* Adicionar componente de previsão do tempo aqui */}
          </div>
        </div>
      </div>
    </main>
  )
}

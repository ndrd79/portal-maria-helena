import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Portal Maria Helena
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Soluções contábeis personalizadas para o sucesso do seu negócio
          </p>
          <Link
            href="/login"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Acessar Portal
          </Link>
        </div>
      </section>

      {/* Sobre Nós */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Sobre Nós
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Com mais de 20 anos de experiência, a Maria Helena Contabilidade 
                oferece serviços contábeis de excelência, combinando expertise 
                técnica com atendimento personalizado.
              </p>
              <p className="text-lg text-gray-700">
                Nossa missão é simplificar a gestão contábil do seu negócio, 
                permitindo que você foque no que realmente importa: o crescimento 
                da sua empresa.
              </p>
            </div>
            <div className="bg-gray-100 h-[400px] rounded-lg flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Serviços */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Contabilidade Empresarial',
                description: 'Serviços contábeis completos para empresas de todos os portes.'
              },
              {
                title: 'Consultoria Fiscal',
                description: 'Orientação especializada para otimização tributária e fiscal.'
              },
              {
                title: 'Departamento Pessoal',
                description: 'Gestão completa de folha de pagamento e obrigações trabalhistas.'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-700">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Últimas Notícias */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Últimas Notícias
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mudanças na Legislação Fiscal',
                date: '10 Dez 2023',
                description: 'Fique por dentro das últimas atualizações fiscais.'
              },
              {
                title: 'Prazo para Declaração',
                date: '05 Dez 2023',
                description: 'Confira os prazos importantes para este mês.'
              },
              {
                title: 'Dicas de Gestão Financeira',
                date: '01 Dez 2023',
                description: 'Aprenda a otimizar as finanças da sua empresa.'
              }
            ].map((news, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 h-48 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="p-6">
                  <p className="text-sm text-blue-600 mb-2">{news.date}</p>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {news.title}
                  </h3>
                  <p className="text-gray-700">{news.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8">
            Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer.
          </p>
          <Link
            href="/login"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg inline-block transition-colors"
          >
            Acessar Portal
          </Link>
        </div>
      </section>
    </main>
  )
}

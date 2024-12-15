import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <Image
          src="/images/maria-helena-hero.jpg"
          alt="Maria Helena Escritório"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Portal Maria Helena
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Soluções contábeis personalizadas para o sucesso do seu negócio
          </p>
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
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
            <div className="relative h-[400px]">
              <Image
                src="/images/maria-helena-about.jpg"
                alt="Equipe Maria Helena"
                fill
                className="object-cover rounded-lg"
              />
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
                <div className="relative h-48">
                  <Image
                    src="/images/news-placeholder.jpg"
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
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

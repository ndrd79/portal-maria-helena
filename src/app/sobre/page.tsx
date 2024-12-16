export default function SobrePage() {
  return (
    <main className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Sobre Nós</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* História */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Nossa História
            </h2>
            <p className="text-gray-700 mb-6">
              Com mais de 20 anos de experiência no mercado contábil, a Maria Helena
              Contabilidade tem se destacado pela excelência no atendimento e pela
              qualidade dos serviços prestados.
            </p>
            <p className="text-gray-700 mb-6">
              Fundada com o objetivo de oferecer soluções contábeis personalizadas,
              nossa empresa cresceu mantendo sempre o compromisso com a ética e a
              transparência em todas as relações com nossos clientes.
            </p>
          </div>

          {/* Missão, Visão e Valores */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Nossa Missão
              </h2>
              <p className="text-gray-700">
                Oferecer soluções contábeis de excelência, contribuindo para o
                sucesso e crescimento dos nossos clientes através de um atendimento
                personalizado e serviços de alta qualidade.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Nossa Visão
              </h2>
              <p className="text-gray-700">
                Ser referência em serviços contábeis na região, reconhecida pela
                excelência no atendimento e pela capacidade de contribuir para o
                desenvolvimento dos nossos clientes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Nossos Valores
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Ética e transparência</li>
                <li>Comprometimento com o cliente</li>
                <li>Excelência nos serviços</li>
                <li>Atualização constante</li>
                <li>Responsabilidade social</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Diferenciais */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Nossos Diferenciais
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Atendimento Personalizado
              </h3>
              <p className="text-gray-700">
                Cada cliente recebe atenção individualizada, com soluções
                adaptadas às suas necessidades específicas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Equipe Qualificada
              </h3>
              <p className="text-gray-700">
                Profissionais altamente capacitados e em constante atualização
                para oferecer o melhor serviço.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Tecnologia Avançada
              </h3>
              <p className="text-gray-700">
                Utilizamos as mais modernas ferramentas e sistemas para garantir
                eficiência e segurança.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

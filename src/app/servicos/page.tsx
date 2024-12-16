export default function ServicosPage() {
  return (
    <main className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Nossos Serviços</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contabilidade Empresarial */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Contabilidade Empresarial
            </h2>
            <p className="text-gray-700 mb-4">
              Oferecemos serviços contábeis completos para empresas de todos os portes,
              incluindo:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Escrituração contábil</li>
              <li>Balancetes mensais</li>
              <li>Demonstrações financeiras</li>
              <li>Análise de balanço</li>
              <li>Relatórios gerenciais</li>
            </ul>
          </div>

          {/* Consultoria Fiscal */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Consultoria Fiscal
            </h2>
            <p className="text-gray-700 mb-4">
              Orientação especializada para otimização tributária e fiscal,
              incluindo:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Planejamento tributário</li>
              <li>Apuração de impostos</li>
              <li>Obrigações acessórias</li>
              <li>Recuperação de impostos</li>
              <li>Consultoria em legislação fiscal</li>
            </ul>
          </div>

          {/* Departamento Pessoal */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Departamento Pessoal
            </h2>
            <p className="text-gray-700 mb-4">
              Gestão completa de folha de pagamento e obrigações trabalhistas,
              incluindo:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Folha de pagamento</li>
              <li>Admissão e demissão</li>
              <li>Férias e 13º salário</li>
              <li>E-Social</li>
              <li>RAIS e DIRF</li>
            </ul>
          </div>

          {/* Assessoria Empresarial */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Assessoria Empresarial
            </h2>
            <p className="text-gray-700 mb-4">
              Suporte completo para a gestão do seu negócio, incluindo:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Abertura de empresas</li>
              <li>Alterações contratuais</li>
              <li>Planejamento financeiro</li>
              <li>Análise de viabilidade</li>
              <li>Consultoria empresarial</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

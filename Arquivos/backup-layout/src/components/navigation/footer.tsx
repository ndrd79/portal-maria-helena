import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Grid principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="col-span-1">
            <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300">
              Maria Helena
            </Link>
            <p className="mt-4 text-gray-400">
              Soluções contábeis personalizadas para o sucesso do seu negócio.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicos" className="text-gray-400 hover:text-white">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white">
                  Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Nossos Serviços</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Contabilidade Empresarial</li>
              <li className="text-gray-400">Consultoria Fiscal</li>
              <li className="text-gray-400">Departamento Pessoal</li>
              <li className="text-gray-400">Assessoria Empresarial</li>
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Telefone:</span>
                (XX) XXXX-XXXX
              </li>
              <li className="text-gray-400">
                <span className="block">WhatsApp:</span>
                (XX) XXXXX-XXXX
              </li>
              <li className="text-gray-400">
                <span className="block">E-mail:</span>
                contato@mariahelena.com.br
              </li>
              <li className="text-gray-400">
                <span className="block">Endereço:</span>
                Rua Principal, 123
                <br />
                Centro, Cidade - Estado
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Maria Helena Contabilidade. Todos os direitos reservados.
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/politica-privacidade" 
                className="text-sm text-gray-400 hover:text-white"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

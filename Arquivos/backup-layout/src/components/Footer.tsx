export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Portal Maria Helena</h3>
            <p className="text-gray-300">
              Conectando empresas e oportunidades na região de Maria Helena.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Início
                </a>
              </li>
              <li>
                <a href="/empresas" className="text-gray-300 hover:text-white">
                  Empresas
                </a>
              </li>
              <li>
                <a href="/noticias" className="text-gray-300 hover:text-white">
                  Notícias
                </a>
              </li>
              <li>
                <a href="/contato" className="text-gray-300 hover:text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Maria Helena - PR</li>
              <li>contato@portalmh.com.br</li>
              <li>(44) XXXX-XXXX</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Portal Maria Helena. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

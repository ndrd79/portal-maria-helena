export default function ContatoPage() {
  return (
    <main className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Contato</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Informações de Contato
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Endereço
                </h3>
                <p className="text-gray-700">
                  Rua Principal, 123<br />
                  Centro, Cidade - Estado<br />
                  CEP: 12345-678
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Telefones
                </h3>
                <p className="text-gray-700">
                  (XX) XXXX-XXXX<br />
                  (XX) XXXXX-XXXX (WhatsApp)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  E-mail
                </h3>
                <p className="text-gray-700">
                  contato@mariahelena.com.br
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Horário de Atendimento
                </h3>
                <p className="text-gray-700">
                  Segunda a Sexta: 8h às 18h<br />
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Envie sua Mensagem
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

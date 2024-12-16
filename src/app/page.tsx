'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  // Array de empresas parceiras (exemplo)
  const parceiros = [
    { id: 1, nome: 'Empresa 1', logo: '/placeholder-logo.png' },
    { id: 2, nome: 'Empresa 2', logo: '/placeholder-logo.png' },
    { id: 3, nome: 'Empresa 3', logo: '/placeholder-logo.png' },
    { id: 4, nome: 'Empresa 4', logo: '/placeholder-logo.png' },
    { id: 5, nome: 'Empresa 5', logo: '/placeholder-logo.png' },
    { id: 6, nome: 'Empresa 6', logo: '/placeholder-logo.png' },
  ]

  // Array de banners premium (exemplo)
  const bannersPremium = [
    {
      id: 1,
      titulo: 'Super Oferta',
      empresa: 'Empresa Premium 1',
      descricao: 'Aproveite descontos exclusivos em todos os produtos',
      cor: 'from-blue-600 via-blue-700 to-blue-800'
    },
    {
      id: 2,
      titulo: 'Novidade',
      empresa: 'Empresa Premium 2',
      descricao: 'Conheça nossa nova linha de produtos',
      cor: 'from-purple-600 via-purple-700 to-purple-800'
    },
    {
      id: 3,
      titulo: 'Promoção Especial',
      empresa: 'Empresa Premium 3',
      descricao: 'Condições imperdíveis só neste mês',
      cor: 'from-green-600 via-green-700 to-green-800'
    }
  ]

  // Array de banners laterais
  const bannersLaterais = [
    {
      id: 1,
      titulo: 'Anúncio 1',
      cor: 'from-blue-400 to-blue-600',
      link: '/anuncio-1'
    },
    {
      id: 2,
      titulo: 'Anúncio 2',
      cor: 'from-purple-400 to-purple-600',
      link: '/anuncio-2'
    },
    {
      id: 3,
      titulo: 'Anúncio 3',
      cor: 'from-green-400 to-green-600',
      link: '/anuncio-3'
    },
    {
      id: 4,
      titulo: 'Anúncio 4',
      cor: 'from-red-400 to-red-600',
      link: '/anuncio-4'
    }
  ]

  // Estado para controlar o banner ativo
  const [bannerAtivo, setBannerAtivo] = useState(0)

  // Efeito para alternar os banners automaticamente
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerAtivo((atual) => (atual + 1) % bannersPremium.length)
    }, 5000) // Muda a cada 5 segundos

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Publicidade Superior */}
      <div className="w-full bg-white mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded shadow-sm border border-slate-200 h-[100px] overflow-hidden">
            <div className="text-[10px] text-slate-500 px-2 py-1 border-b border-slate-100">
              Publicidade
            </div>
            <div className="w-full h-[80px] bg-slate-50 flex items-center justify-center">
              <span className="text-slate-400 text-sm">320 x 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Carrossel de Banners Premium */}
      <section className="relative h-[300px]">
        {/* Banners */}
        <div className="relative h-full">
          {bannersPremium.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === bannerAtivo ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`h-full bg-gradient-to-r ${banner.cor} flex items-center justify-center`}>
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm mb-4 inline-block">
                    {banner.empresa}
                  </span>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    {banner.titulo}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">
                    {banner.descricao}
                  </p>
                  <Link
                    href="/contato"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-flex items-center"
                  >
                    Saiba Mais
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannersPremium.map((_, index) => (
            <button
              key={index}
              onClick={() => setBannerAtivo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === bannerAtivo ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Botões de navegação */}
        <button
          onClick={() => setBannerAtivo((atual) => (atual - 1 + bannersPremium.length) % bannersPremium.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
          aria-label="Banner anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setBannerAtivo((atual) => (atual + 1) % bannersPremium.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
          aria-label="Próximo banner"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Banner de Parceiros */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Nossos Parceiros
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Empresas que confiam em nossos serviços
            </p>
          </div>
          
          {/* Grade de logos dos parceiros */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {parceiros.map((parceiro) => (
              <div
                key={parceiro.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-24 bg-gray-50 rounded flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-gray-900">{parceiro.nome}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA para se tornar parceiro */}
          <div className="mt-12 text-center">
            <Link
              href="/contato"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Torne-se um Parceiro
            </Link>
          </div>
        </div>
      </section>

      {/* Banners Premium */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Banner Premium 1 */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-2">Destaque Premium</h3>
              <p className="text-sm mb-4">Espaço reservado para anunciantes premium</p>
              <div className="h-40 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white/60">Banner 728x90</span>
              </div>
            </div>
            {/* Banner Premium 2 */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-2">Destaque Premium</h3>
              <p className="text-sm mb-4">Espaço reservado para anunciantes premium</p>
              <div className="h-40 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white/60">Banner 728x90</span>
              </div>
            </div>
            {/* Banner Premium 3 */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold mb-2">Destaque Premium</h3>
              <p className="text-sm mb-4">Espaço reservado para anunciantes premium</p>
              <div className="h-40 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white/60">Banner 728x90</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classificados */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Classificados</h2>
            <p className="mt-4 text-lg text-gray-600">Oportunidades e anúncios selecionados</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Classificado 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-blue-100 relative">
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">DESTAQUE</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Título do Anúncio</h3>
                <p className="text-sm text-gray-600 mb-2">Descrição breve do anúncio ou classificado</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">R$ 0,00</span>
                  <button className="text-sm text-blue-600 hover:underline">Ver mais</button>
                </div>
              </div>
            </div>
            
            {/* Classificado 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-purple-100 relative">
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">DESTAQUE</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Título do Anúncio</h3>
                <p className="text-sm text-gray-600 mb-2">Descrição breve do anúncio ou classificado</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">R$ 0,00</span>
                  <button className="text-sm text-blue-600 hover:underline">Ver mais</button>
                </div>
              </div>
            </div>
            
            {/* Classificado 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-green-100 relative">
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">DESTAQUE</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Título do Anúncio</h3>
                <p className="text-sm text-gray-600 mb-2">Descrição breve do anúncio ou classificado</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">R$ 0,00</span>
                  <button className="text-sm text-blue-600 hover:underline">Ver mais</button>
                </div>
              </div>
            </div>
            
            {/* Classificado 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-yellow-100 relative">
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">DESTAQUE</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Título do Anúncio</h3>
                <p className="text-sm text-gray-600 mb-2">Descrição breve do anúncio ou classificado</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">R$ 0,00</span>
                  <button className="text-sm text-blue-600 hover:underline">Ver mais</button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA para anunciar */}
          <div className="mt-12 text-center">
            <Link
              href="/anunciar"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Anuncie Aqui
            </Link>
          </div>
        </div>
      </section>

      {/* Eventos em Destaque */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Eventos em Destaque
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                titulo: 'Workshop de Marketing Digital',
                data: '20 Dezembro 2023',
                horario: '19:00 - 22:00',
                descricao: 'Aprenda as melhores estratégias para alavancar seu negócio nas redes sociais.',
                cor: 'from-pink-500 to-rose-500',
                icone: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              },
              {
                titulo: 'Palestra: Gestão Financeira',
                data: '22 Dezembro 2023',
                horario: '15:00 - 17:00',
                descricao: 'Como organizar as finanças da sua empresa para crescer com segurança.',
                cor: 'from-purple-500 to-indigo-500',
                icone: 'M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M16 7a4 4 0 11-8 0 4 4 0 018 0z'
              },
              {
                titulo: 'Networking Empresarial',
                data: '25 Dezembro 2023',
                horario: '18:00 - 21:00',
                descricao: 'Encontro para networking e troca de experiências entre empresários.',
                cor: 'from-amber-500 to-orange-500',
                icone: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              }
            ].map((evento, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className={`h-48 bg-gradient-to-r ${evento.cor} flex items-center justify-center`}>
                    <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={evento.icone} />
                    </svg>
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                    DESTAQUE
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {evento.data}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{evento.titulo}</h3>
                  <p className="text-gray-600 mb-4">{evento.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">{evento.horario}</span>
                    <Link href={`/eventos/${index + 1}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Saiba mais →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA para ver todos os eventos */}
          <div className="mt-12 text-center">
            <Link
              href="/eventos"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Ver Todos os Eventos
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 002 2z" />
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

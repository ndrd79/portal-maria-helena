export default function EventoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Evento {params.id}</h1>
        <p className="text-gray-600">Em breve, detalhes do evento...</p>
      </div>
    </div>
  )
}

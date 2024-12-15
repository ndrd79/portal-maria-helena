import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Portal Maria Helena',
  description: 'Área administrativa do Portal Maria Helena',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}

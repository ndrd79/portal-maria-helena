'use client'

import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleLogout = () => {
    // Implementar lógica de logout aqui
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

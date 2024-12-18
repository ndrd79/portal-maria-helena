'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.replace('/login')
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        router.replace('/login')
      }
    }
    checkAuth()
  }, [router, supabase])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.replace('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
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

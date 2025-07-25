'use client'

import { Header } from './Header'
import { DashboardStats } from '@/lib/types'

interface DashboardLayoutProps {
  children: React.ReactNode
  stats?: DashboardStats
  selectedCount?: number
}

export function DashboardLayout({ 
  children, 
  stats, 
  selectedCount = 0
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <Header 
        stats={stats}
        selectedCount={selectedCount}
      />

      {/* Page Content */}
      <main className="pt-0">
        {children}
      </main>
    </div>
  )
}
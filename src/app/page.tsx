'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  const recentReports = [
    {
      date: '2025-09-09',
      title: 'Daily Twitter Intelligence',
      highlights: ['3 oportunidades críticas', '87% score viral promedio', '2.4M impresiones'],
      status: 'active'
    },
    {
      date: '2025-09-08', 
      title: 'Daily Twitter Intelligence',
      highlights: ['2 oportunidades altas', '82% score viral promedio', '1.8M impresiones'],
      status: 'archived'
    },
    {
      date: '2025-09-07',
      title: 'Daily Twitter Intelligence', 
      highlights: ['4 oportunidades críticas', '91% score viral promedio', '3.2M impresiones'],
      status: 'archived'
    }
  ]

  const stats = [
    { label: 'Viral Score Promedio', value: '87%', change: '+5%', description: 'Últimos 7 días' },
    { label: 'Oportunidades Detectadas', value: '24', change: '+8', description: 'Esta semana' },
    { label: 'Alcance Total', value: '15.2M', change: '+12%', description: 'Impresiones estimadas' },
    { label: 'Tweets Publicados', value: '18', change: '+6', description: 'Últimos 7 días' }
  ]

  return (
    <div className="min-h-screen bg-[#2c0a0b] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#2c0a0b]">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-medium tracking-tight">
              NEXTBLOCK INTELLIGENCE
            </Link>
            <div className="hidden md:flex items-center gap-12">
              <Link href="/report" className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                REPORT
              </Link>
              <Link href="/archive" className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                ARCHIVE
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-[1600px] mx-auto px-8">
          {/* Hero */}
          <section className="py-24">
            <div className="max-w-4xl">
              <h1 className="text-[clamp(3.5rem,8vw,12rem)] font-medium leading-none tracking-tight mb-8">
                TWITTER<br />
                INTELLIGENCE
              </h1>
              <p className="text-xl leading-relaxed mb-12 max-w-2xl opacity-80">
                Daily reports optimized to maximize viral impact for NextBlock VC's CEO content strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/report"
                  className="inline-block bg-white text-[#2c0a0b] px-8 py-4 text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-opacity"
                >
                  TODAY'S REPORT
                </Link>
                <Link 
                  href="/archive"
                  className="inline-block border border-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-white hover:text-[#2c0a0b] transition-all"
                >
                  VIEW ARCHIVE
                </Link>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-sm uppercase tracking-wider opacity-60">
                    {stat.label}
                  </div>
                  <div className="text-4xl font-medium">
                    {stat.value}
                  </div>
                  <div className="text-sm opacity-60">
                    {stat.change} • {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Reports */}
          <section className="py-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-medium">RECENT REPORTS</h2>
              <div className="flex items-center gap-4">
                <label className="text-sm uppercase tracking-wider opacity-60">
                  DATE
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border border-white/20 px-4 py-2 text-sm"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-medium">{report.title}</h3>
                        <span className={`text-xs uppercase tracking-wider px-2 py-1 ${
                          report.status === 'active' 
                            ? 'bg-white text-[#2c0a0b]' 
                            : 'border border-white/20 opacity-60'
                        }`}>
                          {report.status === 'active' ? 'ACTIVE' : 'ARCHIVED'}
                        </span>
                      </div>
                      <div className="text-sm opacity-60 mb-4">
                        {report.date}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {report.highlights.map((highlight, hIndex) => (
                          <span key={hIndex} className="text-xs border border-white/20 px-3 py-1 opacity-80">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link 
                      href={`/report?date=${report.date}`}
                      className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity ml-8"
                    >
                      VIEW →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm opacity-60">
              © 2025 NEXTBLOCK VENTURES
            </div>
            <div className="text-sm opacity-60">
              TWITTER INTELLIGENCE PLATFORM
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

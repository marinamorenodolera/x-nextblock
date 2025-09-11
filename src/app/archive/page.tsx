'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ArchivePage() {
  const [selectedMonth, setSelectedMonth] = useState('2025-09')
  const [searchTerm, setSearchTerm] = useState('')
  
  const archivedReports = [
    {
      date: '2025-09-09',
      title: 'Daily Twitter Intelligence',
      highlights: ['3 critical opportunities', '87% viral score average', '2.4M impressions'],
      status: 'active',
      viralScore: 87
    },
    {
      date: '2025-09-08',
      title: 'Daily Twitter Intelligence',
      highlights: ['2 high opportunities', '82% viral score average', '1.8M impressions'],
      status: 'archived',
      viralScore: 82
    },
    {
      date: '2025-09-07',
      title: 'Daily Twitter Intelligence',
      highlights: ['4 critical opportunities', '91% viral score average', '3.2M impressions'],
      status: 'archived',
      viralScore: 91
    },
    {
      date: '2025-09-06',
      title: 'Daily Twitter Intelligence',
      highlights: ['1 high opportunity', '78% viral score average', '1.5M impressions'],
      status: 'archived',
      viralScore: 78
    },
    {
      date: '2025-09-05',
      title: 'Daily Twitter Intelligence',
      highlights: ['5 critical opportunities', '94% viral score average', '4.1M impressions'],
      status: 'archived',
      viralScore: 94
    },
    {
      date: '2025-09-04',
      title: 'Daily Twitter Intelligence',
      highlights: ['3 medium opportunities', '85% viral score average', '2.8M impressions'],
      status: 'archived',
      viralScore: 85
    }
  ]

  const filteredReports = archivedReports.filter(report => 
    report.date.includes(selectedMonth) && 
    (searchTerm === '' || report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     report.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  const averageScore = filteredReports.length > 0 
    ? Math.round(filteredReports.reduce((acc, r) => acc + r.viralScore, 0) / filteredReports.length)
    : 0
  
  const bestScore = filteredReports.length > 0 
    ? Math.max(...filteredReports.map(r => r.viralScore))
    : 0

  return (
    <div className="min-h-screen bg-[#2c0a0b] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#2c0a0b]">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-medium tracking-tight">
              NEXTBLOCK INTELLIGENCE
            </Link>
            <div className="flex items-center gap-12">
              <Link href="/" className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                HOME
              </Link>
              <Link href="/report" className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                REPORT
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-[1600px] mx-auto px-8">
          {/* Header */}
          <section className="py-12 border-b border-white/10">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-tight mb-4">
              HISTORICAL<br />
              ARCHIVE
            </h1>
            <div className="text-sm uppercase tracking-wider opacity-60">
              NEXTBLOCK INTELLIGENCE REPORTS
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 border-b border-white/10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-wider opacity-60 mb-2">
                  Search Reports
                </label>
                <input
                  type="text"
                  placeholder="Search in reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm placeholder:opacity-40"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-wider opacity-60 mb-2">
                  Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-[#2c0a0b] border border-white/20 px-4 py-3 text-sm"
                >
                  <option value="2025-09">SEPTEMBER 2025</option>
                  <option value="2025-08">AUGUST 2025</option>
                  <option value="2025-07">JULY 2025</option>
                </select>
              </div>
            </div>
          </section>

          {/* Results Counter */}
          <section className="py-4">
            <div className="text-sm uppercase tracking-wider opacity-60">
              Showing {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          </section>

          {/* Reports List */}
          <section className="py-8">
            {filteredReports.length === 0 ? (
              <div className="text-center py-24">
                <h3 className="text-2xl font-medium mb-4">NO REPORTS FOUND</h3>
                <p className="text-sm opacity-60 uppercase tracking-wider">
                  {searchTerm 
                    ? `No reports match "${searchTerm}" in ${selectedMonth.replace('2025-', '').replace('09', 'September').replace('08', 'August').replace('07', 'July')} 2025`
                    : `No reports available for ${selectedMonth.replace('2025-', '').replace('09', 'September').replace('08', 'August').replace('07', 'July')} 2025`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredReports.map((report, index) => (
                  <div key={index} className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-xl font-medium">{report.title}</h3>
                          <span className="text-sm font-medium">
                            {report.viralScore}% VIRAL SCORE
                          </span>
                          <span className={`text-xs uppercase tracking-wider px-2 py-1 ${
                            report.status === 'active' 
                              ? 'bg-white text-[#2c0a0b]' 
                              : 'border border-white/20 opacity-60'
                          }`}>
                            {report.status === 'active' ? 'ACTIVE' : 'ARCHIVED'}
                          </span>
                        </div>
                        
                        <div className="text-sm opacity-60 mb-4 uppercase tracking-wider">
                          {new Date(report.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }).toUpperCase()}
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          {report.highlights.map((highlight, hIndex) => (
                            <span key={hIndex} className="text-xs border border-white/20 px-3 py-1 opacity-80 uppercase tracking-wider">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 ml-8">
                        <Link 
                          href={`/report?date=${report.date}`}
                          className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
                        >
                          VIEW REPORT →
                        </Link>
                        <div className="text-xs opacity-60">
                          {report.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Summary Stats */}
          {filteredReports.length > 0 && (
            <section className="py-16 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-2">
                  <div className="text-sm uppercase tracking-wider opacity-60">
                    AVERAGE SCORE
                  </div>
                  <div className="text-5xl font-medium">{averageScore}%</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm uppercase tracking-wider opacity-60">
                    TOTAL REPORTS
                  </div>
                  <div className="text-5xl font-medium">{filteredReports.length}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm uppercase tracking-wider opacity-60">
                    BEST SCORE
                  </div>
                  <div className="text-5xl font-medium">{bestScore}%</div>
                </div>
              </div>
            </section>
          )}
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
              INTELLIGENCE REPORT ARCHIVE
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
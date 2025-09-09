'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText, TrendingUp, ArrowRight, Clock, Search, Filter } from 'lucide-react'
import Link from 'next/link'

export default function ArchivePage() {
  const [selectedMonth, setSelectedMonth] = useState('2025-09')
  const [searchTerm, setSearchTerm] = useState('')
  
  const archivedReports = [
    {
      date: '2025-09-09',
      title: 'Daily Twitter Intelligence',
      highlights: ['3 oportunidades críticas', '87% score viral promedio', '2.4M impresiones'],
      status: 'active',
      viralScore: 87
    },
    {
      date: '2025-09-08',
      title: 'Daily Twitter Intelligence',
      highlights: ['2 oportunidades altas', '82% score viral promedio', '1.8M impresiones'],
      status: 'archived',
      viralScore: 82
    },
    {
      date: '2025-09-07',
      title: 'Daily Twitter Intelligence',
      highlights: ['4 oportunidades críticas', '91% score viral promedio', '3.2M impresiones'],
      status: 'archived',
      viralScore: 91
    },
    {
      date: '2025-09-06',
      title: 'Daily Twitter Intelligence',
      highlights: ['1 oportunidad alta', '78% score viral promedio', '1.5M impresiones'],
      status: 'archived',
      viralScore: 78
    },
    {
      date: '2025-09-05',
      title: 'Daily Twitter Intelligence',
      highlights: ['5 oportunidades críticas', '94% score viral promedio', '4.1M impresiones'],
      status: 'archived',
      viralScore: 94
    },
    {
      date: '2025-09-04',
      title: 'Daily Twitter Intelligence',
      highlights: ['3 oportunidades medias', '85% score viral promedio', '2.8M impresiones'],
      status: 'archived',
      viralScore: 85
    }
  ]

  const filteredReports = archivedReports.filter(report => 
    report.date.includes(selectedMonth) && 
    (searchTerm === '' || report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     report.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-600'
    if (score >= 80) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0506] to-[#2c0a0b]">
      {/* Header */}
      <header className="border-b border-red-900/20 bg-[#2c0a0b]/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Archivo Histórico</h1>
                <p className="text-sm text-red-300">NextBlock Intelligence Reports</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en reportes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#2c0a0b]/50 border border-red-900/30 text-white pl-10 pr-4 py-3 rounded-lg text-sm placeholder-gray-400"
              />
            </div>
            
            {/* Month Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-red-400" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-[#2c0a0b]/50 border border-red-900/30 text-white px-4 py-3 rounded-lg text-sm"
              >
                <option value="2025-09">Septiembre 2025</option>
                <option value="2025-08">Agosto 2025</option>
                <option value="2025-07">Julio 2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm">
            Mostrando {filteredReports.length} reporte{filteredReports.length !== 1 ? 's' : ''} 
            {searchTerm && ` que coinciden con "${searchTerm}"`}
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6">
          {filteredReports.length === 0 ? (
            <Card className="bg-[#2c0a0b]/50 border-red-900/30 p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron reportes</h3>
              <p className="text-gray-400">
                {searchTerm 
                  ? `No hay reportes que coincidan con "${searchTerm}" en ${selectedMonth.replace('2025-', '').replace('09', 'Septiembre').replace('08', 'Agosto').replace('07', 'Julio')} 2025`
                  : `No hay reportes disponibles para ${selectedMonth.replace('2025-', '').replace('09', 'Septiembre').replace('08', 'Agosto').replace('07', 'Julio')} 2025`
                }
              </p>
            </Card>
          ) : (
            filteredReports.map((report, index) => (
              <Card key={index} className="bg-[#2c0a0b]/50 border-red-900/30 p-6 hover:bg-[#2c0a0b]/70 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                      <Badge className={`${getScoreColor(report.viralScore)} text-white`}>
                        {report.viralScore}% Viral
                      </Badge>
                      <Badge 
                        variant={report.status === 'active' ? 'default' : 'secondary'}
                        className={report.status === 'active' ? 'bg-red-600' : 'bg-gray-600'}
                      >
                        {report.status === 'active' ? 'Activo' : 'Archivo'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {new Date(report.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {report.highlights.map((highlight, hIndex) => (
                        <Badge key={hIndex} variant="outline" className="text-xs border-red-800/40 text-red-300">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Link href={`/report?date=${report.date}`}>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Ver Reporte
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <div className="text-xs text-gray-500">
                      {report.date}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        {filteredReports.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-800/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-green-200">Score Promedio</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredReports.reduce((acc, r) => acc + r.viralScore, 0) / filteredReports.length)}%
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-800/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-blue-200">Total Reportes</span>
              </div>
              <div className="text-2xl font-bold text-white">{filteredReports.length}</div>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-800/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-200">Mejor Score</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {Math.max(...filteredReports.map(r => r.viralScore))}%
              </div>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-red-900/20">
          <p className="text-sm text-gray-500">
            NextBlock Ventures • Archivo de Reportes de Inteligencia
          </p>
        </div>
      </div>
    </div>
  )
}
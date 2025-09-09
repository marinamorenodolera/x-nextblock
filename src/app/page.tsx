'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText, TrendingUp, Zap, ArrowRight, Clock, Users, Target } from 'lucide-react'
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
    {
      icon: TrendingUp,
      label: 'Viral Score Promedio',
      value: '87%',
      change: '+5%',
      description: 'Últimos 7 días'
    },
    {
      icon: Target,
      label: 'Oportunidades Detectadas',
      value: '24',
      change: '+8',
      description: 'Esta semana'
    },
    {
      icon: Users,
      label: 'Alcance Total',
      value: '15.2M',
      change: '+12%',
      description: 'Impresiones estimadas'
    },
    {
      icon: Zap,
      label: 'Tweets Publicados',
      value: '18',
      change: '+6',
      description: 'Últimos 7 días'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0506] to-[#2c0a0b]">
      {/* Header */}
      <header className="border-b border-red-900/20 bg-[#2c0a0b]/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">NextBlock Intelligence</h1>
                <p className="text-sm text-red-300">Daily Twitter Reports</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Twitter Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-red-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Reportes diarios optimizados para maximizar el impacto viral del CEO de NextBlock VC
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/report">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                Ver Reporte de Hoy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/archive">
              <Button variant="outline" size="lg" className="border-red-600 text-red-400 hover:bg-red-900/20 px-8 py-4 text-lg">
                Explorar Archivo
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-[#2c0a0b]/50 border-red-900/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/20">
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                    {stat.change}
                  </Badge>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Recent Reports */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Reportes Recientes</h2>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-[#2c0a0b]/50 border border-red-900/30 text-white px-3 py-2 rounded-lg text-sm"
              />
            </div>
          </div>
          
          <div className="grid gap-4">
            {recentReports.map((report, index) => (
              <Card key={index} className="bg-[#2c0a0b]/50 border-red-900/30 p-6 hover:bg-[#2c0a0b]/70 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                      <Badge 
                        variant={report.status === 'active' ? 'default' : 'secondary'}
                        className={report.status === 'active' ? 'bg-red-600' : 'bg-gray-600'}
                      >
                        {report.status === 'active' ? 'Activo' : 'Archivo'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{report.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.highlights.map((highlight, hIndex) => (
                        <Badge key={hIndex} variant="outline" className="text-xs border-red-800/40 text-red-300">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/report?date=${report.date}`}>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-900/20">
                        Ver Reporte
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-800/40 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-red-400" />
              <h3 className="text-xl font-bold text-white">Acceso Rápido</h3>
            </div>
            <p className="text-red-200 mb-6">
              Accede directamente al reporte de inteligencia de Twitter más reciente, optimizado para decisiones inmediatas.
            </p>
            <Link href="/report">
              <Button className="bg-red-600 hover:bg-red-700 w-full">
                Reporte de Hoy
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-800/40 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-8 w-8 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Archivo Histórico</h3>
            </div>
            <p className="text-yellow-200 mb-6">
              Explora reportes anteriores para análisis de tendencias y patrones de engagement a lo largo del tiempo.
            </p>
            <Link href="/archive">
              <Button variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/20 w-full">
                Explorar Archivo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-red-900/20">
          <p className="text-sm text-gray-500">
            NextBlock Ventures • Plataforma de Inteligencia Twitter
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Optimizado para maximizar el impacto viral del contenido ejecutivo
          </p>
        </div>
      </div>
    </div>
  )
}

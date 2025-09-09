'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowUp, Calendar, TrendingUp, Users, Zap, Clock } from 'lucide-react'

export default function ReportPage() {
  const [selectedSection, setSelectedSection] = useState('executive')
  
  const reportDate = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const sections = [
    { id: 'executive', label: 'Resumen Ejecutivo', icon: TrendingUp },
    { id: 'tweets', label: 'Tweets Listos', icon: Zap },
    { id: 'market', label: 'Pulso del Mercado', icon: Users },
    { id: 'timing', label: 'Estrategia de Tiempos', icon: Clock },
    { id: 'competitive', label: 'Inteligencia Competitiva', icon: ArrowUp },
    { id: 'viral', label: 'Tendencias Virales', icon: TrendingUp },
    { id: 'founders', label: 'Atracción a Fundadores', icon: Users }
  ]

  const viralContent = [
    {
      id: 1,
      content: "Jesse Pollak's tweet triggered ETH surge (+2.3%) within 24h",
      metrics: "15.4M ETH volume, +18% active addresses",
      viralScore: 95,
      urgency: "high",
      type: "Market Impact"
    },
    {
      id: 2,
      content: "Meme coin Little Pepe (LILPEPE) raised $24M, major exchange listings confirmed",
      metrics: "Competing with DOGE & SHIB in 2025",
      viralScore: 88,
      urgency: "medium",
      type: "Emerging Opportunity"
    },
    {
      id: 3,
      content: "Nasdaq invests $50M in Gemini for strategic IPO partnership",
      metrics: "Integration with Nasdaq's Calypso platform",
      viralScore: 92,
      urgency: "high",
      type: "Breaking News"
    },
    {
      id: 4,
      content: "200+ crypto influencers exposed for undisclosed paid promotions",
      metrics: "$50-60K per post, major controversy",
      viralScore: 85,
      urgency: "medium",
      type: "Industry Drama"
    }
  ]

  const readyTweets = [
    {
      id: 1,
      content: "The Nasdaq-Gemini partnership represents a pivotal moment for institutional crypto adoption. When traditional finance giants make $50M strategic investments, we're witnessing the maturation of digital assets infrastructure. 🏗️",
      score: 95,
      timing: "Next 6 hours",
      reasoning: "Breaking news momentum, institutional angle"
    },
    {
      id: 2,
      content: "Transparency in crypto marketing isn't just ethical—it's regulatory survival. The recent influencer disclosure scandal reminds us why NextBlock prioritizes authentic, compliant communication. Trust is the ultimate currency. 💎",
      score: 88,
      timing: "24-48 hours",
      reasoning: "Industry commentary, differentiation opportunity"
    },
    {
      id: 3,
      content: "When meme coins raise $24M and compete with established players, we're seeing a new paradigm: community-driven finance meets institutional capital. The lines are blurring, and that's where opportunities emerge. 🚀",
      score: 82,
      timing: "Next 12 hours",
      reasoning: "Meme coin momentum, European perspective"
    }
  ]

  const renderExecutiveSummary = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-800/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-red-200">Alta Prioridad</span>
          </div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-xs text-red-300">Oportunidades críticas</div>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-800/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-200">Momentum</span>
          </div>
          <div className="text-2xl font-bold text-white">87%</div>
          <div className="text-xs text-yellow-300">Score viral promedio</div>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-800/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-200">Alcance</span>
          </div>
          <div className="text-2xl font-bold text-white">2.4M</div>
          <div className="text-xs text-green-300">Impresiones estimadas</div>
        </Card>
      </div>
      
      <Card className="bg-[#2c0a0b]/50 border-red-900/30 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Principales Oportunidades Detectadas</h3>
        <div className="space-y-4">
          {viralContent.slice(0, 3).map((item) => (
            <div key={item.id} className="border-l-4 border-red-600 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                <Badge 
                  variant={item.urgency === 'high' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {item.urgency === 'high' ? 'URGENTE' : 'MEDIO'}
                </Badge>
              </div>
              <p className="text-white font-medium">{item.content}</p>
              <p className="text-sm text-gray-400">{item.metrics}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderTweets = () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-400 mb-4">
        Tweets optimizados para el CEO de NextBlock, con puntajes virales y timing estratégico
      </div>
      {readyTweets.map((tweet) => (
        <Card key={tweet.id} className="bg-[#2c0a0b]/50 border-red-900/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 text-white">{tweet.score}/100</Badge>
              <Badge variant="outline" className="text-xs">{tweet.timing}</Badge>
            </div>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Copiar Tweet
            </Button>
          </div>
          
          <p className="text-white mb-4 leading-relaxed">{tweet.content}</p>
          
          <div className="border-t border-red-900/30 pt-3">
            <p className="text-xs text-gray-400">
              <strong>Razón estratégica:</strong> {tweet.reasoning}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )

  const renderMarketPulse = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#2c0a0b]/50 border-red-900/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Noticias Clave</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-600 pl-3">
              <p className="text-white font-medium">Nasdaq-Gemini Partnership</p>
              <p className="text-sm text-gray-400">$50M strategic investment, IPO preparation</p>
            </div>
            <div className="border-l-4 border-yellow-600 pl-3">
              <p className="text-white font-medium">Meme Coin Surge</p>
              <p className="text-sm text-gray-400">LILPEPE raises $24M, exchange listings</p>
            </div>
            <div className="border-l-4 border-red-600 pl-3">
              <p className="text-white font-medium">Influencer Scandal</p>
              <p className="text-sm text-gray-400">200+ undisclosed paid promotions exposed</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-[#2c0a0b]/50 border-red-900/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Gainers 24h</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white">MYX Finance</span>
              <Badge className="bg-green-600">+97.58%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Story</span>
              <Badge className="bg-green-600">+30.43%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Worldcoin</span>
              <Badge className="bg-green-600">+18.27%</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (selectedSection) {
      case 'executive':
        return renderExecutiveSummary()
      case 'tweets':
        return renderTweets()
      case 'market':
        return renderMarketPulse()
      default:
        return (
          <Card className="bg-[#2c0a0b]/50 border-red-900/30 p-8 text-center">
            <p className="text-gray-400">Sección en desarrollo</p>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0506] to-[#2c0a0b]">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8 text-red-400" />
            <h1 className="text-3xl font-bold text-white tracking-tight">
              NextBlock Daily Twitter Intelligence
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{reportDate}</span>
            </div>
            <span>•</span>
            <span>Para: Pieter (CIO)</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Button
                key={section.id}
                variant={selectedSection === section.id ? 'default' : 'outline'}
                onClick={() => setSelectedSection(section.id)}
                className={`flex items-center gap-2 ${
                  selectedSection === section.id 
                    ? 'bg-red-600 hover:bg-red-700 border-red-600' 
                    : 'border-red-900/30 text-gray-300 hover:bg-red-900/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </Button>
            )
          })}
        </div>

        {/* Content */}
        <div className="mb-8">
          {renderContent()}
        </div>

        {/* Footer */}
        <Separator className="bg-red-900/30 mb-6" />
        <div className="text-center text-sm text-gray-500">
          <p>NextBlock Ventures • Daily Twitter Intelligence Report</p>
          <p className="mt-1">Generado automáticamente para optimización de contenido viral</p>
        </div>
      </div>
    </div>
  )
}
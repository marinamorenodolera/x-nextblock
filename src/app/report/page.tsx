'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ReportPage() {
  const [selectedSection, setSelectedSection] = useState('executive')
  
  const reportDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).toUpperCase()

  const sections = [
    { id: 'executive', label: 'EXECUTIVE SUMMARY' },
    { id: 'tweets', label: 'READY TWEETS' },
    { id: 'market', label: 'MARKET PULSE' },
    { id: 'timing', label: 'TIMING STRATEGY' },
    { id: 'competitive', label: 'COMPETITIVE INTEL' },
    { id: 'viral', label: 'VIRAL TRENDS' },
    { id: 'founders', label: 'FOUNDER ATTRACTION' }
  ]

  const viralContent = [
    {
      id: 1,
      content: "Jesse Pollak's tweet triggered ETH surge (+2.3%) within 24h",
      metrics: "15.4M ETH volume, +18% active addresses",
      viralScore: 95,
      urgency: "HIGH",
      type: "Market Impact"
    },
    {
      id: 2,
      content: "Meme coin Little Pepe (LILPEPE) raised $24M, major exchange listings confirmed",
      metrics: "Competing with DOGE & SHIB in 2025",
      viralScore: 88,
      urgency: "MEDIUM",
      type: "Emerging Opportunity"
    },
    {
      id: 3,
      content: "Nasdaq invests $50M in Gemini for strategic IPO partnership",
      metrics: "Integration with Nasdaq's Calypso platform",
      viralScore: 92,
      urgency: "HIGH",
      type: "Breaking News"
    }
  ]

  const readyTweets = [
    {
      id: 1,
      content: "The Nasdaq-Gemini partnership represents a pivotal moment for institutional crypto adoption. When traditional finance giants make $50M strategic investments, we're witnessing the maturation of digital assets infrastructure. 🏗️",
      score: 95,
      timing: "NEXT 6 HOURS",
      reasoning: "Breaking news momentum, institutional angle"
    },
    {
      id: 2,
      content: "Transparency in crypto marketing isn't just ethical—it's regulatory survival. The recent influencer disclosure scandal reminds us why NextBlock prioritizes authentic, compliant communication. Trust is the ultimate currency. 💎",
      score: 88,
      timing: "24-48 HOURS",
      reasoning: "Industry commentary, differentiation opportunity"
    },
    {
      id: 3,
      content: "When meme coins raise $24M and compete with established players, we're seeing a new paradigm: community-driven finance meets institutional capital. The lines are blurring, and that's where opportunities emerge. 🚀",
      score: 82,
      timing: "NEXT 12 HOURS",
      reasoning: "Meme coin momentum, European perspective"
    }
  ]

  const renderExecutiveSummary = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <div className="text-sm uppercase tracking-wider opacity-60">
            HIGH PRIORITY OPPORTUNITIES
          </div>
          <div className="text-5xl font-medium">3</div>
          <div className="text-sm opacity-60">Critical windows identified</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm uppercase tracking-wider opacity-60">
            AVERAGE VIRAL SCORE
          </div>
          <div className="text-5xl font-medium">87%</div>
          <div className="text-sm opacity-60">Above baseline threshold</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm uppercase tracking-wider opacity-60">
            ESTIMATED REACH
          </div>
          <div className="text-5xl font-medium">2.4M</div>
          <div className="text-sm opacity-60">Total impressions potential</div>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-12">
        <h3 className="text-2xl font-medium mb-8">KEY OPPORTUNITIES DETECTED</h3>
        <div className="space-y-8">
          {viralContent.slice(0, 3).map((item) => (
            <div key={item.id} className="border-l-2 border-white pl-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-xs uppercase tracking-wider px-2 py-1 border border-white/20">
                  {item.type}
                </span>
                <span className={`text-xs uppercase tracking-wider px-2 py-1 ${
                  item.urgency === 'HIGH' ? 'bg-white text-[#2c0a0b]' : 'border border-white/20'
                }`}>
                  {item.urgency}
                </span>
                <span className="text-xs uppercase tracking-wider opacity-60">
                  SCORE: {item.viralScore}%
                </span>
              </div>
              <p className="text-xl font-medium mb-2">{item.content}</p>
              <p className="text-sm opacity-60">{item.metrics}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTweets = () => (
    <div className="space-y-8">
      <div className="text-sm uppercase tracking-wider opacity-60 mb-8">
        OPTIMIZED TWEETS FOR CEO WITH VIRAL SCORING AND STRATEGIC TIMING
      </div>
      {readyTweets.map((tweet) => (
        <div key={tweet.id} className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {tweet.score}/100 VIRAL SCORE
              </span>
              <span className="text-xs uppercase tracking-wider border border-white/20 px-2 py-1">
                {tweet.timing}
              </span>
            </div>
            <button className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
              COPY TWEET
            </button>
          </div>
          
          <p className="text-xl leading-relaxed mb-6">{tweet.content}</p>
          
          <div className="border-t border-white/10 pt-4">
            <p className="text-sm opacity-60">
              <span className="uppercase tracking-wider">Strategic rationale:</span> {tweet.reasoning}
            </p>
          </div>
        </div>
      ))}
    </div>
  )

  const renderMarketPulse = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-medium mb-8">KEY NEWS</h3>
          <div className="space-y-6">
            <div className="border-l-2 border-white pl-4">
              <p className="text-lg font-medium mb-2">Nasdaq-Gemini Partnership</p>
              <p className="text-sm opacity-60">$50M strategic investment, IPO preparation</p>
            </div>
            <div className="border-l-2 border-white pl-4">
              <p className="text-lg font-medium mb-2">Meme Coin Surge</p>
              <p className="text-sm opacity-60">LILPEPE raises $24M, exchange listings</p>
            </div>
            <div className="border-l-2 border-white pl-4">
              <p className="text-lg font-medium mb-2">Influencer Scandal</p>
              <p className="text-sm opacity-60">200+ undisclosed paid promotions exposed</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-medium mb-8">TOP GAINERS 24H</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>MYX Finance</span>
              <span className="text-sm">+97.58%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Story</span>
              <span className="text-sm">+30.43%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Worldcoin</span>
              <span className="text-sm">+18.27%</span>
            </div>
          </div>
        </div>
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
          <div className="text-center py-16">
            <p className="text-sm opacity-60 uppercase tracking-wider">Section in development</p>
          </div>
        )
    }
  }

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
          {/* Header */}
          <section className="py-12 border-b border-white/10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-tight mb-4">
                  DAILY TWITTER<br />
                  INTELLIGENCE
                </h1>
                <div className="text-sm uppercase tracking-wider opacity-60">
                  {reportDate} • FOR PIETER (CIO)
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <section className="py-8 border-b border-white/10">
            <div className="flex flex-wrap gap-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`text-sm uppercase tracking-wider pb-2 transition-opacity ${
                    selectedSection === section.id 
                      ? 'border-b-2 border-white opacity-100' 
                      : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </section>

          {/* Content */}
          <section className="py-16">
            {renderContent()}
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
              DAILY TWITTER INTELLIGENCE REPORT
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
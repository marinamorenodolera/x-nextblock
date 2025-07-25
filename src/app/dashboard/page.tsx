'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ContentFeed } from '@/components/content/ContentFeed'
import { ProcessingIndicator } from '@/components/ai/ProcessingIndicator'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { 
  mockGrokTweets, 
  mockTrendingTweets, 
  mockNews, 
  mockDashboardStats,
  simulateApiDelay
} from '@/lib/mock-data'
import { AIProcessingStatus } from '@/lib/types'

function DashboardContent() {
  const searchParams = useSearchParams()
  const [processingStatus, setProcessingStatus] = useState<AIProcessingStatus>({ state: 'idle' })
  const [selectedCount, setSelectedCount] = useState(0)
  const [quickFilter, setQuickFilter] = useState<string | null>(null)

  // Handle quick filter from URL params
  useEffect(() => {
    const filter = searchParams.get('filter')
    setQuickFilter(filter)
  }, [searchParams])

  // Handle content curation workflow
  useEffect(() => {
    const handleStartCuration = () => {
      // Clear any previous selections and focus on content
      setQuickFilter(null)
      setSelectedCount(0)
      // Scroll to content feed
      setTimeout(() => {
        document.querySelector('.content-feed')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }

    window.addEventListener('startContentCuration', handleStartCuration)
    return () => window.removeEventListener('startContentCuration', handleStartCuration)
  }, [])

  // Handle "Generate with AI" button - save selection and redirect
  const handleGenerateWithAI = () => {
    // Get currently selected items from ContentFeed
    const selectedIds = Array.from(document.querySelectorAll('.content-item.selected')).map(
      el => el.getAttribute('data-id')
    ).filter(Boolean)
    
    console.log('Generate with AI clicked, selected:', selectedIds)
    
    // Save selection to localStorage for create page
    localStorage.setItem('selectedContentIds', JSON.stringify(selectedIds))
    localStorage.setItem('selectedContentCount', selectedCount.toString())
    
    // Navigate to create page
    window.location.href = '/create'
  }

  const allTweets = [...mockGrokTweets, ...mockTrendingTweets]

  return (
    <DashboardLayout 
      stats={mockDashboardStats}
      selectedCount={selectedCount}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content - Content Feed */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Today&apos;s Curated Content
            </h1>
            <p className="text-foreground/60 text-base">
              AI-selected crypto content from followed accounts, trending topics, and key news sources
            </p>
          </div>

          {/* Processing Status */}
          {processingStatus.state !== 'idle' && (
            <ProcessingIndicator 
              status={processingStatus}
              selectedCount={selectedCount}
            />
          )}

          {/* Content Feed */}
          <ContentFeed
            tweets={allTweets}
            news={mockNews}
            onProcessWithAI={() => {}} // Placeholder, not used anymore
            onSelectionChange={setSelectedCount}
            isProcessing={false}
            quickFilter={quickFilter}
            className="content-feed"
          />
        </div>

        {/* Floating Generate with AI Button */}
        {selectedCount > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button 
              onClick={handleGenerateWithAI}
              size="lg"
              className="bg-brand-primary-500 hover:bg-brand-primary-600 shadow-lg min-h-[56px] px-8 gap-3 rounded-full"
            >
              <Zap className="h-5 w-5" />
              Generate with AI ({selectedCount})
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
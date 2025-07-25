'use client'

import { useState, useMemo } from 'react'
import { TweetCard } from './TweetCard'
import { NewsCard } from './NewsCard'
import { SelectionCounter } from './SelectionCounter'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tweet, News, FeedFilters } from '@/lib/types'
import { useSelection } from '@/hooks/useSelection'
import { Filter, Grid, List, RefreshCw } from 'lucide-react'

interface ContentFeedProps {
  tweets: Tweet[]
  news: News[]
  onProcessWithAI?: (selectedIds: string[]) => void
  onSelectionChange?: (count: number) => void
  isProcessing?: boolean
  className?: string
  quickFilter?: string | null
}

export function ContentFeed({ 
  tweets, 
  news, 
  onProcessWithAI,
  onSelectionChange,
  isProcessing = false,
  className,
  quickFilter 
}: ContentFeedProps) {
  const [filters, setFilters] = useState<FeedFilters>({
    content_type: 'all',
    source_type: 'all',
    importance_score_min: 0
  })
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  // Selection management
  const { selectedItems, count, toggleSelection, clearSelection, isSelected } = useSelection({
    maxSelection: 50, // CEO can select up to 50 items
    onSelectionChange: onSelectionChange
  })

  // Combine and filter content
  const allContent = useMemo(() => {
    let combined: (Tweet & { type: 'tweet' } | News & { type: 'news' })[] = [
      ...tweets.map(t => ({ ...t, type: 'tweet' as const })),
      ...news.map(n => ({ ...n, type: 'news' as const }))
    ]

    // Apply filters
    if (filters.content_type !== 'all') {
      combined = combined.filter(item => {
        if (filters.content_type === 'tweets') return item.type === 'tweet'
        if (filters.content_type === 'news') return item.type === 'news'
        return true
      })
    }

    if (filters.source_type !== 'all' && filters.source_type) {
      combined = combined.filter(item => {
        if (item.type === 'tweet') {
          return (item as Tweet).source_type === filters.source_type
        }
        return true // News doesn't have source_type in same format
      })
    }

    if (filters.importance_score_min && filters.importance_score_min > 0) {
      combined = combined.filter(item => item.importance_score >= (filters.importance_score_min || 0))
    }

    // Apply quick filters
    if (quickFilter) {
      switch (quickFilter) {
        case 'high-priority':
          combined = combined.filter(item => item.importance_score >= 8.0)
          break
        case 'vc-relevant':
          // Filter for content relevant to VCs (using tags or keywords)
          combined = combined.filter(item => {
            const content = item.type === 'tweet' ? item.content : item.title
            return /\b(VC|venture|funding|investment|startup|raise|series|round|capital)\b/i.test(content)
          })
          break
        case 'today-only':
          // Filter for content from today only
          const today = new Date().toDateString()
          combined = combined.filter(item => {
            const itemDate = new Date(item.type === 'tweet' ? item.selected_at : item.selected_at)
            return itemDate.toDateString() === today
          })
          break
      }
    }

    // Sort by importance score and recency
    return combined.sort((a, b) => {
      // First by importance score (desc)
      const scoreDiff = b.importance_score - a.importance_score
      if (Math.abs(scoreDiff) > 0.1) return scoreDiff
      
      // Then by recency
      const dateA = new Date(a.type === 'tweet' ? a.selected_at : a.selected_at)
      const dateB = new Date(b.type === 'tweet' ? b.selected_at : b.selected_at)
      return dateB.getTime() - dateA.getTime()
    })
  }, [tweets, news, filters, quickFilter])

  const handleProcessWithAI = () => {
    if (onProcessWithAI && selectedItems.length > 0) {
      onProcessWithAI(selectedItems)
    }
  }

  const getFilterCounts = () => {
    const tweetCount = tweets.length
    const newsCount = news.length
    const followedCount = tweets.filter(t => t.source_type === 'followed').length
    const trendingCount = tweets.filter(t => t.source_type.includes('trending')).length
    
    return { tweetCount, newsCount, followedCount, trendingCount }
  }

  const { tweetCount, newsCount, followedCount, trendingCount } = getFilterCounts()

  return (
    <div className={className}>
      {/* Filter Bar */}
      <div className="sticky top-0 z-30 bg-bg-secondary/95 backdrop-blur border-b border-border-primary p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={filters.content_type === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(f => ({ ...f, content_type: 'all' }))}
              className="h-8 text-xs transition-all duration-150 hover:scale-105 active:scale-95 min-h-touch"
            >
              All ({tweets.length + news.length})
            </Button>
            <Button
              variant={filters.content_type === 'tweets' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(f => ({ ...f, content_type: 'tweets' }))}
              className="h-8 text-xs transition-all duration-150 hover:scale-105 active:scale-95 min-h-touch"
            >
              Tweets ({tweetCount})
            </Button>
            <Button
              variant={filters.content_type === 'news' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(f => ({ ...f, content_type: 'news' }))}
              className="h-8 text-xs transition-all duration-150 hover:scale-105 active:scale-95 min-h-touch"
            >
              News ({newsCount})
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button
              variant={filters.source_type === 'followed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(f => ({ ...f, source_type: filters.source_type === 'followed' ? 'all' : 'followed' }))}
              className="h-8 text-xs transition-all duration-150 hover:scale-105 active:scale-95 min-h-touch"
            >
              Followed ({followedCount})
            </Button>
            <Button
              variant={filters.source_type?.includes('trending') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(f => ({ ...f, source_type: filters.source_type?.includes('trending') ? 'all' : 'trending_grok' }))}
              className="h-8 text-xs transition-all duration-150 hover:scale-105 active:scale-95 min-h-touch"
            >
              Trending ({trendingCount})
            </Button>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 transition-all duration-150 hover:scale-110 active:scale-95 hover:bg-brand-primary-500/10 min-h-touch"
              onClick={() => {
                // Simulate refresh
                console.log('Refreshing content...')
              }}
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
            
            <div className="flex items-center border border-border-primary rounded-md">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="h-8 px-2 rounded-r-none transition-all duration-150 hover:scale-105 active:scale-95 min-h-touch"
                onClick={() => setViewMode('list')}
              >
                <List className="h-3 w-3" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className="h-8 px-2 rounded-l-none transition-all duration-150 hover:scale-105 active:scale-95 min-h-touch"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters & Results Count */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-primary/50">
          <div className="flex items-center gap-2">
            {(filters.content_type !== 'all' || filters.source_type !== 'all' || (filters.importance_score_min && filters.importance_score_min > 0) || quickFilter) && (
              <>
                <span className="text-xs text-foreground/60">Active filters:</span>
                {quickFilter && (
                  <Badge variant="default" className="text-xs">
                    {quickFilter === 'high-priority' && 'High Priority'}
                    {quickFilter === 'vc-relevant' && 'VC Relevant'}
                    {quickFilter === 'today-only' && 'Today Only'}
                  </Badge>
                )}
                {filters.content_type !== 'all' && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {filters.content_type}
                  </Badge>
                )}
                {filters.source_type !== 'all' && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {filters.source_type}
                  </Badge>
                )}
                {(filters.importance_score_min && filters.importance_score_min > 0) && (
                  <Badge variant="secondary" className="text-xs">
                    Score ≥ {filters.importance_score_min}
                  </Badge>
                )}
              </>
            )}
          </div>
          <div className="text-xs text-foreground/60">
            Showing {allContent.length} of {tweets.length + news.length} items
          </div>
        </div>
      </div>

      {/* Content Grid/List */}
      <div className="p-4">
        <div className={`gap-4 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
            : 'space-y-4'
        }`}>
          {allContent.map((item) => (
            item.type === 'tweet' ? (
              <TweetCard
                key={item.id}
                tweet={item as Tweet}
                isSelected={isSelected(item.id)}
                onSelect={toggleSelection}
                showSelection={true}
              />
            ) : (
              <NewsCard
                key={item.id}
                news={item as News}
                isSelected={isSelected(item.id)}
                onSelect={toggleSelection}
                showSelection={true}
              />
            )
          ))}
        </div>

        {/* Empty State */}
        {allContent.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No content found</h3>
            <p className="text-foreground/60 text-sm">
              {filters.content_type !== 'all' || filters.source_type !== 'all' || (filters.importance_score_min && filters.importance_score_min > 0)
                ? 'Try adjusting your filters to see more content.'
                : 'No content available. Try refreshing to load new content.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Selection Counter (Sticky) */}
      <SelectionCounter
        selectedCount={count}
        maxSelection={50}
        onClearSelection={clearSelection}
        onProcessWithAI={handleProcessWithAI}
        isProcessing={isProcessing}
        className="mx-4 mb-4"
      />
    </div>
  )
}
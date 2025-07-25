'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Heart, MessageCircle, Repeat2, Bookmark, Eye, TrendingUp, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Tweet } from '@/lib/types'
import { cn } from '@/lib/utils'
import { formatDateForDisplay } from '@/lib/date-utils'

interface TweetCardProps {
  tweet: Tweet
  isSelected?: boolean
  onSelect?: (id: string) => void
  showSelection?: boolean
}

export function TweetCard({ tweet, isSelected = false, onSelect, showSelection = true }: TweetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSelectionChange = () => {
    if (onSelect) {
      onSelect(tweet.id)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on checkbox or buttons
    if ((e.target as HTMLElement).closest('input, button, [role="button"]')) {
      return
    }
    setIsExpanded(!isExpanded)
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const getSourceBadgeColor = (sourceType: string) => {
    switch (sourceType) {
      case 'followed':
        return 'bg-brand-primary-500'
      case 'trending_grok':
        return 'bg-brand-secondary-500'
      case 'trending_perplexity':
        return 'bg-brand-accent'
      default:
        return 'bg-gray-500'
    }
  }

  const getSourceLabel = (sourceType: string) => {
    switch (sourceType) {
      case 'followed':
        return 'Followed'
      case 'trending_grok':
        return 'Trending (Grok)'
      case 'trending_perplexity':
        return 'Trending (Perplexity)'
      default:
        return 'Unknown'
    }
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-lg hover:shadow-brand-primary-500/5 hover:border-brand-primary-500/30 border-border-primary",
        "hover:translate-y-[-1px] active:translate-y-0",
        isSelected && "ring-2 ring-brand-primary-500 border-brand-primary-500 shadow-lg shadow-brand-primary-500/20",
        "min-h-touch cursor-pointer",
        isExpanded && "shadow-lg ring-1 ring-brand-primary-500/20 border-brand-primary-500/30"
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Selection Checkbox */}
            {showSelection && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={handleSelectionChange}
                className="mt-1 h-5 w-5"
                style={isSelected ? {
                  backgroundColor: '#73A2FF',
                  borderColor: '#73A2FF',
                  color: 'white'
                } : undefined}
              />
            )}

            {/* Avatar */}
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback className="bg-brand-primary-500 text-white font-semibold text-sm">
                {tweet.author_username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Author Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-sm text-foreground truncate">
                  {tweet.author_display_name}
                </h3>
                <span className="text-foreground/60 text-sm">@{tweet.author_username}</span>
              </div>
              <p className="text-xs text-foreground/50">
                {formatDateForDisplay(tweet.published_at)}
              </p>
            </div>
          </div>

          {/* Source & Score */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <Badge 
              className={cn(
                "text-white text-xs",
                getSourceBadgeColor(tweet.source_type)
              )}
            >
              {getSourceLabel(tweet.source_type)}
            </Badge>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-brand-accent" />
              <span className="text-xs font-medium text-brand-accent">
                {tweet.importance_score.toFixed(1)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-brand-primary-500/10 hover:scale-110 transition-all duration-150"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? (
                <ChevronUp className="h-3 w-3 text-brand-primary-500" />
              ) : (
                <ChevronDown className="h-3 w-3 text-brand-primary-500" />
              )}
            </Button>
          </div>
        </div>

        {/* Tweet Content */}
        <div className="pl-8 md:pl-13">
          <p className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-200",
            isSelected ? "text-brand-primary-500 font-medium" : "text-foreground"
          )}>
            {tweet.content}
          </p>
          
          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-4 space-y-3 p-3 bg-bg-secondary/50 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground/60">Tweet Details</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`https://twitter.com/${tweet.author_username}/status/${tweet.id}`, '_blank')
                  }}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on X
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-medium text-foreground/60">Published:</span>
                  <p className="text-foreground mt-1">{new Date(tweet.published_at).toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground/60">Selected:</span>
                  <p className="text-foreground mt-1">{new Date(tweet.selected_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Engagement Metrics */}
        <div className="pl-8 md:pl-13">
          <div className="flex items-center gap-4 text-foreground/60">
            <div className="flex items-center gap-1 hover:text-red-500 transition-colors duration-150 cursor-pointer p-1 -m-1 rounded">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{formatNumber(tweet.engagement_metrics.likes)}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-green-500 transition-colors duration-150 cursor-pointer p-1 -m-1 rounded">
              <Repeat2 className="h-4 w-4" />
              <span className="text-xs">{formatNumber(tweet.engagement_metrics.retweets)}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-blue-500 transition-colors duration-150 cursor-pointer p-1 -m-1 rounded">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{formatNumber(tweet.engagement_metrics.replies)}</span>
            </div>
            {tweet.engagement_metrics.views && (
              <div className="flex items-center gap-1 hover:text-brand-primary-500 transition-colors duration-150 cursor-pointer p-1 -m-1 rounded">
                <Eye className="h-4 w-4" />
                <span className="text-xs">{formatNumber(tweet.engagement_metrics.views)}</span>
              </div>
            )}
            {tweet.engagement_metrics.bookmarks && (
              <div className="flex items-center gap-1 hover:text-yellow-500 transition-colors duration-150 cursor-pointer p-1 -m-1 rounded">
                <Bookmark className="h-4 w-4" />
                <span className="text-xs">{formatNumber(tweet.engagement_metrics.bookmarks)}</span>
              </div>
            )}
          </div>
        </div>

        {/* AI Reasoning - Only show when expanded */}
        {isExpanded && tweet.reasoning && (
          <div className="pl-8 md:pl-13">
            <div className="p-3 bg-bg-tertiary rounded-lg border-l-4 border-brand-primary-500">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-3 w-3 text-brand-primary-500" />
                <span className="text-xs font-medium text-brand-primary-500">AI Selection Reasoning</span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {tweet.reasoning}
              </p>
            </div>
          </div>
        )}

        {/* Category Tag */}
        {tweet.category && (
          <div className="pl-8 md:pl-13">
            <Badge variant="outline" className="text-xs">
              {tweet.category.replace('_', ' ')}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ExternalLink, TrendingUp, Building2, DollarSign } from 'lucide-react'
import { News } from '@/lib/types'
import { cn } from '@/lib/utils'
import { formatDateForDisplay } from '@/lib/date-utils'

interface NewsCardProps {
  news: News
  isSelected?: boolean
  onSelect?: (id: string) => void
  showSelection?: boolean
}

export function NewsCard({ news, isSelected = false, onSelect, showSelection = true }: NewsCardProps) {
  const handleSelectionChange = () => {
    if (onSelect) {
      onSelect(news.id)
    }
  }

  const getCategoryColor = (category: string) => {
    const categoryColors = {
      'institutional_adoption': 'bg-blue-500',
      'funding_rounds': 'bg-green-500',
      'regulatory_developments': 'bg-purple-500',
      'mergers_acquisitions': 'bg-orange-500',
      'defi_metrics': 'bg-cyan-500',
      'infrastructure_metrics': 'bg-indigo-500',
      'tech_innovation': 'bg-pink-500'
    }
    return categoryColors[category as keyof typeof categoryColors] || 'bg-gray-500'
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-400'
    if (score >= 7) return 'text-brand-accent'
    if (score >= 5) return 'text-yellow-400'
    return 'text-gray-400'
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-lg hover:shadow-brand-secondary-500/5 hover:border-brand-secondary-500/30 border-border-primary",
        "hover:translate-y-[-1px] active:translate-y-0",
        isSelected && "ring-2 ring-brand-primary-500 border-brand-primary-500 shadow-lg shadow-brand-primary-500/20",
        "min-h-touch cursor-pointer"
      )}
      onClick={() => !showSelection && onSelect?.(news.id)}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
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

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="text-white text-xs bg-brand-secondary-500">
                  {news.source}
                </Badge>
                <span className="text-xs text-foreground/50">
                  {formatDateForDisplay(news.published_at)}
                </span>
              </div>
              
              <h3 className={cn(
                "font-semibold text-sm leading-tight mb-2 transition-colors duration-200",
                isSelected ? "text-brand-primary-500" : "text-foreground"
              )}>
                {news.title}
              </h3>

              {news.content && (
                <p className="text-xs text-foreground/70 leading-relaxed line-clamp-2">
                  {news.content}
                </p>
              )}
            </div>
          </div>

          {/* Scores */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-brand-accent" />
              <span className={cn("text-xs font-medium", getScoreColor(news.importance_score))}>
                {news.importance_score.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Scores Row */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-brand-secondary-500" />
            <span className="text-foreground/60">Market:</span>
            <span className={cn("font-medium", getScoreColor(news.market_impact_score))}>
              {news.market_impact_score.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="h-3 w-3 text-brand-primary-500" />
            <span className="text-foreground/60">VC:</span>
            <span className={cn("font-medium", getScoreColor(news.vc_relevance_score))}>
              {news.vc_relevance_score.toFixed(1)}
            </span>
          </div>
        </div>

        {/* AI Reasoning */}
        {news.reasoning && (
          <div>
            <details className="group">
              <summary className="cursor-pointer text-xs text-brand-primary-500 hover:text-brand-primary-400 font-medium">
                Why selected? ↓
              </summary>
              <p className="text-xs text-foreground/70 mt-2 p-2 bg-bg-tertiary rounded border-l-2 border-brand-primary-500">
                {news.reasoning}
              </p>
            </details>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Category */}
          <Badge 
            className={cn(
              "text-white text-xs",
              getCategoryColor(news.topic_category)
            )}
          >
            {news.topic_category.replace('_', ' ')}
          </Badge>

          {/* External Link */}
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs hover:bg-brand-secondary-500 hover:text-white hover:border-brand-secondary-500 transition-all duration-150 min-h-touch"
            onClick={(e) => {
              e.stopPropagation()
              window.open(news.url, '_blank', 'noopener,noreferrer')
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Read
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
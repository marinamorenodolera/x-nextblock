'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Bot, 
 
  Copy, 
  Edit, 
  BarChart3, 
  Hash,
  TrendingUp,
  Users,
  Briefcase,
  Code,
  MessageSquare
} from 'lucide-react'
import { AIGeneratedOption } from '@/lib/types'
import { cn } from '@/lib/utils'

interface AIOptionsProps {
  options: AIGeneratedOption[]
  onSelectOption?: (optionId: string) => void
  onEditOption?: (optionId: string) => void
  selectedOptionId?: string
  className?: string
}

export function AIOptions({ 
  options, 
  onSelectOption, 
  onEditOption,
  selectedOptionId,
  className 
}: AIOptionsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (text: string, optionId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(optionId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getOptionIcon = (type: string) => {
    const icons = {
      'professional': <Briefcase className="h-4 w-4" />,
      'vc_perspective': <TrendingUp className="h-4 w-4" />,
      'market_insight': <BarChart3 className="h-4 w-4" />,
      'technical': <Code className="h-4 w-4" />,
      'opinion': <MessageSquare className="h-4 w-4" />
    }
    return icons[type as keyof typeof icons] || <Bot className="h-4 w-4" />
  }

  const getOptionTypeLabel = (type: string) => {
    const labels = {
      'professional': 'Professional',
      'vc_perspective': 'VC Perspective',
      'market_insight': 'Market Insight',
      'technical': 'Technical',
      'opinion': 'Opinion'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high':
        return 'text-green-400 bg-green-400/10'
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'low':
        return 'text-gray-400 bg-gray-400/10'
      default:
        return 'text-foreground/60'
    }
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 8.5) return 'text-green-400'
    if (score >= 7.0) return 'text-brand-accent'
    if (score >= 5.0) return 'text-yellow-400'
    return 'text-gray-400'
  }

  if (options.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <Bot className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No AI options generated</h3>
          <p className="text-foreground/60 text-sm">
            Select content from the feed and click &quot;Process with AI&quot; to generate post options.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-accent" />
          <h2 className="text-lg font-semibold text-foreground">AI Generated Options</h2>
          <Badge variant="secondary" className="text-xs">
            {options.length} Options
          </Badge>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
        {options.map((option) => (
          <Card 
            key={option.id}
            className={cn(
              "transition-all duration-200 hover:shadow-md cursor-pointer",
              selectedOptionId === option.id && "ring-2 ring-brand-primary-500 border-brand-primary-500/50"
            )}
            onClick={() => onSelectOption?.(option.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getOptionIcon(option.option_type)}
                  <CardTitle className="text-sm font-medium">
                    Option {option.option_number}: {getOptionTypeLabel(option.option_type)}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={cn(
                      "text-xs",
                      getEngagementColor(option.estimated_engagement)
                    )}
                  >
                    {option.estimated_engagement} engagement
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Content */}
              <div className="p-3 bg-bg-tertiary rounded-lg border">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {option.generated_content}
                </p>
              </div>

              {/* Metrics Row */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    <span className="text-foreground/60">Confidence:</span>
                    <span className={cn("font-medium", getConfidenceColor(option.ai_confidence_score))}>
                      {option.ai_confidence_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span className="text-foreground/60">Length:</span>
                    <span className="font-medium text-foreground">
                      {option.character_count} chars
                    </span>
                  </div>
                </div>
              </div>

              {/* Hashtags */}
              {option.hashtags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Hash className="h-3 w-3 text-brand-primary-500" />
                  {option.hashtags.map((hashtag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Source Analysis */}
              <div className="text-xs text-foreground/60">
                <div className="flex items-center gap-4">
                  <span>Sources: {option.source_analysis.tweets_used} tweets</span>
                  <span>{option.source_analysis.news_used} news</span>
                  <span>{option.source_analysis.trending_used} trending</span>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(option.generated_content, option.id)
                    }}
                  >
                    {copiedId === option.id ? (
                      <span className="text-green-500">Copied!</span>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditOption?.(option.id)
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>

                {selectedOptionId === option.id && (
                  <Badge className="bg-brand-primary-500 text-white text-xs">
                    Selected
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-bg-tertiary/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-foreground/60">
                Best performing: <span className="font-medium text-foreground">
                  Option {options.reduce((best, current) => 
                    current.ai_confidence_score > best.ai_confidence_score ? current : best
                  ).option_number}
                </span>
              </span>
              <span className="text-foreground/60">
                Avg confidence: <span className="font-medium text-foreground">
                  {(options.reduce((sum, opt) => sum + opt.ai_confidence_score, 0) / options.length).toFixed(1)}
                </span>
              </span>
            </div>
            <div className="text-xs text-foreground/50">
              Choose an option to edit and publish
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
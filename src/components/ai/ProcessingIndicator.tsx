'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bot, Clock, CheckCircle, AlertCircle, Cpu } from 'lucide-react'
import { AIProcessingStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProcessingIndicatorProps {
  status: AIProcessingStatus
  selectedCount?: number
  className?: string
}

export function ProcessingIndicator({ status, selectedCount = 0, className }: ProcessingIndicatorProps) {
  const getStatusIcon = () => {
    switch (status.state) {
      case 'loading':
        return <Bot className="h-5 w-5 animate-pulse text-brand-primary-500" />
      case 'processing':
        return <Cpu className="h-5 w-5 animate-spin text-brand-accent" />
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-brand-danger" />
      default:
        return <Clock className="h-5 w-5 text-foreground/50" />
    }
  }

  const getStatusColor = () => {
    switch (status.state) {
      case 'loading':
        return 'border-brand-primary-500/50'
      case 'processing':
        return 'border-brand-accent/50'
      case 'complete':
        return 'border-green-500/50'
      case 'error':
        return 'border-brand-danger/50'
      default:
        return 'border-border-primary'
    }
  }

  const getStatusMessage = () => {
    if (status.message) return status.message
    
    switch (status.state) {
      case 'loading':
        return 'Preparing your content for AI analysis...'
      case 'processing':
        return 'AI is generating personalized post options...'
      case 'complete':
        return 'AI analysis complete! 5 options generated.'
      case 'error':
        return 'Something went wrong. Please try again.'
      default:
        return 'Ready to process your selected content'
    }
  }

  if (status.state === 'idle') return null

  return (
    <Card className={cn("border-2", getStatusColor(), className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {/* Status Icon */}
          <div className="flex-shrink-0">
            {getStatusIcon()}
          </div>

          {/* Status Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-sm text-foreground">
                AI Processing
              </h3>
              {selectedCount > 0 && (
                <Badge variant="outline" className="text-xs">
                  {selectedCount} items
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-foreground/70 mb-3">
              {getStatusMessage()}
            </p>

            {/* Progress Bar */}
            {status.progress !== undefined && status.state === 'processing' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>Progress</span>
                  <span>{status.progress}%</span>
                </div>
                <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-accent transition-all duration-500 rounded-full"
                    style={{ width: `${status.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Estimated Time */}
            {status.estimated_time && status.state === 'processing' && (
              <div className="flex items-center gap-1 mt-2 text-xs text-foreground/60">
                <Clock className="h-3 w-3" />
                <span>~{status.estimated_time}s remaining</span>
              </div>
            )}

            {/* Processing Steps */}
            {status.state === 'processing' && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span className="text-foreground/60">Analyzing selected content</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    status.progress && status.progress > 30 ? "bg-green-500" : "bg-foreground/30"
                  )} />
                  <span className="text-foreground/60">Identifying key themes</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    status.progress && status.progress > 60 ? "bg-green-500" : "bg-foreground/30"
                  )} />
                  <span className="text-foreground/60">Generating post variations</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    status.progress && status.progress > 90 ? "bg-green-500" : "bg-foreground/30"
                  )} />
                  <span className="text-foreground/60">Optimizing for engagement</span>
                </div>
              </div>
            )}
          </div>

          {/* Animated Elements */}
          {status.state === 'processing' && (
            <div className="flex-shrink-0">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
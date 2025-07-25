'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Bot, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectionCounterProps {
  selectedCount: number
  maxSelection?: number
  onClearSelection?: () => void
  onProcessWithAI?: () => void
  isProcessing?: boolean
  className?: string
}

export function SelectionCounter({ 
  selectedCount, 
  maxSelection,
  onClearSelection,
  onProcessWithAI,
  isProcessing = false,
  className 
}: SelectionCounterProps) {
  if (selectedCount === 0) return null

  const isMaxReached = maxSelection ? selectedCount >= maxSelection : false
  const canProcess = selectedCount > 0 && !isProcessing

  return (
    <Card className={cn("sticky bottom-4 z-40 shadow-lg border-brand-primary-500/50", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Selection Info */}
          <div className="flex items-center gap-3">
            <Badge 
              className={cn(
                "text-white",
                isMaxReached ? "bg-brand-secondary-500" : "bg-brand-primary-500"
              )}
            >
              {selectedCount} Selected
              {maxSelection && ` / ${maxSelection}`}
            </Badge>
            
            {isMaxReached && (
              <span className="text-xs text-brand-secondary-500 font-medium">
                Maximum reached
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Clear Selection */}
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
              className="h-8 px-3 text-xs transition-all duration-150 hover:scale-105 active:scale-95 hover:bg-red-50 hover:border-red-300 hover:text-red-600 min-h-touch"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>

            {/* Process with AI */}
            <Button
              className={cn(
                "h-8 px-4 text-xs font-medium transition-all duration-150 min-h-touch",
                "bg-brand-accent hover:bg-brand-accent/90 text-white",
                "hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-brand-accent/25",
                "disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
              )}
              disabled={!canProcess}
              onClick={onProcessWithAI}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin h-3 w-3 mr-2 border border-white border-t-transparent rounded-full" />
                  Processing...
                </>
              ) : (
                <>
                  <Bot className="h-3 w-3 mr-2" />
                  Process with AI
                  <ChevronRight className="h-3 w-3 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        {maxSelection && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-foreground/60 mb-1">
              <span>Selection Progress</span>
              <span>{Math.round((selectedCount / maxSelection) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-300 rounded-full",
                  isMaxReached ? "bg-brand-secondary-500" : "bg-brand-primary-500"
                )}
                style={{ width: `${Math.min((selectedCount / maxSelection) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Helper Text */}
        {selectedCount > 0 && (
          <p className="text-xs text-foreground/60 mt-2">
            {canProcess 
              ? "Ready to generate AI options from your selection"
              : isProcessing 
                ? "AI is processing your selected content..."
                : "Select content to generate AI-powered post options"
            }
          </p>
        )}
      </CardContent>
    </Card>
  )
}
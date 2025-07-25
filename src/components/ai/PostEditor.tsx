'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Edit3, 
  Send, 
  Hash, 
  BarChart3, 
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  Plus
} from 'lucide-react'
import { PostEditorData, AIGeneratedOption } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PostEditorProps {
  initialOption?: AIGeneratedOption
  onPublish?: (data: PostEditorData) => void
  onSaveDraft?: (data: PostEditorData) => void
  isPublishing?: boolean
  className?: string
}

export function PostEditor({ 
  initialOption, 
  onPublish, 
  onSaveDraft,
  isPublishing = false,
  className 
}: PostEditorProps) {
  const [content, setContent] = useState(initialOption?.generated_content || '')
  const [hashtags, setHashtags] = useState<string[]>(initialOption?.hashtags || [])
  const [newHashtag, setNewHashtag] = useState('')
  const [estimatedEngagement, setEstimatedEngagement] = useState<'high' | 'medium' | 'low'>(
    initialOption?.estimated_engagement || 'medium'
  )

  const characterCount = content.length
  const characterLimit = 280 // Twitter limit
  const isOverLimit = characterCount > characterLimit
  const isValidPost = content.trim().length > 0 && !isOverLimit

  useEffect(() => {
    if (initialOption) {
      setContent(initialOption.generated_content)
      setHashtags(initialOption.hashtags)
      setEstimatedEngagement(initialOption.estimated_engagement)
    }
  }, [initialOption])

  const addHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      const formattedHashtag = newHashtag.startsWith('#') ? newHashtag : `#${newHashtag}`
      setHashtags([...hashtags, formattedHashtag])
      setNewHashtag('')
    }
  }

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addHashtag()
    }
  }

  const getCharacterCountColor = () => {
    if (isOverLimit) return 'text-brand-danger'
    if (characterCount > characterLimit * 0.8) return 'text-brand-secondary-500'
    return 'text-foreground/60'
  }

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-500'
      case 'medium':
        return 'bg-brand-accent'
      case 'low':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handlePublish = () => {
    if (isValidPost && onPublish) {
      const postData: PostEditorData = {
        content,
        hashtags,
        character_count: characterCount,
        estimated_engagement: estimatedEngagement
      }
      onPublish(postData)
    }
  }

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      const postData: PostEditorData = {
        content,
        hashtags,
        character_count: characterCount,
        estimated_engagement: estimatedEngagement
      }
      onSaveDraft(postData)
    }
  }

  if (!initialOption && content.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <Edit3 className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No content to edit</h3>
          <p className="text-foreground/60 text-sm">
            Select an AI-generated option to start editing your post.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Edit3 className="h-5 w-5" />
            Post Editor
          </CardTitle>
          {initialOption && (
            <Badge variant="outline" className="text-xs">
              From AI Option {initialOption.option_number}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Content Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Content</label>
            <div className={cn("text-xs font-medium", getCharacterCountColor())}>
              {characterCount}/{characterLimit}
              {isOverLimit && (
                <AlertCircle className="inline h-3 w-3 ml-1" />
              )}
            </div>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            className={cn(
              "min-h-32 resize-none",
              isOverLimit && "border-brand-danger focus:border-brand-danger"
            )}
          />
          {isOverLimit && (
            <p className="text-xs text-brand-danger flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Content exceeds character limit
            </p>
          )}
        </div>

        {/* Hashtags */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Hashtags</label>
          
          {/* Current Hashtags */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hashtags.map((hashtag, index) => (
                <Badge key={index} variant="secondary" className="text-xs pr-1">
                  {hashtag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-brand-danger/20"
                    onClick={() => removeHashtag(index)}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add Hashtag */}
          <div className="flex gap-2">
            <Input
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add hashtag..."
              className="text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={addHashtag}
              disabled={!newHashtag.trim()}
              className="px-3"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Engagement Prediction */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Estimated Engagement</label>
          <div className="flex gap-2">
            {(['high', 'medium', 'low'] as const).map((level) => (
              <Button
                key={level}
                variant={estimatedEngagement === level ? "default" : "outline"}
                size="sm"
                onClick={() => setEstimatedEngagement(level)}
                className={cn(
                  "h-8 px-3 text-xs capitalize",
                  estimatedEngagement === level && getEngagementColor(level)
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  getEngagementColor(level)
                )} />
                {level}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Metrics Summary */}
        <div className="bg-bg-tertiary/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Post Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-brand-primary-500" />
              <span className="text-foreground/60">Characters:</span>
              <span className={cn("font-medium", getCharacterCountColor())}>
                {characterCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-brand-secondary-500" />
              <span className="text-foreground/60">Hashtags:</span>
              <span className="font-medium text-foreground">{hashtags.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                getEngagementColor(estimatedEngagement)
              )} />
              <span className="text-foreground/60">Engagement:</span>
              <span className="font-medium text-foreground capitalize">
                {estimatedEngagement}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isValidPost ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-brand-danger" />
              )}
              <span className="text-foreground/60">Status:</span>
              <span className={cn(
                "font-medium text-xs",
                isValidPost ? "text-green-500" : "text-brand-danger"
              )}>
                {isValidPost ? "Ready" : "Invalid"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={content.trim().length === 0}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Save Draft
          </Button>

          <Button
            onClick={handlePublish}
            disabled={!isValidPost || isPublishing}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90"
          >
            {isPublishing ? (
              <>
                <div className="animate-spin h-4 w-4 border border-white border-t-transparent rounded-full" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Publish Post
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { PostEditor } from '@/components/ai/PostEditor'
import { AIOptions } from '@/components/ai/AIOptions'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { mockAIOptions } from '@/lib/mock-data'
import { AIGeneratedOption, PostEditorData } from '@/lib/types'

export default function CreatePage() {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [aiOptions, setAiOptions] = useState<AIGeneratedOption[]>([])
  const [selectedCount, setSelectedCount] = useState(0)

  // Load selected content from localStorage
  useEffect(() => {
    const savedContentIds = localStorage.getItem('selectedContentIds')
    const savedCount = localStorage.getItem('selectedContentCount')
    
    if (savedContentIds && savedCount) {
      const contentIds = JSON.parse(savedContentIds)
      setSelectedCount(parseInt(savedCount))
      
      // Load AI options based on selected content
      setAiOptions(mockAIOptions)
      console.log('Loaded AI options for content:', contentIds)
    } else {
      // No selection found, redirect to dashboard
      window.location.href = '/dashboard'
    }
  }, [])

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId)
    console.log('Selected AI option:', optionId)
  }

  const handleEditOption = (optionId: string) => {
    setSelectedOptionId(optionId)
    console.log('Editing AI option:', optionId)
  }

  const handlePublish = async (postData: PostEditorData) => {
    setIsPublishing(true)
    console.log('Publishing post:', postData)
    
    // Simulate publishing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Post published successfully!')
    setIsPublishing(false)
    
    // Reset selections
    setSelectedOptionId(null)
  }

  const handleSaveDraft = async (postData: PostEditorData) => {
    console.log('Saving draft:', postData)
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Draft saved!')
  }

  const selectedOption = selectedOptionId 
    ? aiOptions.find(opt => opt.id === selectedOptionId)
    : undefined

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Content
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AI Content Creation
            </h1>
            <p className="text-foreground/60">
              {selectedCount > 0 ? `AI-generated options based on ${selectedCount} selected items` : 'Select an AI-generated option and customize it for your audience'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - AI Options */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-brand-accent" />
              <h2 className="text-xl font-semibold">AI Generated Options</h2>
            </div>
            
            {aiOptions.length > 0 ? (
              <AIOptions
                options={aiOptions}
                onSelectOption={handleSelectOption}
                onEditOption={handleEditOption}
                selectedOptionId={selectedOptionId || undefined}
              />
            ) : (
              <div className="bg-bg-secondary rounded-lg border border-border-primary p-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-brand-primary-500/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-brand-primary-500 opacity-50" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">No AI Options Available</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                      Go back to the dashboard to select content and generate AI options first.
                    </p>
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Post Editor */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Customize & Publish</h2>
            
            {selectedOption ? (
              <PostEditor
                initialOption={selectedOption}
                onPublish={handlePublish}
                onSaveDraft={handleSaveDraft}
                isPublishing={isPublishing}
              />
            ) : (
              <div className="bg-bg-secondary rounded-lg border border-border-primary p-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-brand-primary-500/10 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-8 h-8 bg-brand-primary-500 rounded-full opacity-20"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Select an Option</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      Choose an AI-generated option from the left to start customizing your post.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
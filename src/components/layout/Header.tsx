'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, Settings, Zap, UserPlus, FileText } from 'lucide-react'
import { DashboardStats } from '@/lib/types'
import Link from 'next/link'

interface HeaderProps {
  stats?: DashboardStats
  selectedCount?: number
}

export function Header({ stats, selectedCount = 0 }: HeaderProps) {
  const handleFollowAccounts = () => {
    // Navigate to accounts management page
    window.location.href = '/accounts'
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-primary bg-bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-bg-secondary/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section - Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary-500">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">CryptoInsight</h1>
            <p className="text-xs text-foreground/60">NextBlock VC Platform</p>
          </div>
        </Link>

        {/* Center Section - Stats (Desktop only) */}
        {stats && (
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {stats.total_items_today} Items Today
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {stats.posts_published} Published
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={stats.avg_engagement_score > 8 ? "default" : "secondary"} 
                className="text-xs"
              >
                {stats.avg_engagement_score.toFixed(1)} Avg Score
              </Badge>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Selection Counter */}
          {selectedCount > 0 && (
            <Badge className="bg-brand-primary-500 text-white hover:bg-brand-primary-600">
              {selectedCount} Selected
            </Badge>
          )}

          {/* Follow Accounts */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-btn-md w-btn-md hover:bg-brand-primary-500/10 hover:text-brand-primary-500"
            onClick={handleFollowAccounts}
          >
            <UserPlus className="h-4 w-4" />
            <span className="sr-only">Follow Accounts</span>
          </Button>

          {/* Report */}
          <Link href="/report">
            <Button variant="ghost" size="icon" className="h-btn-md w-btn-md">
              <FileText className="h-4 w-4" />
              <span className="sr-only">Daily Report</span>
            </Button>
          </Link>

          {/* Analytics */}
          <Link href="/analytics">
            <Button variant="ghost" size="icon" className="h-btn-md w-btn-md">
              <BarChart3 className="h-4 w-4" />
              <span className="sr-only">Analytics</span>
            </Button>
          </Link>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="h-btn-md w-btn-md">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>

      {/* Mobile Stats Bar */}
      {stats && (
        <div className="flex lg:hidden items-center justify-center gap-4 px-4 py-2 border-t border-border-primary/50">
          <Badge variant="secondary" className="text-xs">
            {stats.total_items_today} Items
          </Badge>
          <Badge variant="outline" className="text-xs">
            {stats.posts_published} Published
          </Badge>
          <Badge 
            variant={stats.avg_engagement_score > 8 ? "default" : "secondary"} 
            className="text-xs"
          >
            {stats.avg_engagement_score.toFixed(1)} Score
          </Badge>
        </div>
      )}
    </header>
  )
}
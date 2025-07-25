'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockDashboardStats } from '@/lib/mock-data'
import Link from 'next/link'
import { 
  ArrowLeft,
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Heart,
  Share,
  Calendar,
  Download,
  Filter
} from 'lucide-react'

export default function AnalyticsPage() {
  // Mock analytics data
  const weeklyStats = [
    { day: 'Mon', posts: 3, engagement: 245, reach: 1250 },
    { day: 'Tue', posts: 2, engagement: 189, reach: 980 },
    { day: 'Wed', posts: 4, engagement: 321, reach: 1680 },
    { day: 'Thu', posts: 1, engagement: 156, reach: 890 },
    { day: 'Fri', posts: 3, engagement: 278, reach: 1420 },
    { day: 'Sat', posts: 2, engagement: 198, reach: 1100 },
    { day: 'Sun', posts: 2, engagement: 167, reach: 950 }
  ]

  const topPerformingTags = [
    { tag: 'DeFi', posts: 12, avg_engagement: 8.4, growth: '+15%' },
    { tag: 'Bitcoin', posts: 8, avg_engagement: 12.1, growth: '+22%' },
    { tag: 'Ethereum', posts: 10, avg_engagement: 7.9, growth: '+8%' },
    { tag: 'Layer2', posts: 6, avg_engagement: 6.3, growth: '+35%' },
    { tag: 'NFTs', posts: 4, avg_engagement: 4.2, growth: '-5%' },
    { tag: 'Web3', posts: 7, avg_engagement: 9.1, growth: '+18%' }
  ]

  const audienceInsights = {
    demographics: [
      { label: 'Crypto Investors', percentage: 45, color: 'bg-blue-500' },
      { label: 'Developers', percentage: 28, color: 'bg-green-500' },
      { label: 'Founders/VCs', percentage: 15, color: 'bg-purple-500' },
      { label: 'Traders', percentage: 12, color: 'bg-orange-500' }
    ],
    engagement_times: [
      { time: '9:00 AM', engagement: 85 },
      { time: '12:00 PM', engagement: 92 },
      { time: '3:00 PM', engagement: 78 },
      { time: '6:00 PM', engagement: 95 },
      { time: '9:00 PM', engagement: 88 }
    ]
  }

  return (
    <DashboardLayout stats={mockDashboardStats}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Content Analytics
            </h1>
            <p className="text-foreground/60">
              Comprehensive insights into your crypto content performance and audience engagement
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Total Engagement</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-foreground/60">vs last week</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Avg. Engagement Rate</p>
                  <p className="text-2xl font-bold">8.3%</p>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+2.1%</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-foreground/60">Industry avg: 5.2%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Total Reach</p>
                  <p className="text-2xl font-bold">24.1K</p>
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm font-medium">-3.2%</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-foreground/60">Last 7 days</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Best Performing</p>
                  <p className="text-2xl font-bold">DeFi</p>
                </div>
                <Badge className="bg-green-500 text-white">+15%</Badge>
              </div>
              <div className="mt-2 text-xs text-foreground/60">Top content category</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Weekly Performance */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-4 w-4" />
                  Weekly Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Daily Breakdown</span>
                    <div className="flex items-center gap-4 text-xs text-foreground/60">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-brand-primary-500 rounded-full"></div>
                        Posts
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                        Engagement
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {weeklyStats.map((stat) => (
                      <div key={stat.day} className="flex items-center gap-4">
                        <div className="w-10 text-xs font-medium text-foreground/60">
                          {stat.day}
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="flex-1 bg-bg-secondary rounded-full h-2 relative overflow-hidden">
                            <div 
                              className="absolute left-0 top-0 h-full bg-brand-primary-500 rounded-full transition-all"
                              style={{ width: `${(stat.posts / 4) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-8">{stat.posts}</span>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="flex-1 bg-bg-secondary rounded-full h-2 relative overflow-hidden">
                            <div 
                              className="absolute left-0 top-0 h-full bg-brand-accent rounded-full transition-all"
                              style={{ width: `${(stat.engagement / 350) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-12">{stat.engagement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Tags */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Top Performing Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topPerformingTags.map((tag, index) => (
                  <div key={tag.tag} className="flex items-center justify-between p-2 rounded-lg hover:bg-bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-foreground/60 w-6">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-sm">#{tag.tag}</div>
                        <div className="text-xs text-foreground/60">
                          {tag.posts} posts • {tag.avg_engagement}% avg
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        tag.growth.startsWith('+') 
                          ? 'text-green-600 border-green-200' 
                          : 'text-red-600 border-red-200'
                      }`}
                    >
                      {tag.growth}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Audience Insights */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                Audience Demographics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {audienceInsights.demographics.map((demo) => (
                <div key={demo.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{demo.label}</span>
                    <span className="text-foreground/60">{demo.percentage}%</span>
                  </div>
                  <div className="w-full bg-bg-secondary rounded-full h-2">
                    <div 
                      className={`${demo.color} h-2 rounded-full transition-all`}
                      style={{ width: `${demo.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                Best Posting Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {audienceInsights.engagement_times.map((time) => (
                <div key={time.time} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">
                    {time.time}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-bg-secondary rounded-full h-2 relative overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-brand-primary-500 rounded-full transition-all"
                        style={{ width: `${time.engagement}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{time.engagement}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
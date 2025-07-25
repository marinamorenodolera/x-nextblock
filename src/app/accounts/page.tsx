'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, UserPlus, UserMinus, Search, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Account {
  id: string
  username: string
  display_name: string
  bio: string
  followers_count: number
  following_count: number
  verified: boolean
  category: 'crypto_founder' | 'vc' | 'analyst' | 'influencer' | 'media'
  is_followed: boolean
  importance_score: number
}

const mockAccounts: Account[] = [
  {
    id: '1',
    username: 'brian_armstrong',
    display_name: 'Brian Armstrong',
    bio: 'CEO & Co-Founder of Coinbase. Building an open financial system for the world.',
    followers_count: 1200000,
    following_count: 500,
    verified: true,
    category: 'crypto_founder',
    is_followed: true,
    importance_score: 9.8
  },
  {
    id: '2', 
    username: 'naval',
    display_name: 'Naval',
    bio: 'AngelList Founder. Investor. Philosopher.',
    followers_count: 2100000,
    following_count: 0,
    verified: true,
    category: 'vc',
    is_followed: true,
    importance_score: 9.5
  },
  {
    id: '3',
    username: 'balajis',
    display_name: 'Balaji Srinivasan',
    bio: 'Former CTO of Coinbase. Angel investor. Author of The Network State.',
    followers_count: 850000,
    following_count: 1200,
    verified: true,
    category: 'crypto_founder',
    is_followed: false,
    importance_score: 9.2
  },
  {
    id: '4',
    username: 'aantonop',
    display_name: 'Andreas M. Antonopoulos',
    bio: 'Bitcoin educator, author of "Mastering Bitcoin" and "The Internet of Money"',
    followers_count: 680000,
    following_count: 150,
    verified: true,
    category: 'analyst',
    is_followed: true,
    importance_score: 8.9
  },
  {
    id: '5',
    username: 'elonmusk',
    display_name: 'Elon Musk',
    bio: 'CEO of Tesla and SpaceX. Occasional crypto tweeter.',
    followers_count: 150000000,
    following_count: 300,
    verified: true,
    category: 'influencer',
    is_followed: false,
    importance_score: 8.7
  },
  {
    id: '6',
    username: 'VitalikButerin',
    display_name: 'Vitalik Buterin',
    bio: 'Co-founder of Ethereum. Proof of Stake advocate.',
    followers_count: 5200000,
    following_count: 2000,
    verified: true,
    category: 'crypto_founder',
    is_followed: true,
    importance_score: 9.9
  },
  {
    id: '7',
    username: 'cz_binance',
    display_name: 'CZ',
    bio: 'Former CEO of Binance. Building the crypto ecosystem.',
    followers_count: 8900000,
    following_count: 1500,
    verified: true,
    category: 'crypto_founder',
    is_followed: false,
    importance_score: 9.3
  },
  {
    id: '8',
    username: 'tyler',
    display_name: 'Tyler Winklevoss',
    bio: 'Co-Founder & CEO of Gemini. Bitcoin advocate.',
    followers_count: 1400000,
    following_count: 800,
    verified: true,
    category: 'crypto_founder',
    is_followed: false,
    importance_score: 8.5
  },
  {
    id: '9',
    username: 'cameron',
    display_name: 'Cameron Winklevoss',
    bio: 'Co-Founder & President of Gemini. Early Bitcoin investor.',
    followers_count: 1300000,
    following_count: 750,
    verified: true,
    category: 'crypto_founder',
    is_followed: false,
    importance_score: 8.4
  },
  {
    id: '10',
    username: 'coindesk',
    display_name: 'CoinDesk',
    bio: 'The leading source for crypto news, data and analysis.',
    followers_count: 1800000,
    following_count: 2500,
    verified: true,
    category: 'media',
    is_followed: false,
    importance_score: 8.8
  },
  {
    id: '11',
    username: 'cointelegraph',
    display_name: 'Cointelegraph',
    bio: 'Crypto and blockchain news, market analysis, and insights.',
    followers_count: 2200000,
    following_count: 1200,
    verified: true,
    category: 'media',
    is_followed: false,
    importance_score: 8.6
  },
  {
    id: '12',
    username: 'a16z',
    display_name: 'Andreessen Horowitz',
    bio: 'Venture capital firm investing in crypto and web3.',
    followers_count: 950000,
    following_count: 400,
    verified: true,
    category: 'vc',
    is_followed: false,
    importance_score: 9.1
  },
  {
    id: '13',
    username: 'alistairmilne',
    display_name: 'Alistair Milne',
    bio: 'Bitcoin advocate and digital asset fund CIO.',
    followers_count: 320000,
    following_count: 2800,
    verified: false,
    category: 'analyst',
    is_followed: false,
    importance_score: 7.8
  },
  {
    id: '14',
    username: 'danheld',
    display_name: 'Dan Held',
    bio: 'Marketing Advisor at Kraken. Bitcoin maximalist.',
    followers_count: 450000,
    following_count: 1800,
    verified: true,
    category: 'influencer',
    is_followed: false,
    importance_score: 8.2
  },
  {
    id: '15',
    username: 'saylor',
    display_name: 'Michael Saylor',
    bio: 'Chairman of MicroStrategy. Bitcoin advocate.',
    followers_count: 3200000,
    following_count: 150,
    verified: true,
    category: 'crypto_founder',
    is_followed: false,
    importance_score: 9.0
  }
]

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [showFollowedOnly, setShowFollowedOnly] = useState(false)

  const handleFollowToggle = (accountId: string) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { ...account, is_followed: !account.is_followed }
        : account
    ))
  }

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.bio.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || account.category === filterCategory
    const matchesFollowedFilter = !showFollowedOnly || account.is_followed
    
    return matchesSearch && matchesCategory && matchesFollowedFilter
  })

  const followedCount = accounts.filter(acc => acc.is_followed).length
  const totalReach = accounts
    .filter(acc => acc.is_followed)
    .reduce((sum, acc) => sum + acc.followers_count, 0)

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      crypto_founder: 'Crypto Founder',
      vc: 'VC/Investor', 
      analyst: 'Analyst',
      influencer: 'Influencer',
      media: 'Media'
    }
    return labels[category as keyof typeof labels] || category
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      crypto_founder: 'bg-brand-primary-500',
      vc: 'bg-green-500',
      analyst: 'bg-purple-500', 
      influencer: 'bg-orange-500',
      media: 'bg-blue-500'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              Followed Accounts
            </h1>
            <p className="text-foreground/60">
              Manage the crypto accounts you follow for curated content
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="h-8 w-8 text-brand-primary-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{followedCount}</p>
                <p className="text-sm text-foreground/60">Accounts Followed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-brand-accent" />
              <div>
                <p className="text-2xl font-bold text-foreground">{formatNumber(totalReach)}</p>
                <p className="text-sm text-foreground/60">Total Reach</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-8 w-8 bg-brand-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {(accounts.filter(acc => acc.is_followed).reduce((sum, acc) => sum + acc.importance_score, 0) / followedCount || 0).toFixed(1)}
                </p>
                <p className="text-sm text-foreground/60">Avg Quality Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <Input
              placeholder="Search accounts by name, username, or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={showFollowedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFollowedOnly(!showFollowedOnly)}
            >
              {showFollowedOnly ? "Followed" : "All"}
            </Button>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-md border border-border-primary bg-bg-secondary text-foreground text-sm"
            >
              <option value="all">All Categories</option>
              <option value="crypto_founder">Crypto Founders</option>
              <option value="vc">VCs/Investors</option>
              <option value="analyst">Analysts</option>
              <option value="influencer">Influencers</option>
              <option value="media">Media</option>
            </select>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid gap-4">
          {filteredAccounts.map((account) => (
            <Card key={account.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarFallback className="bg-brand-primary-500 text-white font-semibold">
                      {account.display_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{account.display_name}</h3>
                        <p className="text-sm text-foreground/60">@{account.username}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={cn("text-white text-xs", getCategoryColor(account.category))}>
                          {getCategoryLabel(account.category)}
                        </Badge>
                        <div className="text-right">
                          <div className="text-xs text-brand-accent font-medium">
                            {account.importance_score.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{account.bio}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-foreground/60">
                        <span>{formatNumber(account.followers_count)} followers</span>
                        <span>{formatNumber(account.following_count)} following</span>
                      </div>
                      
                      <Button
                        variant={account.is_followed ? "destructive" : "default"}
                        size="sm"
                        onClick={() => handleFollowToggle(account.id)}
                        className={cn(
                          "gap-2 min-h-touch",
                          account.is_followed 
                            ? "hover:bg-destructive/90" 
                            : "bg-brand-primary-500 hover:bg-brand-primary-600"
                        )}
                      >
                        {account.is_followed ? (
                          <>
                            <UserMinus className="h-4 w-4" />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No accounts found</h3>
            <p className="text-foreground/60">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
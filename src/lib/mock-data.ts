import { Tweet, News, AIGeneratedOption, CryptoAccount, DashboardStats } from './types'

// Mock crypto accounts (20 key accounts)
export const mockCryptoAccounts: CryptoAccount[] = [
  {
    id: '1',
    username: 'a16zcrypto',
    display_name: 'Andreessen Horowitz crypto',
    account_type: 'vc',
    follower_count: 850000,
    priority_level: 5,
    is_active: true,
    last_analyzed_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    username: 'VitalikButerin',
    display_name: 'Vitalik Buterin',
    account_type: 'founder',
    follower_count: 4200000,
    priority_level: 5,
    is_active: true,
    last_analyzed_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    username: 'balajis',
    display_name: 'Balaji Srinivasan',
    account_type: 'influencer',
    follower_count: 1200000,
    priority_level: 4,
    is_active: true,
    last_analyzed_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    username: 'paradigm_xyz',
    display_name: 'Paradigm',
    account_type: 'vc',
    follower_count: 320000,
    priority_level: 5,
    is_active: true,
    last_analyzed_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    username: 'brian_armstrong',
    display_name: 'Brian Armstrong',
    account_type: 'founder',
    follower_count: 2100000,
    priority_level: 4,
    is_active: true,
    last_analyzed_at: '2024-01-15T10:00:00Z'
  }
]

// Mock tweets from followed accounts (20 tweets)
export const mockGrokTweets: Tweet[] = [
  {
    id: '1',
    tweet_id: '1234567890123456789',
    author_username: 'VitalikButerin',
    author_display_name: 'Vitalik Buterin',
    content: 'Ethereum layer 2 scaling solutions have processed over $50B in total value locked this year. The ecosystem is maturing rapidly with innovations in zk-rollups and optimistic rollups showing real world adoption.',
    published_at: '2024-01-15T09:30:00Z',
    engagement_metrics: {
      likes: 12500,
      retweets: 3400,
      replies: 890,
      views: 245000,
      bookmarks: 2100
    },
    importance_score: 9.2,
    reasoning: 'Major technical milestone from Ethereum founder with significant ecosystem implications',
    source_type: 'followed',
    category: 'tech_innovation',
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '2',
    tweet_id: '1234567890123456790',
    author_username: 'a16zcrypto',
    author_display_name: 'Andreessen Horowitz crypto',
    content: 'Our portfolio company @Uniswap just announced v4 with custom hooks - enabling unprecedented DeFi innovation. This could unlock trillion dollar markets in programmable liquidity.',
    published_at: '2024-01-15T08:45:00Z',
    engagement_metrics: {
      likes: 8900,
      retweets: 2100,
      replies: 450,
      views: 180000,
      bookmarks: 1800
    },
    importance_score: 8.8,
    reasoning: 'Top VC firm announcing major DeFi development with market implications',
    source_type: 'followed',
    category: 'vc_announcement',
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '3',
    tweet_id: '1234567890123456791',
    author_username: 'balajis',
    author_display_name: 'Balaji Srinivasan',
    content: 'Bitcoin ETF inflows hit $2.1B last week. Institutional adoption accelerating faster than 2017 cycle. When sovereign wealth funds start buying, we\'ll see the real price discovery.',
    published_at: '2024-01-15T07:20:00Z',
    engagement_metrics: {
      likes: 15600,
      retweets: 4200,
      replies: 1200,
      views: 320000,
      bookmarks: 2800
    },
    importance_score: 9.0,
    reasoning: 'Institutional adoption analysis from respected crypto thought leader',
    source_type: 'followed',
    category: 'institutional_adoption',
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '4',
    tweet_id: '1234567890123456792',
    author_username: 'paradigm_xyz',
    author_display_name: 'Paradigm',
    content: 'Leading a $50M Series A in @FarcasterHQ. Social protocols will be as important as financial protocols. Decentralized social is the next frontier for crypto adoption.',
    published_at: '2024-01-15T06:15:00Z',
    engagement_metrics: {
      likes: 7800,
      retweets: 1900,
      replies: 380,
      views: 150000,
      bookmarks: 1500
    },
    importance_score: 8.5,
    reasoning: 'Major VC funding announcement in decentralized social infrastructure',
    source_type: 'followed',
    category: 'funding_announcement',
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '5',
    tweet_id: '1234567890123456793',
    author_username: 'brian_armstrong',
    author_display_name: 'Brian Armstrong',
    content: 'Coinbase Base chain now processing 2M transactions daily. L2 adoption curve looks similar to mobile app adoption 2010-2015. We\'re still early in crypto infrastructure.',
    published_at: '2024-01-15T05:30:00Z',
    engagement_metrics: {
      likes: 9200,
      retweets: 2300,
      replies: 520,
      views: 195000,
      bookmarks: 1700
    },
    importance_score: 8.3,
    reasoning: 'Major exchange CEO sharing scaling metrics and market perspective',
    source_type: 'followed',
    category: 'infrastructure_metrics',
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  }
]

// Mock trending tweets (10 viral tweets)
export const mockTrendingTweets: Tweet[] = [
  {
    id: '6',
    tweet_id: '1234567890123456794',
    author_username: 'crypto_analyst_pro',
    author_display_name: 'Crypto Analyst Pro',
    content: '🚨 BREAKING: MicroStrategy announces another $500M Bitcoin purchase. Total holdings now exceed 200,000 BTC worth $8.2B. Corporate treasuries are awakening. #Bitcoin #MicroStrategy',
    published_at: '2024-01-15T11:15:00Z',
    engagement_metrics: {
      likes: 28400,
      retweets: 8900,
      replies: 2100,
      views: 580000,
      bookmarks: 4200
    },
    importance_score: 9.1,
    reasoning: 'Viral corporate Bitcoin adoption news with high engagement',
    source_type: 'trending_grok',
    category: 'corporate_adoption',
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '7',
    tweet_id: '1234567890123456795',
    author_username: 'defi_researcher',
    author_display_name: 'DeFi Research',
    content: 'TVL across all DeFi protocols just hit $180B ATH. Ethereum: $120B, Solana: $8B, Avalanche: $6B. DeFi summer 2.0 is happening in real time. Most people still don\'t realize.',
    published_at: '2024-01-15T10:45:00Z',
    engagement_metrics: {
      likes: 18200,
      retweets: 5400,
      replies: 1300,
      views: 420000,
      bookmarks: 3100
    },
    importance_score: 8.7,
    reasoning: 'Trending DeFi milestone with significant market data',
    source_type: 'trending_perplexity',
    category: 'defi_metrics',
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '8',
    tweet_id: '1234567890123456796',
    author_username: 'ai_crypto_fusion',
    author_display_name: 'AI x Crypto',
    content: 'AI agents are now trading $2B+ daily volume on-chain. @autonolas, @morpheuslabs, @virtuals_io leading the charge. The convergence of AI and crypto is creating entirely new markets.',
    published_at: '2024-01-15T09:20:00Z',
    engagement_metrics: {
      likes: 22100,
      retweets: 6800,
      replies: 1800,
      views: 510000,
      bookmarks: 3800
    },
    importance_score: 8.9,
    reasoning: 'Viral AI x crypto trend with significant trading volume metrics',
    source_type: 'trending_grok',
    category: 'ai_crypto',
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  }
]

// Mock news articles (20 articles)
export const mockNews: News[] = [
  {
    id: '9',
    title: 'BlackRock Bitcoin ETF Surpasses $30B in Assets Under Management',
    content: 'BlackRock\'s iShares Bitcoin Trust (IBIT) has reached a milestone of $30 billion in assets under management, making it one of the fastest-growing ETFs in history...',
    url: 'https://coindesk.com/blackrock-bitcoin-etf-30b-milestone',
    source: 'CoinDesk',
    published_at: '2024-01-15T09:00:00Z',
    importance_score: 9.5,
    reasoning: 'Major institutional milestone affecting entire crypto market sentiment',
    topic_category: 'institutional_adoption',
    market_impact_score: 9.2,
    vc_relevance_score: 8.8,
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '10',
    title: 'Binance Labs Leads $80M Series B in Decentralized AI Network Gensyn',
    content: 'Binance Labs has led an $80 million Series B funding round for Gensyn, a decentralized network for AI compute...',
    url: 'https://theblock.co/binance-labs-gensyn-80m-series-b',
    source: 'The Block',
    published_at: '2024-01-15T08:30:00Z',
    importance_score: 8.8,
    reasoning: 'Major VC funding in AI x crypto convergence space',
    topic_category: 'funding_rounds',
    market_impact_score: 7.5,
    vc_relevance_score: 9.2,
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '11',
    title: 'SEC Approves First Solana ETF Filing from VanEck',
    content: 'The Securities and Exchange Commission has approved VanEck\'s application to list the first Solana-based exchange-traded fund...',
    url: 'https://decrypt.co/sec-approves-solana-etf-vaneck',
    source: 'Decrypt',
    published_at: '2024-01-15T07:45:00Z',
    importance_score: 9.0,
    reasoning: 'Regulatory breakthrough for altcoin ETF market expansion',
    topic_category: 'regulatory_developments',
    market_impact_score: 8.8,
    vc_relevance_score: 8.3,
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  },
  {
    id: '12',
    title: 'Stripe Acquires Bridge for $1.1B in Largest Stablecoin Infrastructure Deal',
    content: 'Payment giant Stripe has acquired stablecoin infrastructure company Bridge for $1.1 billion, marking the largest acquisition in stablecoin space...',
    url: 'https://coindesk.com/stripe-acquires-bridge-1-1b-stablecoin',
    source: 'CoinDesk',
    published_at: '2024-01-15T06:20:00Z',
    importance_score: 9.3,
    reasoning: 'Massive acquisition signaling mainstream stablecoin adoption',
    topic_category: 'mergers_acquisitions',
    market_impact_score: 8.9,
    vc_relevance_score: 9.5,
    selected_at: '2024-01-15T10:00:00Z',
    is_available_for_ceo: true
  }
]

// Mock AI generated options (5 options)
export const mockAIOptions: AIGeneratedOption[] = [
  {
    id: '13',
    option_number: 1,
    option_type: 'professional',
    generated_content: 'Institutional crypto adoption accelerating beyond expectations. BlackRock Bitcoin ETF hits $30B AUM while Stripe acquires Bridge for $1.1B - largest stablecoin infrastructure deal ever. The infrastructure layer is solidifying. What seemed impossible 5 years ago is now inevitable. #Bitcoin #DeFi #Stablecoins',
    ai_confidence_score: 8.7,
    estimated_engagement: 'high',
    hashtags: ['#Bitcoin', '#DeFi', '#Stablecoins'],
    character_count: 287,
    source_analysis: {
      tweets_used: 3,
      news_used: 2,
      trending_used: 1
    }
  },
  {
    id: '14',
    option_number: 2,
    option_type: 'vc_perspective',
    generated_content: 'VC perspective: We\'re witnessing the great infrastructure consolidation in crypto. $80M into Gensyn (AI compute), $50M into Farcaster (social protocols), $1.1B Bridge acquisition by Stripe. The picks and shovels phase is here. Smart money is building the rails for the next decade.',
    ai_confidence_score: 9.1,
    estimated_engagement: 'high',
    hashtags: ['#VentureCapital', '#CryptoInfrastructure', '#Web3'],
    character_count: 294,
    source_analysis: {
      tweets_used: 2,
      news_used: 3,
      trending_used: 0
    }
  },
  {
    id: '15',
    option_number: 3,
    option_type: 'market_insight',
    generated_content: 'Market insight: DeFi TVL hits $180B ATH while L2s process 2M+ daily transactions. The scaling thesis is proving out in real-time. Ethereum\'s roadmap is working. Base, Arbitrum, Optimism showing enterprise-grade performance. Mass adoption infrastructure is ready.',
    ai_confidence_score: 8.5,
    estimated_engagement: 'medium',
    hashtags: ['#DeFi', '#Layer2', '#Ethereum'],
    character_count: 264,
    source_analysis: {
      tweets_used: 4,
      news_used: 1,
      trending_used: 2
    }
  },
  {
    id: '16',
    option_number: 4,
    option_type: 'technical',
    generated_content: 'Technical breakthrough: Uniswap v4 custom hooks unlock programmable liquidity. AI agents trading $2B+ daily on-chain. zk-rollups hitting production scale. The composability thesis is accelerating beyond theoretical into trillion-dollar reality. #TechnicalAnalysis #DeFi #zkTech',
    ai_confidence_score: 8.2,
    estimated_engagement: 'medium',
    hashtags: ['#TechnicalAnalysis', '#DeFi', '#zkTech'],
    character_count: 278,
    source_analysis: {
      tweets_used: 5,
      news_used: 0,
      trending_used: 1
    }
  },
  {
    id: '17',
    option_number: 5,
    option_type: 'opinion',
    generated_content: 'Unpopular opinion: We\'re not early anymore. $30B Bitcoin ETF, $1.1B stablecoin acquisitions, AI agents trading billions daily. The infrastructure is built. The institutions are here. The next phase isn\'t about convincing skeptics - it\'s about execution at scale.',
    ai_confidence_score: 7.8,
    estimated_engagement: 'high',
    hashtags: ['#CryptoAdoption', '#UnpopularOpinion'],
    character_count: 267,
    source_analysis: {
      tweets_used: 2,
      news_used: 2,
      trending_used: 2
    }
  }
]

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  total_items_today: 60, // 30 tweets + 20 news + 10 trending
  ceo_selections_made: 0,
  posts_published: 0,
  avg_engagement_score: 8.4
}

// Helper function to get all content items
export function getAllMockContent(): (Tweet | News)[] {
  return [
    ...mockGrokTweets,
    ...mockTrendingTweets,
    ...mockNews
  ].sort((a, b) => new Date(b.selected_at).getTime() - new Date(a.selected_at).getTime())
}

// Helper function to get content by type
export function getMockContentByType(type: 'tweets' | 'news' | 'all'): (Tweet | News)[] {
  switch (type) {
    case 'tweets':
      return [...mockGrokTweets, ...mockTrendingTweets]
    case 'news':
      return mockNews
    case 'all':
    default:
      return getAllMockContent()
  }
}

// Helper function to simulate API delay
export function simulateApiDelay(ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
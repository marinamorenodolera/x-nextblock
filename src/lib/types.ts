// Core content types for Phase 1 mock data
export interface Tweet {
  id: string
  tweet_id: string
  author_username: string
  author_display_name?: string
  content: string
  published_at: string
  engagement_metrics: {
    likes: number
    retweets: number
    replies: number
    views?: number
    bookmarks?: number
  }
  importance_score: number
  reasoning: string
  source_type: 'followed' | 'trending_grok' | 'trending_perplexity'
  category?: string
  selected_at: string
  is_available_for_ceo: boolean
}

export interface News {
  id: string
  title: string
  content?: string
  url: string
  source: string
  published_at: string
  importance_score: number
  reasoning: string
  topic_category: string
  market_impact_score: number
  vc_relevance_score: number
  selected_at: string
  is_available_for_ceo: boolean
}

export interface AIGeneratedOption {
  id: string
  option_number: number
  option_type: 'professional' | 'market_insight' | 'vc_perspective' | 'technical' | 'opinion'
  generated_content: string
  ai_confidence_score: number
  estimated_engagement: 'high' | 'medium' | 'low'
  hashtags: string[]
  character_count: number
  source_analysis: {
    tweets_used: number
    news_used: number
    trending_used: number
  }
}

export interface PublishedPost {
  id: string
  original_ai_option_id: string
  final_content: string
  ceo_edits?: {
    original_content: string
    changes_made: string[]
  }
  platform: 'twitter' | 'linkedin'
  post_url?: string
  published_at: string
  engagement_metrics?: {
    likes: number
    retweets: number
    replies: number
    views?: number
    impressions?: number
  }
  performance_score?: number
  last_metrics_refresh?: string
}

export interface CryptoAccount {
  id: string
  username: string
  display_name?: string
  account_type: 'vc' | 'founder' | 'influencer' | 'project'
  follower_count?: number
  priority_level: 1 | 2 | 3 | 4 | 5
  is_active: boolean
  last_analyzed_at?: string
}

// Selection and workflow types
export interface CEOSelection {
  id: string
  session_id: string
  selected_grok_tweets: string[]
  selected_perplexity_tweets: string[]
  selected_news: string[]
  selection_context?: string
  total_items_selected: number
  created_at: string
}

// UI State types
export interface SelectionState {
  selectedItems: string[]
  count: number
  maxSelection?: number
}

export interface FeedFilters {
  source_type?: 'all' | 'followed' | 'trending_grok' | 'trending_perplexity'
  content_type?: 'all' | 'tweets' | 'news'
  importance_score_min?: number
  category?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
  success: boolean
}

// Processing states
export type ProcessingState = 'idle' | 'loading' | 'processing' | 'complete' | 'error'

export interface AIProcessingStatus {
  state: ProcessingState
  message?: string
  progress?: number
  estimated_time?: number
}

// Theme and branding types
export type ThemeMode = 'dark' | 'light' | 'cyberpunk'

export interface BrandingConfig {
  theme: ThemeMode
  primary_color: string
  logo_url?: string
  company_name: string
}

// Mock data generation types
export interface MockDataConfig {
  tweets_count: number
  news_count: number
  trending_tweets_count: number
  ai_options_count: number
}

// Error handling
export interface AppError {
  code: string
  message: string
  details?: unknown
  timestamp: string
}

// Navigation and layout types
export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
  badge?: number
  is_active?: boolean
  isPrimary?: boolean
  description?: string
}

export interface DashboardStats {
  total_items_today: number
  ceo_selections_made: number
  posts_published: number
  avg_engagement_score: number
}

// Form types
export interface PostEditorData {
  content: string
  hashtags: string[]
  character_count: number
  estimated_engagement: 'high' | 'medium' | 'low'
}
// Helper functions for consistent date formatting to prevent hydration errors

export function formatDateForDisplay(dateString: string): string {
  // Use a consistent format that works the same on server and client
  const date = new Date(dateString)
  
  // Use ISO format parts to avoid locale differences
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  
  return `${month}/${day}/${year}`
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }
}

export function isToday(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate()
}
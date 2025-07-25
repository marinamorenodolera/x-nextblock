'use client'

import { useState, useCallback, useEffect } from 'react'
import { SelectionState } from '@/lib/types'

interface UseSelectionProps {
  maxSelection?: number
  initialSelection?: string[]
  onSelectionChange?: (count: number) => void
}

export function useSelection({ maxSelection, initialSelection = [], onSelectionChange }: UseSelectionProps = {}) {
  const [selectedItems, setSelectedItems] = useState<string[]>(initialSelection)

  // Notify parent of selection changes
  useEffect(() => {
    onSelectionChange?.(selectedItems.length)
  }, [selectedItems.length, onSelectionChange])

  const toggleSelection = useCallback((id: string) => {
    setSelectedItems(prev => {
      const isCurrentlySelected = prev.includes(id)
      
      if (isCurrentlySelected) {
        // Remove from selection
        return prev.filter(item => item !== id)
      } else {
        // Add to selection (check max limit)
        if (maxSelection && prev.length >= maxSelection) {
          // Replace the oldest selection with new one
          return [id, ...prev.slice(0, maxSelection - 1)]
        }
        return [...prev, id]
      }
    })
  }, [maxSelection])

  const addToSelection = useCallback((id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) return prev
      
      if (maxSelection && prev.length >= maxSelection) {
        return [id, ...prev.slice(0, maxSelection - 1)]
      }
      return [...prev, id]
    })
  }, [maxSelection])

  const removeFromSelection = useCallback((id: string) => {
    setSelectedItems(prev => prev.filter(item => item !== id))
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedItems([])
  }, [])

  const isSelected = useCallback((id: string) => {
    return selectedItems.includes(id)
  }, [selectedItems])

  const canSelectMore = maxSelection ? selectedItems.length < maxSelection : true

  const selectionState: SelectionState = {
    selectedItems,
    count: selectedItems.length,
    maxSelection
  }

  return {
    selectedItems,
    count: selectedItems.length,
    maxSelection,
    canSelectMore,
    toggleSelection,
    addToSelection,
    removeFromSelection,
    clearSelection,
    isSelected,
    selectionState
  }
}
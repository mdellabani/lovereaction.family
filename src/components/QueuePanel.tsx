'use client'
import { PlayList } from '@/types/audio'
import { Music, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'

interface QueuePanelProps {
  open: boolean
  playlist: PlayList
  currentIndex: number
  onClose: () => void
  onTrackSelect: (index: number) => void
}

const EqualizerBars = () => (
  <div className="absolute inset-0 flex items-end justify-center gap-[2px] rounded bg-black/40 p-1">
    {[0, 150, 75, 200].map((delay, i) => (
      <div
        className="w-[3px] animate-pulse rounded-sm bg-white"
        key={i}
        style={{
          height: `${40 + (i % 2) * 30}%`,
          animationDelay: `${delay}ms`,
          animationDuration: '600ms',
        }}
      />
    ))}
  </div>
)

const QueuePanel = ({
  open,
  playlist,
  currentIndex,
  onClose,
  onTrackSelect,
}: QueuePanelProps) => {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartY = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current
    if (delta > 0) {
      setDragY(delta)
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    if (dragY > 120) {
      onClose()
    }
    setDragY(0)
  }, [dragY, onClose])

  if (!open) return null

  const trackList = (
    <div className="flex-1 overflow-y-auto">
      {playlist.tracks.map((track, index) => {
        const isCurrent = index === currentIndex
        const trackImage = track.imageUrl || playlist.imageUrl
        return (
          <button
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              isCurrent ? 'bg-purple-100 dark:bg-purple-900/30' : ''
            }`}
            key={track.id}
            onClick={() => onTrackSelect(index)}
          >
            <div className="relative h-10 w-10 flex-shrink-0">
              {trackImage ? (
                <Image
                  alt={track.title || 'Track'}
                  className="h-10 w-10 rounded object-cover"
                  height={40}
                  src={trackImage}
                  width={40}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
                  <Music className="text-gray-400" size={16} />
                </div>
              )}
              {isCurrent && <EqualizerBars />}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm ${
                  isCurrent
                    ? 'font-bold text-purple-600 dark:text-purple-400'
                    : 'font-medium text-gray-900 dark:text-gray-100'
                }`}
              >
                {track.title}
              </p>
              <p
                className={`truncate text-xs ${
                  isCurrent
                    ? 'text-purple-500 dark:text-purple-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {track.artist}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )

  return (
    <>
      {/* Mobile: Slide-up panel */}
      <div className="fixed inset-0 z-[60] sm:hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Panel */}
        <div
          className="absolute bottom-0 left-0 right-0 flex max-h-[70vh] flex-col rounded-t-2xl bg-white dark:bg-gray-900"
          style={{
            transform: isDragging ? `translateY(${dragY}px)` : 'translateY(0)',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
        >
          {/* Drag handle */}
          <div className="flex justify-center pb-1 pt-3">
            <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
          </div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 pb-3 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {playlist.title || 'Queue'}
            </h3>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          {trackList}
        </div>
      </div>

      {/* Desktop: Side drawer — no backdrop, site stays interactive */}
      <div className="fixed bottom-0 right-0 top-0 z-[60] hidden w-80 flex-col border-l border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900 sm:flex">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {playlist.title || 'Queue'}
            </h3>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          {trackList}
        </div>
      </div>
    </>
  )
}

export default QueuePanel

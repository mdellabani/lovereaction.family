# Player Rework Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the audio player to be responsive (Spotify-inspired) with a gradient progress line and a "next up" queue panel (slide-up on mobile, side drawer on desktop).

**Architecture:** Three components: `AudioPlayer.tsx` (reworked responsive layout), `QueuePanel.tsx` (new queue drawer/panel), `PlayerContainer.tsx` (updated to host both). The player uses existing `react-player` for audio, `rc-slider` for seeking, `lucide-react` for icons. Queue state (open/closed) lives in `AudioPlayer` local state.

**Tech Stack:** Next.js 14, React, Tailwind CSS 3, rc-slider, react-player, lucide-react, next-themes (dark mode)

---

### Task 1: Rework AudioPlayer — Desktop Layout

**Files:**
- Modify: `src/components/AudioPlayer.tsx` (full rewrite)

**Step 1: Rewrite AudioPlayer with responsive desktop layout**

Replace the entire `AudioPlayer.tsx` with a responsive layout. Desktop is a single row:
`[Gradient line top] [Art + Title | Controls | Slider | Volume | Queue btn]`

```tsx
'use client'
import { usePlayer } from '@/context/PlayerContext'
import {
  ListMusic,
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import QueuePanel from './QueuePanel'

const AudioPlayer = () => {
  const {
    playing,
    loop,
    volume,
    muted,
    played,
    playlist,
    trackIndex,
    nextTrack,
    previousTrack,
    togglePlay,
    toggleLoop,
    toggleMute,
    setVolume,
    setPlayed,
    setDuration,
    setTrackIndex,
  } = usePlayer()
  const playerRef = useRef<ReactPlayer>(null)
  const [isSeeking, setIsSeeking] = useState(false)
  const [queueOpen, setQueueOpen] = useState(false)
  const currentTrack = playlist?.tracks[trackIndex]
  const image = playlist?.imageUrl || currentTrack?.imageUrl

  const handleSeek = (value: number | number[]) => {
    const v = value as number
    setIsSeeking(true)
    setPlayed(v)
  }

  const handleSeekComplete = (value: number | number[]) => {
    const v = value as number
    setPlayed(v)
    playerRef.current?.seekTo(v)
    setIsSeeking(false)
  }

  const handlePrev = () => {
    if (played < 0.01) {
      previousTrack()
    } else {
      playerRef.current?.seekTo(0)
    }
  }

  const handleNext = () => {
    setPlayed(0)
    nextTrack()
  }

  const handleQueueTrackSelect = (index: number) => {
    setTrackIndex(index)
    setPlayed(0)
  }

  return (
    <>
      <div className="w-full border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] dark:border-gray-700 dark:bg-gray-900 dark:shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
        {/* Gradient progress line at top */}
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-purple-400 via-red-300 via-yellow-200 to-green-300 transition-[width] duration-150"
            style={{ width: `${played * 100}%` }}
          />
        </div>

        {/* Mobile layout: 2 rows */}
        <div className="flex flex-col sm:hidden">
          {/* Row 1: art + info + play + queue */}
          <div className="flex items-center gap-3 px-3 py-2">
            {image && (
              <Image
                alt="Album Art"
                className="size-10 rounded"
                height={40}
                src={image}
                width={40}
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold dark:text-white">
                {currentTrack?.title}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {currentTrack?.artist}
              </p>
            </div>
            <button
              className="flex size-10 items-center justify-center rounded-full text-gray-700 active:bg-gray-200 dark:text-gray-300 dark:active:bg-gray-700"
              onClick={togglePlay}
            >
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <button
              className="flex size-10 items-center justify-center rounded-full text-gray-700 active:bg-gray-200 dark:text-gray-300 dark:active:bg-gray-700"
              onClick={() => setQueueOpen(true)}
            >
              <ListMusic size={20} />
            </button>
          </div>
          {/* Row 2: progress slider */}
          <div className="px-3 pb-2">
            <Slider
              className="!p-0"
              max={1}
              min={0}
              step={0.001}
              styles={{
                track: { backgroundColor: '#a855f7', height: 3 },
                rail: { height: 3 },
                handle: { width: 12, height: 12, marginTop: -4.5, opacity: 1 },
              }}
              value={played}
              onChange={handleSeek}
              onChangeComplete={handleSeekComplete}
            />
          </div>
        </div>

        {/* Desktop layout: single row */}
        <div className="hidden items-center gap-4 px-4 py-2 sm:flex">
          {/* Track info */}
          <div className="flex min-w-0 items-center gap-3" style={{ width: '220px' }}>
            {image && (
              <Image
                alt="Album Art"
                className="size-12 shrink-0 rounded"
                height={48}
                src={image}
                width={48}
              />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold dark:text-white">
                {currentTrack?.title}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {currentTrack?.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              className="flex size-9 items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={handlePrev}
            >
              <SkipBack size={18} />
            </button>
            <button
              className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              onClick={togglePlay}
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              className="flex size-9 items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={handleNext}
            >
              <SkipForward size={18} />
            </button>
            <button
              className={`flex size-9 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${loop ? 'text-purple-500' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={toggleLoop}
            >
              <Repeat size={16} />
            </button>
          </div>

          {/* Progress slider */}
          <div className="flex-1">
            <Slider
              max={1}
              min={0}
              step={0.001}
              styles={{
                track: { backgroundColor: '#a855f7', height: 4 },
                rail: { height: 4 },
                handle: { width: 14, height: 14, marginTop: -5, opacity: 1 },
              }}
              value={played}
              onChange={handleSeek}
              onChangeComplete={handleSeekComplete}
            />
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              className="flex size-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={toggleMute}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div style={{ width: '80px' }}>
              <Slider
                max={1}
                min={0}
                step={0.01}
                styles={{
                  track: { backgroundColor: '#a855f7', height: 3 },
                  rail: { height: 3 },
                  handle: { width: 12, height: 12, marginTop: -4.5, opacity: 1 },
                }}
                value={muted ? 0 : volume}
                onChange={(v) => setVolume(v as number)}
              />
            </div>
          </div>

          {/* Queue button */}
          <button
            className={`flex size-9 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${queueOpen ? 'text-purple-500' : 'text-gray-700 dark:text-gray-300'}`}
            onClick={() => setQueueOpen(!queueOpen)}
          >
            <ListMusic size={20} />
          </button>
        </div>
      </div>

      {/* Hidden audio element */}
      <ReactPlayer
        height="0"
        loop={loop}
        muted={muted}
        playing={playing}
        ref={playerRef}
        url={currentTrack?.url}
        volume={volume}
        width="0"
        onDuration={(duration) => setDuration(duration)}
        onEnded={nextTrack}
        onProgress={({ played }) => {
          if (!isSeeking) setPlayed(played)
        }}
      />

      {/* Queue panel */}
      <QueuePanel
        currentIndex={trackIndex}
        open={queueOpen}
        playlist={playlist}
        onClose={() => setQueueOpen(false)}
        onTrackSelect={handleQueueTrackSelect}
      />
    </>
  )
}

export default AudioPlayer
```

**Step 2: Verify it compiles (QueuePanel won't exist yet — create stub)**

Create a minimal `QueuePanel.tsx` stub so it compiles.

**Step 3: Commit**
```bash
git add src/components/AudioPlayer.tsx src/components/QueuePanel.tsx
git commit -m "feat(player): rework AudioPlayer with responsive Spotify-style layout"
```

---

### Task 2: Create QueuePanel Component

**Files:**
- Create: `src/components/QueuePanel.tsx`

**Step 1: Build QueuePanel with mobile slide-up + desktop side drawer**

The panel uses:
- Mobile (`sm:hidden`): slide-up overlay covering ~70% screen, swipe-down to dismiss via touch events
- Desktop (`hidden sm:block`): side drawer from right, ~320px wide, click outside to close

```tsx
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

const QueuePanel = ({
  open,
  playlist,
  currentIndex,
  onClose,
  onTrackSelect,
}: QueuePanelProps) => {
  const tracks = playlist?.tracks ?? []

  // Swipe-down dismissal state for mobile
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - startY.current
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

  const trackList = (
    <div className="flex flex-col gap-1 overflow-y-auto p-3">
      {tracks.map((track, index) => {
        const isActive = index === currentIndex
        return (
          <button
            className={`flex items-center gap-3 rounded-lg p-2 text-left transition-colors ${
              isActive
                ? 'bg-purple-100 dark:bg-purple-900/30'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            key={track.id}
            onClick={() => onTrackSelect(index)}
          >
            <div className="relative size-10 shrink-0 overflow-hidden rounded">
              {track.imageUrl ? (
                <Image
                  alt={track.title ?? ''}
                  className="object-cover"
                  fill
                  src={track.imageUrl}
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <Music size={16} />
                </div>
              )}
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="flex items-end gap-0.5">
                    <span className="inline-block w-0.5 animate-pulse bg-white" style={{ height: '10px', animationDelay: '0ms' }} />
                    <span className="inline-block w-0.5 animate-pulse bg-white" style={{ height: '14px', animationDelay: '150ms' }} />
                    <span className="inline-block w-0.5 animate-pulse bg-white" style={{ height: '8px', animationDelay: '300ms' }} />
                    <span className="inline-block w-0.5 animate-pulse bg-white" style={{ height: '12px', animationDelay: '100ms' }} />
                  </div>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm ${isActive ? 'font-bold text-purple-700 dark:text-purple-300' : 'font-medium dark:text-white'}`}>
                {track.title}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {track.artist}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )

  if (!open) return null

  return (
    <>
      {/* Mobile: slide-up panel */}
      <div className="fixed inset-0 z-50 sm:hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Panel */}
        <div
          className="absolute inset-x-0 bottom-0 flex max-h-[70vh] flex-col rounded-t-2xl bg-white shadow-2xl dark:bg-gray-900"
          style={{
            transform: `translateY(${dragY}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
        >
          {/* Drag handle */}
          <div className="flex justify-center pb-2 pt-3">
            <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
          </div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 pb-3 dark:border-gray-700">
            <h3 className="font-semibold dark:text-white">
              {playlist?.title || 'Queue'}
            </h3>
            <button
              className="flex size-8 items-center justify-center rounded-full text-gray-500 active:bg-gray-200 dark:active:bg-gray-700"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          {/* Track list */}
          {trackList}
        </div>
      </div>

      {/* Desktop: side drawer */}
      <div className="fixed inset-0 z-50 hidden sm:block">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Drawer */}
        <div className="absolute bottom-0 right-0 top-0 flex w-80 flex-col border-l border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <h3 className="font-semibold dark:text-white">
              {playlist?.title || 'Queue'}
            </h3>
            <button
              className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          {/* Track list */}
          {trackList}
        </div>
      </div>
    </>
  )
}

export default QueuePanel
```

**Step 2: Verify it compiles**

Run: `npm run build` or `npx next build` — should compile with no errors.

**Step 3: Commit**
```bash
git add src/components/QueuePanel.tsx
git commit -m "feat(player): add QueuePanel with mobile slide-up and desktop side drawer"
```

---

### Task 3: Update PlayerContainer

**Files:**
- Modify: `src/components/PlayerContainer.tsx`

**Step 1: Update PlayerContainer to accommodate the new player height**

The new player is taller on mobile (two rows). Update the container:

```tsx
'use client'
import React from 'react'
import { usePlayer } from '@/context/PlayerContext'
import AudioPlayer from './AudioPlayer'

const PlayerContainer = () => {
  const { playlist, showPlayer } = usePlayer()

  if (!playlist || !showPlayer) {
    return null
  }

  return (
    <>
      {/* Spacer so page content isn't hidden behind fixed player */}
      <div className="h-24 sm:h-16" />
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <AudioPlayer />
      </div>
    </>
  )
}

export default PlayerContainer
```

**Step 2: Verify the player renders properly on both mobile and desktop**

Run: `npm run dev` — navigate to a page with a playlist, play a track.

**Step 3: Commit**
```bash
git add src/components/PlayerContainer.tsx
git commit -m "feat(player): update PlayerContainer for responsive player layout"
```

---

### Task 4: Polish and Test

**Step 1: Test mobile queue panel**
- Open on mobile viewport, tap queue icon
- Panel slides up, swipe down to dismiss
- Tap a track to switch playback

**Step 2: Test desktop queue panel**
- Open on desktop, click queue icon
- Drawer slides from right
- Click outside to close
- Click a track to switch playback

**Step 3: Test dark mode**
- Toggle dark mode, verify player and queue panel follow theme

**Step 4: Final commit**
```bash
git add -A
git commit -m "feat(player): polish responsive player and queue panel"
```

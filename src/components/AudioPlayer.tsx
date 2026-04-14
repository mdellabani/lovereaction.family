'use client'
import { usePlayer } from '@/context/PlayerContext'
import {
  ListMusic,
  Music,
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
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import QueuePanel from './QueuePanel'

const sliderStyles = {
  track: { backgroundColor: '#a855f7', height: 4 },
  rail: { backgroundColor: '#d1d5db', height: 4 },
  handle: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
    height: 12,
    width: 12,
    marginTop: -4,
    opacity: 1,
  },
}

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
    refreshPodcastUrls,
  } = usePlayer()
  const playerRef = useRef<ReactPlayer>(null)
  const [isSeeking, setIsSeeking] = useState(false)
  const [queueOpen, setQueueOpen] = useState(false)
  const lastProgressRef = useRef(0)
  const stallTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const refreshingRef = useRef(false)
  const currentTrack = playlist?.tracks[trackIndex]
  const image = currentTrack?.imageUrl || playlist?.imageUrl

  const recoverPlayback = useCallback(() => {
    if (!playerRef.current || !playing) return
    const currentTime = playerRef.current.getCurrentTime()
    playerRef.current.seekTo(currentTime, 'seconds')
    togglePlay()
    setTimeout(() => togglePlay(), 300)
  }, [playing, togglePlay])

  // Detect stalled playback: if playing but progress hasn't changed in 8s
  useEffect(() => {
    if (stallTimerRef.current) clearInterval(stallTimerRef.current)

    if (playing && !isSeeking) {
      stallTimerRef.current = setInterval(() => {
        const current = playerRef.current?.getCurrentTime() ?? 0
        if (
          playing &&
          current > 0 &&
          Math.abs(current - lastProgressRef.current) < 0.1
        ) {
          recoverPlayback()
        }
        lastProgressRef.current = current
      }, 8000)
    }

    return () => {
      if (stallTimerRef.current) clearInterval(stallTimerRef.current)
    }
  }, [playing, isSeeking, recoverPlayback])

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

  const handleTrackSelect = (index: number) => {
    setPlayed(0)
    setTrackIndex(index)
  }

  return (
    <>
      <div className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] dark:bg-gray-900 dark:shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
        {/* Gradient progress line at top edge */}
        <div className="relative h-1 w-full bg-gray-200 dark:bg-gray-700">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-400 via-red-300 via-50% to-green-300"
            style={{ width: `${played * 100}%` }}
          />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          {/* Desktop layout (sm+) */}
          <div className="hidden items-center gap-4 px-4 py-2 sm:flex">
            {/* Album art + track info */}
            <div className="flex min-w-0 items-center gap-3">
              {image ? (
                <Image
                  alt={currentTrack?.title || 'Album Art'}
                  className="h-10 w-10 flex-shrink-0 rounded"
                  height={40}
                  src={image}
                  width={40}
                />
              ) : (
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
                  <Music className="text-gray-400" size={20} />
                </div>
              )}
              <div className="min-w-0 max-w-[180px]">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {currentTrack?.title}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {currentTrack?.artist}
                </p>
              </div>
            </div>

            {/* Controls: prev | play | next | loop */}
            <div className="flex items-center gap-1">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={handlePrev}
              >
                <SkipBack size={16} />
              </button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                onClick={togglePlay}
              >
                {playing ? (
                  <Pause size={16} />
                ) : (
                  <Play className="ml-0.5" size={16} />
                )}
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={handleNext}
              >
                <SkipForward size={16} />
              </button>
              <button
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${loop ? 'text-purple-500' : 'text-gray-700 dark:text-gray-300'}`}
                onClick={toggleLoop}
              >
                <Repeat size={16} />
              </button>
            </div>

            {/* Progress slider */}
            <div className="min-w-0 flex-1">
              <Slider
                max={1}
                min={0}
                step={0.001}
                styles={sliderStyles}
                value={played}
                onChange={(value) => {
                  setIsSeeking(true)
                  setPlayed(value as number)
                }}
                onChangeComplete={(value) => {
                  setPlayed(value as number)
                  playerRef.current?.seekTo(value as number)
                  setIsSeeking(false)
                }}
              />
            </div>

            {/* Volume */}
            <div className="flex items-center gap-1">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={toggleMute}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <div className="w-20">
                <Slider
                  max={1}
                  min={0}
                  step={0.01}
                  styles={sliderStyles}
                  value={muted ? 0 : volume}
                  onChange={(value) => setVolume(value as number)}
                />
              </div>
            </div>

            {/* Queue button */}
            <button
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                queueOpen
                  ? 'text-purple-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setQueueOpen(!queueOpen)}
            >
              <ListMusic size={16} />
            </button>
          </div>

          {/* Mobile layout (< sm) */}
          <div className="sm:hidden">
            {/* Row 1: Art + Title/Artist + Play + Queue */}
            <div className="flex items-center gap-3 px-3 py-2">
              {image ? (
                <Image
                  alt={currentTrack?.title || 'Album Art'}
                  className="h-10 w-10 flex-shrink-0 rounded"
                  height={40}
                  src={image}
                  width={40}
                />
              ) : (
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
                  <Music className="text-gray-400" size={20} />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {currentTrack?.title}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {currentTrack?.artist}
                </p>
              </div>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                onClick={togglePlay}
              >
                {playing ? (
                  <Pause size={16} />
                ) : (
                  <Play className="ml-0.5" size={16} />
                )}
              </button>
              <button
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  queueOpen
                    ? 'text-purple-500'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setQueueOpen(!queueOpen)}
              >
                <ListMusic size={16} />
              </button>
            </div>

            {/* Row 2: Full-width progress slider */}
            <div className="px-3 pb-2">
              <Slider
                max={1}
                min={0}
                step={0.001}
                styles={sliderStyles}
                value={played}
                onChange={(value) => {
                  setIsSeeking(true)
                  setPlayed(value as number)
                }}
                onChangeComplete={(value) => {
                  setPlayed(value as number)
                  playerRef.current?.seekTo(value as number)
                  setIsSeeking(false)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden ReactPlayer */}
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
        onError={() => {
          const isSoundCloud = currentTrack?.url?.includes('sndcdn.com')
          if (isSoundCloud && !refreshingRef.current) {
            refreshingRef.current = true
            refreshPodcastUrls()
              .then(() => {
                setTimeout(() => recoverPlayback(), 1000)
              })
              .finally(() => {
                refreshingRef.current = false
              })
          } else if (!isSoundCloud) {
            setTimeout(() => recoverPlayback(), 2000)
          }
        }}
        onProgress={({ played }) => {
          if (!isSeeking) setPlayed(played)
        }}
      />

      {/* Queue Panel */}
      {playlist && (
        <QueuePanel
          currentIndex={trackIndex}
          open={queueOpen}
          playlist={playlist}
          onClose={() => setQueueOpen(false)}
          onTrackSelect={handleTrackSelect}
        />
      )}
    </>
  )
}

export default AudioPlayer

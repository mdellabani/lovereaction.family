'use client'
import { usePlayer } from '@/context/PlayerContext'
import {
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
import { useRef } from 'react'
import ReactPlayer from 'react-player'

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
  } = usePlayer()
  const playerRef = useRef<ReactPlayer>(null)
  const currentTrack = playlist?.tracks[trackIndex]
  const image = playlist?.imageUrl || currentTrack?.imageUrl

  return (
    <div className="flex w-full items-center justify-center bg-gray-100 px-6 py-3 shadow-lg">
      <div className="flex items-center space-x-4">
        <button
          className="flex h-10 w-10 items-center justify-center"
          onClick={previousTrack}
        >
          <SkipBack size={20} />
        </button>
        <button
          className="flex h-12 w-12 items-center justify-center"
          onClick={() => togglePlay()}
        >
          {playing ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center"
          onClick={nextTrack}
        >
          <SkipForward size={20} />
        </button>
        <button
          className={`flex h-10 w-10 items-center justify-center ${loop ? 'text-blue-500' : ''}`}
          onClick={() => toggleLoop()}
        >
          <Repeat size={20} />
        </button>
      </div>

      <div className="mx-10 w-[500px]">
        <Slider
          max={1}
          min={0}
          step={0.01}
          value={played}
          onChange={(value) => setPlayed(value as number)}
          onChangeComplete={(value) =>
            playerRef.current?.seekTo(value as number)
          }
          onFocus={() => playerRef.current?.setState({ seeking: true })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          className="flex h-8 w-8 items-center justify-center"
          onClick={() => toggleMute()}
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          className="w-20"
          max="1"
          min="0"
          step="0.01"
          type="range"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>

      <div className="ml-6 flex items-center">
        <Image
          alt="Album Art"
          className="h-14 w-14 rounded-md"
          height={56}
          src={image}
          width={56}
        />
        <div className="ml-2 w-[180px] overflow-hidden">
          <p className="truncate text-sm font-bold">{currentTrack?.title}</p>
          <p className="truncate text-xs text-gray-500">
            {currentTrack?.artist}
          </p>
        </div>
      </div>
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
        onProgress={({ played }) => setPlayed(played)}
        onSeek={(played) => setPlayed(played)}
      />
    </div>
  )
}

export default AudioPlayer

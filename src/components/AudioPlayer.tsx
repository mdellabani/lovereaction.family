'use client'
import React, { useRef, useEffect, useReducer } from 'react'
import ReactPlayer from 'react-player'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Repeat,
  SkipBack,
  SkipForward,
} from 'lucide-react'
import { usePlayer } from '@/context/PlayerContext'

interface PlayerState {
  playing: boolean
  loop: boolean
  volume: number
  muted: boolean
  played: number
  duration: number
}

type PlayerAction =
  | { type: 'TOGGLE_PLAY' }
  | { type: 'TOGGLE_LOOP' }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PLAYED'; payload: number }
  | { type: 'SET_DURATION'; payload: number }

const playerReducer = (
  state: PlayerState,
  action: PlayerAction,
): PlayerState => {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return { ...state, playing: !state.playing }
    case 'TOGGLE_LOOP':
      return { ...state, loop: !state.loop }
    case 'TOGGLE_MUTE':
      return { ...state, muted: !state.muted }
    case 'SET_VOLUME':
      return { ...state, volume: action.payload }
    case 'SET_PLAYED':
      return { ...state, played: action.payload }
    case 'SET_DURATION':
      return { ...state, duration: action.payload }
    default:
      return state
  }
}

const AudioPlayer = () => {
  const { playlist, trackIndex, nextTrack, previousTrack } = usePlayer()
  const currentTrack = playlist?.tracks[trackIndex]
  const image = playlist?.imageUrl || currentTrack?.imageUrl
  const playerRef = useRef<ReactPlayer | null>(null)

  const [state, dispatch] = useReducer(playerReducer, {
    playing: false,
    loop: false,
    volume: 0.8,
    muted: false,
    played: 0,
    duration: 0,
  })

  useEffect(() => {
    dispatch({ type: 'TOGGLE_PLAY' })
  }, [trackIndex])

  return (
    <div className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-2 shadow-lg">
      <div className="flex items-center space-x-4">
        <button onClick={previousTrack}>
          <SkipBack size={20} />
        </button>
        <button onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}>
          {state.playing ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={nextTrack}>
          <SkipForward size={20} />
        </button>
        <button
          className={state.loop ? 'text-blue-500' : ''}
          onClick={() => dispatch({ type: 'TOGGLE_LOOP' })}
        >
          <Repeat size={20} />
        </button>
      </div>

      <div className="mx-80">
        <Slider
          max={1}
          min={0}
          step={0.01}
          value={state.played}
          onChange={(value) => dispatch({ type: 'SET_PLAYED', payload: value })}
        />
      </div>

      <button onClick={() => dispatch({ type: 'TOGGLE_MUTE' })}>
        {state.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <input
        className="mx-2 w-16"
        max="1"
        min="0"
        step="0.01"
        type="range"
        value={state.volume}
        onChange={(e) =>
          dispatch({ type: 'SET_VOLUME', payload: parseFloat(e.target.value) })
        }
      />

      <div className="ml-4 flex items-center">
        <Image
          alt="Album Art"
          className="rounded-md"
          height={50}
          src={image}
          width={50}
        />
        <div className="ml-2">
          <p className="text-sm font-bold">{currentTrack?.title}</p>
          <p className="text-xs text-gray-500">{currentTrack?.artist}</p>
        </div>
      </div>

      <ReactPlayer
        height="0"
        loop={state.loop}
        muted={state.muted}
        playing={state.playing}
        ref={playerRef}
        url={currentTrack?.url}
        volume={state.volume}
        width="0"
        onDuration={(duration) =>
          dispatch({ type: 'SET_DURATION', payload: duration })
        }
        onEnded={nextTrack}
        onProgress={({ played }) =>
          dispatch({ type: 'SET_PLAYED', payload: played })
        }
      />
    </div>
  )
}

export default AudioPlayer

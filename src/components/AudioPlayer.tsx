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
import { useEffect, useReducer } from 'react'

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
    console.log('Playing track:', trackIndex)
  }, [trackIndex])

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
          onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
        >
          {state.playing ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center"
          onClick={nextTrack}
        >
          <SkipForward size={20} />
        </button>
        <button
          className={`flex h-10 w-10 items-center justify-center ${state.loop ? 'text-blue-500' : ''}`}
          onClick={() => dispatch({ type: 'TOGGLE_LOOP' })}
        >
          <Repeat size={20} />
        </button>
      </div>

      <div className="mx-10 w-[500px]">
        <Slider
          max={1}
          min={0}
          step={0.01}
          value={state.played}
          onChange={(value) =>
            dispatch({ type: 'SET_PLAYED', payload: value as number })
          }
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          className="flex h-8 w-8 items-center justify-center"
          onClick={() => dispatch({ type: 'TOGGLE_MUTE' })}
        >
          {state.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          className="w-20"
          max="1"
          min="0"
          step="0.01"
          type="range"
          value={state.volume}
          onChange={(e) =>
            dispatch({
              type: 'SET_VOLUME',
              payload: parseFloat(e.target.value),
            })
          }
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
    </div>
  )
}

export default AudioPlayer

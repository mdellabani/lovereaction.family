import React, { ReactNode, createContext, useContext, useReducer } from 'react'
import { TrackInfo } from '../types/audio'

interface PlayerState {
  playlist: TrackInfo[]
  trackId: number
  trackIndex: number
  showPlayer: boolean
}

type PlayerAction =
  | { type: 'SET_PLAYLIST'; playlist: TrackInfo[] }
  | { type: 'SET_CURRENT_TRACK'; trackId: number }
  | { type: 'SET_TRACK_INDEX'; index: number }
  | { type: 'SET_SHOW_PLAYER'; show: boolean }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREV_TRACK' }

const playerReducer = (
  state: PlayerState,
  action: PlayerAction,
): PlayerState => {
  switch (action.type) {
    case 'SET_PLAYLIST': {
      const newIndex = action.playlist.findIndex(
        (track) => track.id === state.trackId,
      )
      return {
        ...state,
        playlist: action.playlist,
        trackIndex: newIndex !== -1 ? newIndex : 0,
      }
    }
    case 'SET_CURRENT_TRACK':
      return { ...state, trackId: action.trackId }
    case 'SET_TRACK_INDEX':
      return { ...state, trackIndex: action.index }
    case 'SET_SHOW_PLAYER':
      return { ...state, showPlayer: action.show }
    case 'NEXT_TRACK':
      return {
        ...state,
        trackIndex: (state.trackIndex + 1) % state.playlist.length,
      }
    case 'PREV_TRACK':
      return {
        ...state,
        trackIndex:
          (state.trackIndex - 1 + state.playlist.length) %
          state.playlist.length,
      }
    default:
      return state
  }
}

interface PlayerContextProps extends PlayerState {
  nextTrack: () => void
  previousTrack: () => void
  setTrackIndex: (index: number) => void
  setShowPlayer: (show: boolean) => void
  setCurrentTrackId: (trackId: number) => void
  loadPlaylist: (playlist: TrackInfo[]) => void
}

const PlayerContext = createContext<PlayerContextProps | null>(null)

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    playlist: [],
    trackId: 0,
    trackIndex: 0,
    showPlayer: false,
  })

  const loadPlaylist = (playlist: TrackInfo[]) => {
    dispatch({ type: 'SET_PLAYLIST', playlist })
    setShowPlayer(true)
  }

  const setTrackIndex = (index: number) =>
    dispatch({ type: 'SET_TRACK_INDEX', index })

  const setShowPlayer = (show: boolean) =>
    dispatch({ type: 'SET_SHOW_PLAYER', show })

  const setCurrentTrackId = (trackId: number) =>
    dispatch({ type: 'SET_CURRENT_TRACK', trackId })

  const nextTrack = () => dispatch({ type: 'NEXT_TRACK' })

  const previousTrack = () => dispatch({ type: 'PREV_TRACK' })

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        loadPlaylist,
        setTrackIndex,
        setShowPlayer,
        setCurrentTrackId,
        nextTrack,
        previousTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}

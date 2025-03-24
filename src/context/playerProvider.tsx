import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { TrackInfo } from '../components/audio'

interface PlayerContextProps {
  playlist: TrackInfo[]
  currentTrackId: number
  trackIndex: number
  showPlayer: boolean
  nextTrack: () => void
  previousTrack: () => void
  setTrackIndex: (index: number) => void
  setShowPlayer: (showPlyaer: boolean) => void
  loadPlaylist: (playlist: TrackInfo[]) => void
}

const PlayerContext = createContext<PlayerContextProps | null>(null)

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playlist, setPlaylist] = useState<TrackInfo[]>([])
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentTrackId, setCurrentTrackId] = useState(0)
  const [trackIndex, setTrackIndex] = useState(0)

  const loadPlaylist = (playlist: TrackInfo[]) => {
    setPlaylist(playlist)
    setTrackIndex(0)
  }

  const nextTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length)
  }

  const previousTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex - 1) % playlist.length)
  }

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        showPlayer,
        currentTrackId,
        trackIndex,
        previousTrack,
        nextTrack,
        setShowPlayer,
        setTrackIndex,
        loadPlaylist,
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

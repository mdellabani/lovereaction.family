import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'
import RSSParser from 'rss-parser'
import { Category, TrackInfo } from '../types/audio'

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
enum Playlist {
  LRCool = 'LR-COOL',
  Podcastel = 'Podcastel',
}

interface PlayerContextProps extends PlayerState {
  getPlaylist: (type: Playlist) => TrackInfo[]
  nextTrack: () => void
  previousTrack: () => void
  setTrackIndex: (index: number) => void
  setShowPlayer: (show: boolean) => void
  setCurrentTrackId: (trackId: number) => void
  loadPlaylist: (type: Playlist, trackId?: number) => void
}

const PlayerContext = createContext<PlayerContextProps | null>(null)

const CACHE_KEY = 'rss_cache'

const parseRSS = async (): Promise<{
  LRCool: TrackInfo[]
  Podcastel: TrackInfo[]
}> => {
  const parser = new RSSParser()
  const feed = await parser.parseURL('https://example.com/rss-feed')

  const LRCool: TrackInfo[] = []
  const Podcastel: TrackInfo[] = []

  let trackIdCounter = 1

  feed.items.forEach((item) => {
    const title = item.title || ''
    let playlistType: Playlist | null = null
    let artist = 'Unknown Artist'

    if (title.startsWith(Playlist.LRCool)) {
      playlistType = Playlist.LRCool
      artist = title.split('- ')[1] || artist
    } else if (title.startsWith(Playlist.Podcastel)) {
      playlistType = Playlist.Podcastel
      artist = title.split('- ')[1] || artist
    }

    if (playlistType) {
      const track: TrackInfo = {
        id: trackIdCounter++,
        type: Category.LR, // TODO-mde category tag
        title,
        artist: artist.trim(),
        description: item.content || '',
        imageUrl: item.itunes.image || '',
        url: item.enclosure?.url || '',
      }

      if (playlistType === Playlist.LRCool) {
        LRCool.push(track)
      } else {
        Podcastel.push(track)
      }
    }
  })
  LRCool.sort((a, b) => b.title.localeCompare(a.title))
  Podcastel.sort((a, b) => b.title.localeCompare(a.title))
  console.log(LRCool, Podcastel)
  return { LRCool, Podcastel }
}

const loadCachedPlaylists = (): Record<Playlist, TrackInfo[]> | null => {
  const cached = localStorage.getItem(CACHE_KEY)
  if (!cached) return null

  const { LRCool, Podcastel, timestamp } = JSON.parse(cached)
  const now = new Date().getTime()
  const lastCacheTime = new Date(timestamp).setUTCHours(7, 0, 0, 0)

  return now < lastCacheTime ? { LRCool, Podcastel } : null
}

const cachePlaylists = (LRCool: TrackInfo[], Podcastel: TrackInfo[]) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ LRCool, Podcastel, timestamp: new Date().getTime() }),
  )
}

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    playlist: [],
    trackId: 0,
    trackIndex: 0,
    showPlayer: false,
  })
  const [playlists, setPlaylists] = useState<{
    LRCool: TrackInfo[]
    Podcastel: TrackInfo[]
  }>({ LRCool: [], Podcastel: [] })

  useEffect(() => {
    ;(async () => {
      const cachedPlaylists = loadCachedPlaylists()
      if (cachedPlaylists) {
        setPlaylists(cachedPlaylists)
      } else {
        const { LRCool, Podcastel } = await parseRSS()
        setPlaylists({ LRCool, Podcastel })
        cachePlaylists(LRCool, Podcastel)
      }
    })()
  }, [])

  const loadPlaylist = (type: 'LRCool' | 'Podcastel', trackId?: number) => {
    const filteredPlaylist = playlists[type]

    dispatch({ type: 'SET_PLAYLIST', playlist: filteredPlaylist })
    dispatch({ type: 'SET_SHOW_PLAYER', show: true })

    if (trackId) {
      dispatch({ type: 'SET_CURRENT_TRACK', trackId })
      dispatch({
        type: 'SET_TRACK_INDEX',
        index: filteredPlaylist.findIndex((t) => t.id === trackId),
      })
    } else {
      dispatch({ type: 'SET_TRACK_INDEX', index: 0 })
    }
  }

  const setTrackIndex = (index: number) =>
    dispatch({ type: 'SET_TRACK_INDEX', index })
  const setShowPlayer = (show: boolean) =>
    dispatch({ type: 'SET_SHOW_PLAYER', show })
  const setCurrentTrackId = (trackId: number) =>
    dispatch({ type: 'SET_CURRENT_TRACK', trackId })
  const nextTrack = () => dispatch({ type: 'NEXT_TRACK' })
  const previousTrack = () => dispatch({ type: 'PREV_TRACK' })

  const getPlaylist = (type: Playlist) => playlists[type]

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        getPlaylist,
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

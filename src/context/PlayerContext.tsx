'use client'
import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'
import { Category, PlayList, TrackInfo } from '@/types/audio'

interface PlayerState {
  playlist: PlayList | null
  trackId: number
  trackIndex: number
  showPlayer: boolean
}

type PlayerAction =
  | { type: 'SET_PLAYLIST'; playlist: PlayList }
  | { type: 'SET_CURRENT_TRACK'; trackId: number }
  | { type: 'SET_TRACK_INDEX'; index: number }
  | { type: 'SET_SHOW_PLAYER'; show: boolean }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREV_TRACK' }

const playerReducer = (
  state: PlayerState,
  action: PlayerAction,
): PlayerState => {
  console.log('ac')
  switch (action.type) {
    case 'SET_PLAYLIST': {
      console.log('SET_PLAYLIST', action.playlist)
      const newIndex = action.playlist.tracks.findIndex(
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
        trackIndex: (state.trackIndex + 1) % state.playlist.tracks.length,
      }
    case 'PREV_TRACK':
      return {
        ...state,
        trackIndex:
          (state.trackIndex - 1 + state.playlist.tracks.length) %
          state.playlist.tracks.length,
      }
    default:
      return state
  }
}

export enum Podcast {
  LRCool = 'LR-COOL',
  Podcastel = 'Podcastel',
}

interface PlayerContextProps extends PlayerState {
  getPlaylist: (type: keyof typeof Podcast) => PlayList | null
  nextTrack: () => void
  previousTrack: () => void
  setTrackIndex: (index: number) => void
  setShowPlayer: (show: boolean) => void
  setCurrentTrackId: (trackId: number) => void
  loadPodcast: (type: keyof typeof Podcast, trackId?: number) => void
  loadPlaylist: (playlist: PlayList, trackId?: number) => void
}

const PlayerContext = createContext<PlayerContextProps | null>(null)

const CACHE_KEY = 'rss_cache'

const parseRSS = async (): Promise<{
  LRCool: PlayList
  Podcastel: PlayList
}> => {
  const feed = await fetch('http://localhost:3000/api/rss', {
    cache: 'no-store',
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error('Unable to fetch RSS', error)
    })

  const LRCool: PlayList = { title: Podcast.LRCool, tracks: [] }
  const Podcastel: PlayList = { title: Podcast.Podcastel, tracks: [] }

  let trackIdCounter = 1

  feed.items.forEach((item) => {
    const title = item.title || ''
    let playlistType: Podcast | null = null
    let artist = 'Unknown Artist'
    let order = 0
    const indexDiez = title.indexOf('#')

    if (title.startsWith(Podcast.LRCool)) {
      playlistType = Podcast.LRCool
      artist = title.split('_ ')[1] || artist
      order = parseInt(title.slice(indexDiez + 1, title.indexOf('_')).trim())
    } else if (title.startsWith(Podcast.Podcastel)) {
      playlistType = Podcast.Podcastel
      artist = title.split('- ')[1] || artist
      order = parseInt(title.slice(indexDiez + 1, title.indexOf('-')).trim())
    }

    if (playlistType) {
      const track: TrackInfo = {
        id: trackIdCounter++,
        order: order,
        type: Category.LR, // TODO-mde category tag
        title,
        artist: artist.trim(),
        description: item.content || '',
        imageUrl: item.itunes.image || '',
        url: item.enclosure?.url || '',
      }

      if (playlistType === Podcast.LRCool) {
        LRCool.tracks.push(track)
      } else {
        Podcastel.tracks.push(track)
      }
    }
  })
  LRCool.tracks.sort((a, b) => b.order - a.order)
  Podcastel.tracks.sort((a, b) => b.order - a.order)
  console.log(LRCool, Podcastel)
  return { LRCool, Podcastel }
}

const loadCachedPlaylists = (): Record<
  keyof typeof Podcast,
  PlayList | null
> | null => {
  const cached = localStorage.getItem(CACHE_KEY)
  if (!cached) return null

  const { LRCool, Podcastel, timestamp } = JSON.parse(cached)
  const now = new Date().getTime()
  const lastCacheTime = new Date(timestamp).setUTCHours(7, 0, 0, 0)

  return now < lastCacheTime ? { LRCool, Podcastel } : null
}

const cachePlaylists = (LRCool: PlayList, Podcastel: PlayList) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ LRCool, Podcastel, timestamp: new Date().getTime() }),
  )
}

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    playlist: null,
    trackId: 0,
    trackIndex: 0,
    showPlayer: false,
  })
  const [playlists, setPlaylists] = useState<{
    LRCool: PlayList | null
    Podcastel: PlayList | null
  }>({ LRCool: null, Podcastel: null })

  useEffect(() => {
    ;(async () => {
      console.log('before', state)

      const cachedPlaylists = loadCachedPlaylists()
      if (cachedPlaylists) {
        setPlaylists(cachedPlaylists)
      } else {
        const { LRCool, Podcastel } = await parseRSS()
        console.log('playlist', LRCool)
        setPlaylists({ LRCool, Podcastel })
        cachePlaylists(LRCool, Podcastel)
      }
      console.log('after', state)
    })()
  }, [])

  const loadPodcast = (type: keyof typeof Podcast, trackId?: number) => {
    const filteredPlaylist = playlists[type]
    loadPlaylist(filteredPlaylist, trackId)
    dispatch({ type: 'SET_PLAYLIST', playlist: filteredPlaylist })
    dispatch({ type: 'SET_SHOW_PLAYER', show: true })

    if (trackId) {
      dispatch({ type: 'SET_CURRENT_TRACK', trackId })
      dispatch({
        type: 'SET_TRACK_INDEX',
        index: filteredPlaylist.tracks.findIndex((t) => t.id === trackId),
      })
    } else {
      dispatch({ type: 'SET_TRACK_INDEX', index: 0 })
    }
  }

  const loadPlaylist = (playlist: PlayList, trackId?: number) => {
    dispatch({ type: 'SET_PLAYLIST', playlist })
    dispatch({ type: 'SET_SHOW_PLAYER', show: true })

    if (trackId) {
      dispatch({ type: 'SET_CURRENT_TRACK', trackId })
      dispatch({
        type: 'SET_TRACK_INDEX',
        index: playlist.tracks.findIndex((t) => t.id === trackId),
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

  const getPlaylist = (type: keyof typeof Podcast) => playlists[type]

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        getPlaylist,
        loadPodcast,
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

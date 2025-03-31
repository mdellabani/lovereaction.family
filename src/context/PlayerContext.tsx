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
  playlist: PlayList
  trackId: number
  trackIndex: number
  showPlayer: boolean
  playing: boolean
  loop: boolean
  volume: number
  muted: boolean
  played: number
  duration: number
}

type PlayerAction =
  | { type: 'SET_PLAYLIST'; playlist: PlayList }
  | { type: 'SET_CURRENT_TRACK'; trackId: number }
  | { type: 'SET_TRACK_INDEX'; index: number }
  | { type: 'SET_SHOW_PLAYER'; show: boolean }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREV_TRACK' }
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
      //todo-mde set trackIndex
      return { ...state, playing: true, trackId: action.trackId }
    case 'SET_TRACK_INDEX':
      return { ...state, playing: true, trackIndex: action.index }
    case 'SET_SHOW_PLAYER':
      return { ...state, showPlayer: action.show }
    case 'NEXT_TRACK':
      return {
        ...state,
        playing: true,
        trackIndex: (state.trackIndex + 1) % state.playlist.tracks.length,
      }
    case 'PREV_TRACK':
      return {
        ...state,
        playing: true,
        trackIndex:
          (state.trackIndex - 1 + state.playlist.tracks.length) %
          state.playlist.tracks.length,
      }
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

export enum Podcast {
  LRCool = 'LR-COOL',
  Podcastel = 'Podcastel',
}

interface PlayerContextProps extends PlayerState {
  loading: boolean
  getPlaylist: (type: Podcast) => PlayList
  getAllTracks: () => TrackInfo[]
  nextTrack: () => void
  previousTrack: () => void
  setTrackIndex: (index: number) => void
  setShowPlayer: (show: boolean) => void
  setCurrentTrackId: (trackId: number) => void
  loadPodcast: (type: Podcast, trackId?: number) => void
  loadPlaylist: (playlist: PlayList, trackId?: number) => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleMute: () => void
  setVolume: (volume: number) => void
  setPlayed: (played: number) => void
  setDuration: (played: number) => void
}

const PlayerContext = createContext<PlayerContextProps | null>(null)

const CACHE_KEY = 'rss_cache'

const parseRSS = async (): Promise<{
  [Podcast.LRCool]: PlayList
  [Podcast.Podcastel]: PlayList
}> => {
  console.log('fetching rss')
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
  return { [Podcast.LRCool]: LRCool, [Podcast.Podcastel]: Podcastel }
}

const loadCachedPlaylists = (): Record<Podcast, PlayList> | null => {
  const cached = localStorage.getItem(CACHE_KEY)
  if (!cached) return null

  const { LRCool, Podcastel, timestamp } = JSON.parse(cached)
  const now = new Date().getTime()
  const lastCacheTime = new Date(timestamp).setUTCHours(7, 0, 0, 0)

  return now < lastCacheTime
    ? { [Podcast.LRCool]: LRCool, [Podcast.Podcastel]: Podcastel }
    : null
}

const cachePlaylists = (lrCool: PlayList, podcastel: PlayList) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ lrCool, podcastel, timestamp: new Date().getTime() }),
  )
}

const defaultPlaylist: PlayList = { title: '', tracks: [] }

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    playlist: defaultPlaylist,
    trackId: 0,
    trackIndex: 0,
    showPlayer: false,
    playing: false,
    loop: false,
    volume: 0.8,
    muted: false,
    played: 0,
    duration: 0,
  })

  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState<Record<Podcast, PlayList>>({
    [Podcast.LRCool]: defaultPlaylist,
    [Podcast.Podcastel]: defaultPlaylist,
  })

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const cachedPlaylists = loadCachedPlaylists()
      if (cachedPlaylists) {
        setPlaylists(cachedPlaylists)
      } else {
        const { [Podcast.LRCool]: LRCool, [Podcast.Podcastel]: Podcastel } =
          await parseRSS()
        setPlaylists({
          [Podcast.LRCool]: LRCool,
          [Podcast.Podcastel]: Podcastel,
        })
        cachePlaylists(LRCool, Podcastel)
      }
      setLoading(false)
    })()
  }, [])

  const loadPodcast = (type: Podcast, trackId?: number) => {
    const filteredPlaylist = playlists[type]
    if (!filteredPlaylist) return
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
  const nextTrack = () => {
    dispatch({ type: 'NEXT_TRACK' })
    setPlayed(0)
  }
  const previousTrack = () => dispatch({ type: 'PREV_TRACK' })
  const getPlaylist = (type: Podcast) => playlists[type]
  const getAllTracks = () => [
    ...playlists[Podcast.LRCool].tracks,
    ...playlists[Podcast.Podcastel].tracks,
  ]
  const togglePlay = () => dispatch({ type: 'TOGGLE_PLAY' })
  const toggleLoop = () => dispatch({ type: 'TOGGLE_LOOP' })
  const toggleMute = () => dispatch({ type: 'TOGGLE_MUTE' })
  const setVolume = (volume: number) =>
    dispatch({ type: 'SET_VOLUME', payload: volume })
  const setPlayed = (played: number) =>
    dispatch({ type: 'SET_PLAYED', payload: played })
  const setDuration = (played: number) =>
    dispatch({ type: 'SET_DURATION', payload: played })
  return (
    <PlayerContext.Provider
      value={{
        ...state,
        loading,
        getPlaylist,
        getAllTracks,
        loadPodcast,
        loadPlaylist,
        setTrackIndex,
        setShowPlayer,
        setCurrentTrackId,
        nextTrack,
        previousTrack,
        togglePlay,
        toggleLoop,
        toggleMute,
        setVolume,
        setPlayed,
        setDuration,
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

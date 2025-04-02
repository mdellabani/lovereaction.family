'use client'
import { ALL_PODCASTS, orderedTracks } from '@/components/data'
import { PlayList, TrackInfo } from '@/types/audio'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

interface PlayerState {
  playlist: PlayList
  trackId: number
  trackIndex: number
  showPlayer: boolean
  loading: boolean
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
  | { type: 'SET_LOADING'; loading: boolean }
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
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
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
  podcasts: PlayList
  nextTrack: () => void
  previousTrack: () => void
  setTrackIndex: (index: number) => void
  setShowPlayer: (show: boolean) => void
  setCurrentTrackId: (trackId: number) => void
  loadPlaylist: (playlist: PlayList, trackId: number) => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleMute: () => void
  setVolume: (volume: number) => void
  setPlayed: (played: number) => void
  setDuration: (played: number) => void
}

const PlayerContext = createContext<PlayerContextProps | null>(null)

const CACHE_KEY = 'rss_cache'

const parseRSS = async (): Promise<PlayList> => {
  const feed = await fetch('http://localhost:3000/api/rss', {
    cache: 'no-store',
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error('Unable to fetch RSS', error)
    })

  const tracks: TrackInfo[] = []

  let trackIdCounter = 0

  feed.items.forEach((item) => {
    const title = item.title
    let artist
    let order = 0
    let type

    if (title.startsWith(Podcast.LRCool)) {
      const content = title.split('_ ')
      artist = content[1]
      order = orderedTracks.get(content[0].trim()).order
      type = orderedTracks.get(content[0].trim()).type
    } else if (title.startsWith(Podcast.Podcastel)) {
      const content = title.split('- ')
      order = orderedTracks.get(content[0].trim()).order
      type = orderedTracks.get(content[0].trim()).type
      artist = content[1]
    } else {
      throw new Error('Unknow track type')
    }

    const track: TrackInfo = {
      id: trackIdCounter++,
      order: order,
      type: type,
      title,
      artist: artist.trim(),
      description: item.content,
      imageUrl: item.itunes.image,
      url: item.enclosure?.url,
    }

    tracks.push(track)
  })
  tracks.sort((a, b) => a.order - b.order)
  return { title: ALL_PODCASTS, tracks: tracks }
}

const loadCachedPlaylists = (): PlayList | null => {
  const cached = localStorage.getItem(CACHE_KEY)
  if (!cached) return null

  const { podcasts, timestamp } = JSON.parse(cached)
  const now = new Date().getTime()
  const lastCacheTime = new Date(timestamp).setUTCHours(7, 0, 0, 0)

  return now < lastCacheTime ? podcasts : null
}

const cachePlaylists = (podcasts: PlayList) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ podcasts, timestamp: new Date().getTime() }),
  )
}

const defaultPlaylist: PlayList = { title: '', tracks: [] }

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    playlist: defaultPlaylist,
    trackId: 0,
    trackIndex: 0,
    showPlayer: false,
    loading: false,
    playing: false,
    loop: false,
    volume: 0.8,
    muted: false,
    played: 0,
    duration: 0,
  })

  const [podcasts, setPodcasts] = useState<PlayList>(defaultPlaylist)

  useEffect(() => {
    ;(async () => {
      dispatch({ type: 'SET_LOADING', loading: true })
      let podcasts = loadCachedPlaylists()
      if (!podcasts) {
        podcasts = await parseRSS()
        cachePlaylists(podcasts)
      }
      setPodcasts(podcasts)
      dispatch({ type: 'SET_PLAYLIST', playlist: podcasts })
      dispatch({ type: 'SET_LOADING', loading: false })
    })()
  }, [])

  const loadPlaylist = (playlist: PlayList, trackId: number) => {
    dispatch({ type: 'SET_PLAYLIST', playlist })
    dispatch({ type: 'SET_SHOW_PLAYER', show: true })
    dispatch({ type: 'SET_CURRENT_TRACK', trackId })
  }

  const setTrackIndex = (index: number) =>
    dispatch({ type: 'SET_TRACK_INDEX', index })
  const setShowPlayer = (show: boolean) =>
    dispatch({ type: 'SET_SHOW_PLAYER', show })
  const setCurrentTrackId = (trackId: number) => {
    dispatch({
      type: 'SET_TRACK_INDEX',
      index: state.playlist.tracks.findIndex((t) => t.id === trackId),
    })
    dispatch({ type: 'SET_CURRENT_TRACK', trackId })
  }
  const nextTrack = () => {
    dispatch({ type: 'NEXT_TRACK' })
  }
  const previousTrack = () => {
    dispatch({ type: 'PREV_TRACK' })
  }
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
        podcasts,
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

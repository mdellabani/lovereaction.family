'use client'

import { PLAYLIST_CATEGORIES, TRACK_TYPES } from '@/components/data'
import PreviewDetails from '@/components/PreviewDetails'
import { usePlayer } from '@/context/PlayerContext'
import { PlayList, TrackInfo } from '@/types/audio'
import { Spinner } from '@heroui/spinner'
import { Tab, Tabs } from '@heroui/tabs'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Podcasts() {
  const { togglePlay, loadPlaylist, loading, playlist, podcasts } = usePlayer()
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null)
  const [filteredPlaylist, setfilteredPlaylist] = useState<PlayList>(podcasts)
  const [podcastFilter, setPodcastFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const handlePlayPause = (track: TrackInfo) => {
    setCurrentTrack(track)
    if (track === currentTrack) {
      togglePlay()
    } else {
      loadPlaylist(filteredPlaylist, track.id)
    }
  }

  const matchesFilter = (): boolean => {
    if (playlist.title?.includes('-' + podcastFilter + '-' + categoryFilter)) {
      return true
    }
    return false
  }

  const filterPlayList = () => {
    const newTrack = filteredTracks()
    if (!matchesFilter() || filteredPlaylist.tracks.length != newTrack.length) {
      // Do not load playlist since it stops the current stream
      setfilteredPlaylist({
        title: 'podcasts-' + podcastFilter + '-' + categoryFilter,
        tracks: filteredTracks(),
      })
    }
  }

  const filteredTracks = () =>
    podcasts.tracks.filter((track) => {
      const matchesCategory =
        podcastFilter === 'All' || track.title.includes(podcastFilter)
      const matchesType =
        categoryFilter === 'All' || track.type == categoryFilter
      return matchesCategory && matchesType
    })

  useEffect(() => {
    filterPlayList()
  }, [categoryFilter, podcastFilter, loading])

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-center">
        <Spinner color="danger" labelColor="danger" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-1/2 flex-col items-center gap-4 p-4">
      {currentTrack && <PreviewDetails track={currentTrack} />}
      <Tabs
        variant="underlined"
        onSelectionChange={(key) => {
          setPodcastFilter(key.toString())
        }}
      >
        {PLAYLIST_CATEGORIES.map((category) => (
          <Tab key={category} title={category} />
        ))}
      </Tabs>
      <Tabs
        variant="underlined"
        onSelectionChange={(key) => {
          setCategoryFilter(key.toString())
        }}
      >
        {TRACK_TYPES.map((type) => (
          <Tab key={type} title={type} />
        ))}
      </Tabs>
      <div className="w-full rounded-lg border p-4 shadow-md">
        <div className="flex flex-col gap-2">
          {filteredPlaylist.tracks.map((track) => (
            <div
              className="flex cursor-pointer items-center gap-4 rounded-md border-b p-2 last:border-b-0 hover:bg-gray-100"
              key={track.id}
              onClick={() => handlePlayPause(track)}
            >
              <div className="group relative">
                <Image
                  alt={track.title}
                  className="h-12 w-12 rounded-lg object-cover"
                  height={50}
                  src={track.imageUrl}
                  width={50}
                />
              </div>

              <div>
                <p className="text-sm font-medium">{track.artist}</p>
                <p className="text-sm text-gray-600">{track.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

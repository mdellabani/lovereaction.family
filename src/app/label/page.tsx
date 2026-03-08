'use client'
import { releases, TRACK_TYPES } from '@/components/data'
import PreviewDetails from '@/components/PreviewDetails'
import PreviewSummary from '@/components/PreviewSummary'
import { usePlayer } from '@/context/PlayerContext'
import { PlayList, PreviewItem } from '@/types/audio'
import { Tab, Tabs } from '@heroui/tabs'
import { useEffect, useState } from 'react'

export default function Label() {
  const { togglePlay, loadPlaylist, selectPlaylist, playlist } = usePlayer()
  const [currentPlaylist, setCurrentPlaylist] = useState<PlayList | null>(null)
  const [filteredReleases, setFilteredReleases] = useState<PlayList[]>(releases)
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Sync from context (e.g. when navigating from home page with a pre-selected item)
  useEffect(() => {
    if (!currentPlaylist && playlist.tracks.length > 0) {
      const match = releases.find((r) => r === playlist)
      if (match) {
        setCurrentPlaylist(match)
      }
    }
  }, [playlist])

  const handlePlayPause = (item: PlayList) => {
    setCurrentPlaylist(item)
    if (item === currentPlaylist) {
      togglePlay()
    } else {
      loadPlaylist(item, 0)
    }
  }

  const handleSelect = (item: PlayList) => {
    setCurrentPlaylist(item)
    selectPlaylist(item, 0)
  }

  const filterReleases = () => {
    const newPlaylist =
      categoryFilter == TRACK_TYPES[0]
        ? releases
        : releases.filter((p) => p.type?.includes(categoryFilter))
    setFilteredReleases(newPlaylist)
  }

  const isActive = (item: PreviewItem): boolean => {
    if (!currentPlaylist) {
      return false
    }
    if (playlist === item) {
      return true
    }
    return false
  }

  useEffect(() => {
    filterReleases()
  }, [categoryFilter])

  return (
    <div className="mx-auto flex flex-col items-center gap-4 p-4">
      {currentPlaylist && <PreviewDetails track={currentPlaylist} />}
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
      <div className="grid grid-cols-3 gap-6">
        {filteredReleases.map((item, index) => (
          <PreviewSummary
            handlePlayPause={handlePlayPause}
            index={index}
            isActive={isActive}
            item={item}
            key={index}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}

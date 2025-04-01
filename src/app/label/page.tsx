'use client'
import { releases, TRACK_TYPES } from '@/components/data'
import PreviewDetails from '@/components/PreviewDetails'
import PreviewSummary from '@/components/PreviewSummary'
import { usePlayer } from '@/context/PlayerContext'
import { PlayList, PreviewItem } from '@/types/audio'
import { Tabs, Tab } from '@heroui/tabs'
import { useEffect, useState } from 'react'

export default function Label() {
  const { togglePlay, loadPlaylist, playlist } = usePlayer()
  const [currentPlaylist, setCurrentPlaylist] = useState<PlayList | null>(null)
  const [filteredReleases, setFilteredReleases] = useState<PlayList[]>(releases)

  const [categoryFilter, setCategoryFilter] = useState('All')

  const handlePlayPause = (playlist: PlayList) => {
    setCurrentPlaylist(playlist)
    if (playlist === currentPlaylist) {
      togglePlay()
    } else {
      loadPlaylist(playlist, 0)
    }
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
    <div className="mx-auto flex w-1/2 flex-col items-center gap-4 p-4">
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
      <div className="grid grid-cols-3 gap-16">
        {filteredReleases.map((item, index) => (
          <PreviewSummary
            handlePlayPause={handlePlayPause}
            index={index}
            isActive={isActive}
            item={item}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

import { usePlayer } from '@/context/PlayerContext'
import { PlayList, PreviewItem, TrackInfo } from '@/types/audio'
import { Spinner } from '@heroui/spinner'
import Link from 'next/link'
import { useState } from 'react'
import PreviewSummary from './PreviewSummary'

type PreviewListProps<T extends PreviewItem> = {
  title: string
  items: () => T[]
  route: string
  loading: boolean
}

const PreviewList = <T extends PreviewItem>({
  title,
  items,
  route,
  loading,
}: PreviewListProps<T>) => {
  const resolvedItems = items()
  const { loadPlaylist, playlist, togglePlay, setCurrentTrackId } = usePlayer()
  const [current, setCurrent] = useState(-1)
  const handlePlayPause = (item: T, index: number) => {
    if (item === resolvedItems[current]) {
      togglePlay()
    } else {
      setCurrent(index)
      if (isPlayList(item)) {
        loadPlaylist(item as PlayList, 0)
      } else {
        setCurrentTrackId(item.id)
      }
    }
  }

  const isActive = (item: PreviewItem): boolean => {
    if (current === -1) {
      return false
    }
    if (isPlayList(item)) {
      if (playlist === item) {
        return true
      }
      return false
    } else {
      return (item as TrackInfo).id === (resolvedItems[current] as TrackInfo).id
    }
  }
  return (
    <div className="relative m-10 flex w-full items-center gap-4 border-b-4 border-l-4 border-gray-300 p-4 before:absolute before:left-0 before:top-0 before:w-1/4 before:border-t-4 before:border-gray-300">
      <div>
        <h2 className="mb-4 pl-2 text-xl font-bold">{title}</h2>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <Spinner color="danger" labelColor="danger" />
          </div>
        ) : (
          <div className="flex gap-4">
            {resolvedItems.slice(0, 3).map((item, index) => (
              <PreviewSummary
                handlePlayPause={handlePlayPause}
                index={index}
                isActive={isActive}
                item={item}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
      {resolvedItems.length > 3 && (
        <div className="mt-4 text-center">
          <Link
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 text-xl text-gray-600 transition hover:bg-gray-600 hover:text-white"
            href={route}
          >
            ⋯
          </Link>
        </div>
      )}
    </div>
  )
}

export const isPlayList = (item: PreviewItem): boolean => {
  return 'tracks' in item
}

export default PreviewList

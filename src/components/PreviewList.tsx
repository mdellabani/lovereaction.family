import { usePlayer } from '@/context/PlayerContext'
import { PlayList, PreviewItem, TrackInfo } from '@/types/audio'
import { Spinner } from '@heroui/spinner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PreviewSummary from './PreviewSummary'

type PreviewListProps<T extends PreviewItem> = {
  title: string
  items: () => T[]
  route: string
  loading: boolean
  playlist?: PlayList
}

const PreviewList = <T extends PreviewItem>({
  title,
  items,
  route,
  loading,
  playlist: parentPlaylist,
}: PreviewListProps<T>) => {
  const resolvedItems = items()
  const { loadPlaylist, playlist, togglePlay, setCurrentTrackId } = usePlayer()
  const router = useRouter()
  const [current, setCurrent] = useState(-1)

  const handlePlayPause = (item: T, index: number) => {
    if (item === resolvedItems[current]) {
      togglePlay()
    } else {
      setCurrent(index)
      if (isPlayList(item)) {
        loadPlaylist(item as PlayList, 0)
      } else if (parentPlaylist) {
        loadPlaylist(parentPlaylist, (item as TrackInfo).id)
      } else {
        setCurrentTrackId((item as TrackInfo).id)
      }
    }
  }

  const handleSelect = (item: T, index: number) => {
    setCurrent(index)
    // Navigate with selection hint via query param — don't touch player state
    if (isPlayList(item)) {
      router.push(`${route}?select=${item.title}`)
    } else {
      router.push(`${route}?select=${(item as TrackInfo).id}`)
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
    <section className="w-full rounded-2xl bg-gray-50 p-6 dark:bg-gray-900/50">
      <Link className="mb-5 inline-block" href={route}>
        <h2 className="text-2xl font-bold tracking-tight hover:underline">
          {title}
        </h2>
      </Link>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Spinner color="danger" labelColor="danger" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {resolvedItems.slice(0, 3).map((item, index) => (
            <PreviewSummary
              handlePlayPause={handlePlayPause}
              index={index}
              isActive={isActive}
              item={item}
              key={index}
              route={route}
              onSelect={handleSelect}
            />
          ))}
          {resolvedItems.length > 3 && (
            <Link
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400 hover:bg-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
              href={route}
            >
              <span className="text-3xl text-gray-300 transition-transform group-hover:scale-110 group-hover:text-gray-500">
                ♫
              </span>
              <span className="text-sm font-medium text-gray-400 group-hover:text-gray-600">
                See all
              </span>
            </Link>
          )}
        </div>
      )}
    </section>
  )
}

export const isPlayList = (item: PreviewItem): boolean => {
  return 'tracks' in item
}

export default PreviewList

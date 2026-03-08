'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Pause, Play } from 'lucide-react'
import { PreviewItem } from '@/types/audio'
import { usePlayer } from '@/context/PlayerContext'

type PreviewSummaryProps<T extends PreviewItem> = {
  item: T
  index: number
  handlePlayPause: (item: T, index: number) => void
  isActive: (item: PreviewItem) => boolean
  route?: string
  onSelect?: (item: T, index: number) => void
}

const PreviewSummary = <T extends PreviewItem>({
  item,
  index,
  handlePlayPause,
  isActive,
  route,
  onSelect,
}: PreviewSummaryProps<T>) => {
  const { playing } = usePlayer()

  const card = (
    <div className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900">
      <div className="relative aspect-square">
        <Image
          alt={item.title}
          className="object-cover"
          fill
          src={item.imageUrl}
        />
        <button
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handlePlayPause(item, index)
          }}
        >
          {isActive(item) && playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          {item.type}
        </p>
        <p className="mt-1 font-semibold leading-tight">{item.title}</p>
        {item.artist && (
          <p className="mt-0.5 text-sm text-gray-500">{item.artist}</p>
        )}
      </div>
    </div>
  )

  if (route) {
    return (
      <Link href={route} onClick={() => onSelect?.(item, index)}>
        {card}
      </Link>
    )
  }

  return (
    <div role="button" tabIndex={0} onClick={() => onSelect?.(item, index)}>
      {card}
    </div>
  )
}

export default PreviewSummary

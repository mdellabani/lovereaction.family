'use client'
import Image from 'next/image'
import { Play, Pause } from 'lucide-react'
import { PreviewItem } from '@/types/audio'
import { usePlayer } from '@/context/PlayerContext'

type PreviewSummaryProps<T extends PreviewItem> = {
  item: T
  index: number
  handlePlayPause: (item: T, index: number) => void
  isActive: (item: PreviewItem) => boolean
}

const PreviewSummary = <T extends PreviewItem>({
  item,
  index,
  handlePlayPause,
  isActive,
}: PreviewSummaryProps<T>) => {
  const { playing } = usePlayer()

  return (
    <div className="group w-48 rounded-lg border p-4 text-center shadow-md">
      <div className="group relative">
        <Image
          alt={item.title}
          className="h-40 w-40 rounded-lg object-cover"
          height={200}
          src={item.imageUrl}
          width={200}
        />
        <button
          className="absolute inset-1/4 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => handlePlayPause(item, index)}
        >
          {isActive(item) && playing ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-500">[{item.type}]</p>
      <p className="font-bold">{item.title}</p>
      {item.artist && <p className="text-sm text-gray-600">{item.artist}</p>}
    </div>
  )
}

export default PreviewSummary

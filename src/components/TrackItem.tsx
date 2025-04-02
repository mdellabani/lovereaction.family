import { PreviewItem, TrackInfo } from '@/types/audio'
import Image from 'next/image'

const TrackItem = ({
  track,
  handlePlayPause,
}: {
  track: TrackInfo
  handlePlayPause: (item: PreviewItem) => void
}) => {
  return (
    <div
      className="flex cursor-pointer items-center gap-4 rounded-md border-b p-2 last:border-b-0 hover:bg-gray-100"
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
  )
}

export default TrackItem

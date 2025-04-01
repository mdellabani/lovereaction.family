import { PreviewItem } from '@/types/audio'
import Image from 'next/image'

const PreviewDetails = ({ track }: { track: PreviewItem }) => {
  if (!track) return null

  return (
    <div className="flex w-full gap-4 rounded-lg border p-4 shadow-md">
      <div className="flex w-1/4 flex-col items-center text-center">
        <Image
          alt={track.title}
          className="self-center rounded-lg"
          height={200}
          src={track.imageUrl}
          width={200}
        />
        <h2 className="mt-2 min-h-[4rem] w-full break-words text-center text-lg font-bold">
          {track.title}
        </h2>
        <p className="text-sm text-gray-600">{track.artist}</p>
      </div>
      <div className="h-82 flex w-3/4 items-center justify-center overflow-y-auto p-2">
        <p className="text-sm text-gray-800">{track.description}</p>
      </div>
    </div>
  )
}

export default PreviewDetails

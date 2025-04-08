import { usePlayer } from '@/context/PlayerContext'
import { PlayList, PreviewItem, TrackInfo } from '@/types/audio'
import Image from 'next/image'
import { useState } from 'react'
import { isPlayList } from './PreviewList'
import TrackItem from './TrackItem'

const PreviewDetails = ({ track }: { track: PreviewItem }) => {
  const { togglePlay, setCurrentTrackId } = usePlayer()
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null)

  const handlePlayPause = (track: TrackInfo) => {
    if (track === currentTrack) {
      togglePlay()
    } else {
      setCurrentTrackId(track.id)
      setCurrentTrack(track)
    }
  }

  return (
    <div className="flex w-full gap-4 rounded-lg border p-4 shadow-md">
      <div className="flex w-1/4 flex-col items-center justify-center text-center">
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
        {isPlayList(track) && (
          <div className="w-full rounded-lg border p-4 shadow-md">
            <div className="flex flex-col gap-2">
              {(track as PlayList).tracks.map((item) => (
                <TrackItem
                  handlePlayPause={handlePlayPause}
                  key={item.id}
                  track={item}
                />
              ))}
            </div>
          </div>
        )}
        <p className="text-sm text-gray-800">{track.description}</p>
      </div>
    </div>
  )
}

export default PreviewDetails

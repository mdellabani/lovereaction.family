'use client'

import { usePlayer } from '@/context/PlayerContext'
import { TrackInfo } from '@/types/audio'
import { Spinner } from '@heroui/spinner'
import Image from 'next/image'
import { useState } from 'react'

export default function Podcasts() {
  const {
    getAllTracks,
    togglePlay,
    setCurrentTrackId,
    loadPlaylist,
    loading,
    playlist,
  } = usePlayer()
  const tracks = getAllTracks()
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null)

  const handlePlayPause = (track: TrackInfo) => {
    setCurrentTrack(track)
    if (track === currentTrack) {
      togglePlay()
    } else {
      if (playlist.title == 'podcast') {
        // Already loaded
        setCurrentTrackId(track.id)
      } else {
        loadPlaylist({ title: 'Podcast', tracks: tracks }, track.id)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-center">
        <Spinner color="danger" labelColor="danger" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-1/2 flex-col items-center gap-4   p-4">
      {currentTrack && (
        <div className="flex w-full gap-4 rounded-lg border p-4 shadow-md">
          <div className="flex w-1/4 flex-col items-center text-center">
            <Image
              alt={currentTrack.title}
              className="self-center rounded-lg"
              height={200}
              src={currentTrack.imageUrl}
              width={200}
            />
            <h2 className="mt-2 min-h-[4rem] w-full break-words text-center text-lg font-bold">
              {currentTrack.title}
            </h2>
            <p className="text-sm text-gray-600">{currentTrack.artist}</p>
          </div>
          <div className="h-82 flex w-3/4 items-center justify-center overflow-y-auto p-2">
            <p className="text-sm text-gray-800">{currentTrack.description}</p>
          </div>
        </div>
      )}

      <div className="w-full rounded-lg border p-4 shadow-md">
        <div className="flex flex-col gap-2">
          {tracks.map((track) => (
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

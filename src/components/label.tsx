'use client'

import Image from 'next/image'
import { Category, Release } from 'types/audio'
import { usePlayer } from '../context/PlayerContext'

export const releases: Release[] = [
  {
    title: 'Roots-001',
    artist: 'Z.Zee',
    type: Category.ROOTS,
    imageUrl: '/Roots-001.jpg',
    tracks: [
      {
        id: 1,
        title: 'More of It',
        url: '/api/audio/streaming?file=Roots-001/A1.mp3',
      },
      {
        id: 1,
        title: 'One Special Day',
        url: '/api/audio/streaming?file=Roots-001/A2.mp3',
      },
      {
        id: 1,
        title: 'Brazil Meets India In Martillo',
        url: '/api/audio/streaming?file=Roots-001/B1.mp3',
      },
      {
        id: 1,
        title: "Fleur D'Oranger",
        url: '/api/audio/streaming?file=Roots-001/B2.mp3',
      },
    ],
  },
  {
    title: 'LR-001',
    artist: 'Mirlaqi',
    type: Category.LR,
    imageUrl: '/LR-001.jpg',
    tracks: [
      {
        id: 1,
        title: 'A Dream About You',
        url: '/api/audio/streaming?file=LR-001/A1.mp3',
      },
      {
        id: 2,
        title: 'Mimo Sur La Plage',
        url: '/api/audio/streaming?file=LR-001/A2.mp3',
      },
      {
        id: 3,
        title: 'Take It As It Comes',
        url: '/api/audio/streaming?file=LR-001/A3.mp3',
      },
      {
        id: 4,
        title: 'This Color',
        url: '/api/audio/streaming?file=LR-001/B1.mp3',
      },
      {
        id: 5,
        title: 'Disco Lore (LeonxLeon Remix)',
        url: '/api/audio/streaming?file=LR-001/B1.mp3',
      },
    ],
  },
]

const Label = ({ showAllLink }: { showAllLink: string }) => {
  const { loadPlaylist } = usePlayer()

  return (
    <div className="flex flex-nowrap items-center justify-center">
      {releases.map((release) => (
        <div className="m-2" key={release.title}>
          <div className="relative">
            <Image
              alt={release.title}
              className="h-64 w-full object-cover"
              height={500}
              src={release.imageUrl}
              width={500}
            />
            <div className="absolute bottom-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
              <button
                className="text-white"
                onClick={() => loadPlaylist(release.tracks, 0)}
              >
                Play
              </button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white">{release.title}</p>
            <p className="text-white">{release.artist}</p>
          </div>
        </div>
      ))}
      {releases.length > 5 && (
        <div className="text-center">
          <a className="text-blue-500 hover:text-blue-700" href={showAllLink}>
            Show All
          </a>
        </div>
      )}
    </div>
  )
}

export default Label

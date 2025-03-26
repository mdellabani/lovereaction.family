'use client'

import React from 'react'
import Image from 'next/image'
import { TrackInfo, Category } from 'types/audio'
import { usePlayer } from '../context/PlayerContext'

export const releases: TrackInfo[] = [
  {
    id: 1,
    type: Category.ROOTS,
    title: 'Save the Child in You',
    artist: 'Z.Zee',
    imageUrl: '/Roots-001.jpg',
    url: 'https://soundcloud.com/lovereactionfamily/sets/z-zee-save-the-child-in-you',
  },
  {
    id: 2,
    type: Category.LR,
    title: 'Disco Lore',
    artist: 'Mirlaqi',
    imageUrl: '/LR-001.jpg',
    url: 'https://soundcloud.com/lovereactionfamily/sets/mirlaqi-disco-lore',
  },
]

const Label = ({ showAllLink }: { showAllLink: string }) => {
  const { setShowPlayer, setTrackIndex } = usePlayer()

  const playRelease = (index: number) => {
    setShowPlayer(true)
    setTrackIndex(index)
  }

  return (
    <div className="flex flex-nowrap items-center justify-center">
      {releases.map((release, index) => (
        <div className="m-2" key={release.id}>
          <div className="relative">
            <Image
              alt={release.title}
              className="h-64 w-full object-cover"
              src={release.imageUrl}
            />
            <div className="absolute bottom-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
              <button className="text-white" onClick={() => playRelease(index)}>
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

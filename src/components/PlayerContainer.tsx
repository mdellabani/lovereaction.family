'use client'
import React from 'react'
import { usePlayer } from '@/context/PlayerContext'
import AudioPlayer from './AudioPlayer'

const PlayerContainer = () => {
  const { playlist, showPlayer } = usePlayer()

  if (!playlist || !showPlayer) {
    return null
  }

  return (
    <div className="flex flex-col">
      <div className="flex-grow"></div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <AudioPlayer />
      </div>
    </div>
  )
}

export default PlayerContainer

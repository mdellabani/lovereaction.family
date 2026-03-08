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
    <>
      {/* Spacer so page content isn't hidden behind the fixed player */}
      <div className="h-24 sm:h-16" />
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <AudioPlayer />
      </div>
    </>
  )
}

export default PlayerContainer

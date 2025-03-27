import React from 'react'
import { usePlayer } from '@/context/PlayerContext'
import AudioPlayer from './AudioPlayer'

const PlayerContainer = () => {
  const { playlist, showPlayer } = usePlayer()

  if (!playlist.length || !showPlayer) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow"></div>
      <div className="mt-auto">
        <AudioPlayer />
      </div>
    </div>
  )
}

export default PlayerContainer

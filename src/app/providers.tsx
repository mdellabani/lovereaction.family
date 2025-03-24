'use client'

import { PlayerProvider } from 'context/playerProvider'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </NextUIProvider>
  )
}

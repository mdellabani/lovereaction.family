'use client'
import Footer from '@/components/Footer'
import PlayerContainer from '@/components/PlayerContainer'
import ThemedHeader from '@/components/ThemedHeader'
import { PlayerProvider } from '@/context/PlayerContext'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useState } from 'react'
import PasswordProtection from '@/components/PasswordProtection'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute="class"
        disableTransitionOnChange
        forcedTheme="light"
      >
        <PlayerProvider>
          <PasswordProtection setAuthenticated={setIsAuthenticated} />
          {isAuthenticated && (
            <>
              <ThemedHeader />
              <div className="mx-auto min-h-screen max-w-3xl px-4 pt-20 sm:px-8 md:px-16">
                <div className="flex h-full flex-col gap-10 md:gap-20">
                  {children}
                  <PlayerContainer />
                  <Footer />
                </div>
              </div>
            </>
          )}
        </PlayerProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}

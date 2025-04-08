'use client'
import Footer from '@/components/Footer'
import PlayerContainer from '@/components/PlayerContainer'
import ThemedHeader from '@/components/ThemedHeader'
import { PlayerProvider } from '@/context/PlayerContext'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import './globals.css'
import { useState } from 'react'
import PasswordProtection from '@/components/PasswordProtection'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <HeroUIProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <PlayerProvider>
              <PasswordProtection setAuthenticated={setIsAuthenticated} />
              {isAuthenticated && (
                <>
                  <ThemedHeader />
                  <div className="grid min-h-screen grid-cols-[1fr_minmax(800px,_1fr)_1fr] bg-gray-200">
                    <div className="bg-gray-150"></div>
                    <div className="bg-white p-28">
                      <div className="flex h-full flex-col gap-20">
                        {children}
                        <PlayerContainer />
                        <Footer />
                      </div>
                    </div>
                    <div className="bg-gray-150"></div>
                  </div>
                </>
              )}
            </PlayerProvider>
          </NextThemesProvider>
        </HeroUIProvider>
      </body>
    </html>
  )
}

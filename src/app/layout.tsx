'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlayerContainer from '@/components/PlayerContainer'
import { PlayerProvider } from '@/context/PlayerContext'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <NextUIProvider>
            <PlayerProvider>
              <div className="mx-96 flex h-screen flex-col gap-12">
                <Header />
                <div className="grow">{children}</div>
                <PlayerContainer />
                <Footer />
              </div>
            </PlayerProvider>
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

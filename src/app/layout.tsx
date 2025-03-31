import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PlayerContainer from '@/components/PlayerContainer'
import { PlayerProvider } from '@/context/PlayerContext'
import { Inter } from 'next/font/google'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import './globals.css'
import { HeroUIProvider } from '@heroui/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
              <div className="m-20 flex h-screen flex-col gap-20">
                <Header />
                {children}
                <PlayerContainer />
                <Footer />
              </div>
            </PlayerProvider>
          </NextThemesProvider>
        </HeroUIProvider>
      </body>
    </html>
  )
}

import Footer from '@components/footer'
import Header from '@components/header'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import AudioPlayer from '@components/audioPlayer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark" lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="mx-96 flex h-screen flex-col gap-12">
            <Header />
            <div className="grow">{children}</div>
            <AudioPlayer />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

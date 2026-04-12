import ClientLayout from '@/components/ClientLayout'
import { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

const url = 'https://lovereaction.family'
const title = 'Love Reaction'
const description =
  "Independent music label based in Rhône-Alpes (Grenoble, Lyon, Genève). Funk, afro, disco & soul on Roots — techno & electro on Zone — dance & family tracks on LR. Wa let's go!"

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
    'Love Reaction',
    'music label',
    'independent label',
    'Grenoble',
    'Lyon',
    'Genève',
    'Rhône-Alpes',
    'funk',
    'afro',
    'disco',
    'soul',
    'techno',
    'electro',
    'dance',
    'vinyl',
    'podcast',
  ],
  openGraph: {
    type: 'website',
    siteName: title,
    title,
    description,
    url,
    locale: 'en_US',
    images: [
      {
        url: '/logo-b.png',
        alt: 'Love Reaction logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/logo-b.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

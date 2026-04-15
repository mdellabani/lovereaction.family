'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const MEMORIES = Array.from(
  { length: 7 },
  (_, i) => `/memories/memory-${i + 1}.jpg`,
)

// Per-image focus points so faces aren't cropped on mobile
const FOCUS: Record<number, string> = {
  0: 'center 40%',
  1: 'center 35%',
  2: 'center 45%',
  3: 'center 35%',
  4: 'center 40%',
  5: 'center 60%',
  6: 'center 40%',
}

// Grid layout order: [1,2,4] [7,6] [3,5] → indices [0,1,3] [6,5] [2,4]
// Reveal order maps image index → reveal step (0-based)
const REVEAL_ORDER: Record<number, number> = {
  0: 0, // image 1 → reveals 1st
  1: 1, // image 2 → reveals 2nd
  3: 2, // image 4 → reveals 3rd
  6: 3, // image 7 → reveals 4th
  5: 4, // image 6 → reveals 5th
  2: 5, // image 3 → reveals 6th
  4: 6, // image 5 → reveals 7th
}

// Stagger delay (ms) between each image appearing
const STAGGER = 300
// How long the full mosaic stays before dismissing
const SPLASH_HOLD = 1200

const PasswordProtection = ({
  setAuthenticated,
}: {
  setAuthenticated: (arg0: boolean) => void
}) => {
  const [state, setState] = useState<'loading' | 'locked' | 'authenticated'>(
    'loading',
  )
  const [showSplash, setShowSplash] = useState(false)
  const [dismissing, setDismissing] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

  // Preload all images before starting
  useEffect(() => {
    let cancelled = false
    Promise.all(
      MEMORIES.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image()
            img.onload = () => resolve()
            img.onerror = () => resolve()
            img.src = src
          }),
      ),
    ).then(() => {
      if (!cancelled) setImagesReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Stagger image reveals
  useEffect(() => {
    if (!showSplash || !imagesReady) return
    if (visibleCount >= MEMORIES.length) return

    const timer = setTimeout(
      () => setVisibleCount((c) => c + 1),
      visibleCount === 0 ? 100 : STAGGER,
    )
    return () => clearTimeout(timer)
  }, [showSplash, imagesReady, visibleCount])

  // Splash lifecycle
  useEffect(() => {
    if (state !== 'loading' || !imagesReady) return

    const seenSplash = sessionStorage.getItem('splashSeen') === 'true'
    const password = process.env.NEXT_PUBLIC_PASSWORD
    const isAuthenticated =
      !password || localStorage.getItem('authenticated') === 'true'

    if (seenSplash) {
      if (isAuthenticated) {
        setState('authenticated')
        setAuthenticated(true)
      } else {
        setState('locked')
      }
      return
    }

    setShowSplash(true)
    const splashDuration = 100 + STAGGER * 6 + SPLASH_HOLD
    const timer = setTimeout(() => {
      sessionStorage.setItem('splashSeen', 'true')
      setDismissing(true)
      setTimeout(() => {
        setShowSplash(false)
        if (isAuthenticated) {
          setState('authenticated')
          setAuthenticated(true)
        } else {
          setState('locked')
        }
      }, 1000)
    }, splashDuration)

    return () => clearTimeout(timer)
  }, [state, setAuthenticated, imagesReady])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userPassword = formData.get('password') as string
    const password = process.env.NEXT_PUBLIC_PASSWORD

    if (userPassword === password) {
      localStorage.setItem('authenticated', 'true')
      setState('authenticated')
      setAuthenticated(true)
    } else {
      e.currentTarget.reset()
      e.currentTarget.querySelector('input')?.focus()
    }
  }

  if (state === 'authenticated' && !showSplash) return null

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-black transition-opacity duration-1000 ${dismissing ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Mosaic — 3 top, 2 middle, 2 bottom, no gaps */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top row: images 1, 2, 4 */}
        <div className="flex min-h-0 flex-1">
          {[0, 1, 3].map((i) => (
            <div
              className={`relative flex-1 overflow-hidden transition-opacity duration-500 ease-out ${REVEAL_ORDER[i] < visibleCount ? 'opacity-60' : 'opacity-0'}`}
              key={MEMORIES[i]}
            >
              <Image
                alt=""
                className="h-full w-full object-cover"
                fill
                priority
                sizes="33vw"
                src={MEMORIES[i]}
                style={{ objectPosition: FOCUS[i] }}
              />
            </div>
          ))}
        </div>
        {/* Middle row: images 7, 6 */}
        <div className="flex min-h-0 flex-1">
          {[6, 5].map((i) => (
            <div
              className={`relative flex-1 overflow-hidden transition-opacity duration-500 ease-out ${REVEAL_ORDER[i] < visibleCount ? 'opacity-60' : 'opacity-0'}`}
              key={MEMORIES[i]}
            >
              <Image
                alt=""
                className="h-full w-full object-cover"
                fill
                priority
                sizes="50vw"
                src={MEMORIES[i]}
                style={{ objectPosition: FOCUS[i] }}
              />
            </div>
          ))}
        </div>
        {/* Bottom row: images 3, 5 */}
        <div className="flex min-h-0 flex-1">
          {[2, 4].map((i) => (
            <div
              className={`relative flex-1 overflow-hidden transition-opacity duration-500 ease-out ${REVEAL_ORDER[i] < visibleCount ? 'opacity-60' : 'opacity-0'}`}
              key={MEMORIES[i]}
            >
              <Image
                alt=""
                className="h-full w-full object-cover"
                fill
                priority
                sizes="50vw"
                src={MEMORIES[i]}
                style={{ objectPosition: FOCUS[i] }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      {/* Centered logo + password */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <Image
            alt="Love Reaction"
            className="drop-shadow-2xl"
            height={160}
            priority
            src="/logo-b.png"
            style={{ filter: 'invert(1) brightness(2)' }}
            width={160}
          />
          {state === 'locked' && (
            <form
              className="flex flex-col items-center gap-4"
              onSubmit={handleSubmit}
            >
              <input
                autoFocus
                className="w-48 border-b border-white/40 bg-transparent py-2 text-center text-sm tracking-widest text-white/80 placeholder:text-white/40 focus:border-white/70 focus:outline-none"
                name="password"
                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                type="password"
              />
              <button
                className="text-xs tracking-[0.3em] text-white/50 transition-colors hover:text-white/80"
                type="submit"
              >
                ENTER
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default PasswordProtection

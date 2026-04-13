'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const MEMORIES = Array.from(
  { length: 7 },
  (_, i) => `/memories/memory-${i + 1}.jpg`,
)
const SLIDE_DURATION = 2500

const PasswordProtection = ({
  setAuthenticated,
}: {
  setAuthenticated: (arg0: boolean) => void
}) => {
  const [state, setState] = useState<'loading' | 'locked' | 'authenticated'>(
    'loading',
  )
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  const advanceSlide = useCallback(() => {
    setFadeIn(false)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % MEMORIES.length)
      setFadeIn(true)
    }, 600)
  }, [])

  useEffect(() => {
    if (state === 'authenticated') return
    const interval = setInterval(advanceSlide, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [state, advanceSlide])

  useEffect(() => {
    if (state !== 'loading') return

    const timer = setTimeout(() => {
      const password = process.env.NEXT_PUBLIC_PASSWORD
      if (!password) {
        setState('authenticated')
        setAuthenticated(true)
        return
      }
      if (localStorage.getItem('authenticated') === 'true') {
        setState('authenticated')
        setAuthenticated(true)
        return
      }
      setState('locked')
    }, 1500)

    return () => clearTimeout(timer)
  }, [state, setAuthenticated])

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

  if (state === 'authenticated') return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Slideshow background */}
      {MEMORIES.map((src, i) => (
        <Image
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === currentSlide && fadeIn ? 'opacity-50' : 'opacity-0'
          }`}
          fill
          key={src}
          priority={i < 2}
          sizes="100vw"
          src={src}
        />
      ))}

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Logo négatif + password */}
      <div className="relative z-10 flex flex-col items-center gap-8">
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
  )
}

export default PasswordProtection

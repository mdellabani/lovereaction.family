'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const PasswordProtection = ({
  setAuthenticated,
}: {
  setAuthenticated: (arg0: boolean) => void
}) => {
  const [state, setState] = useState<'loading' | 'locked' | 'authenticated'>(
    'loading',
  )

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div
        className={`flex flex-col items-center gap-8 ${
          state === 'loading' ? 'animate-pulse' : ''
        }`}
      >
        <Image
          alt="Love Reaction"
          className="opacity-80"
          height={120}
          priority
          src="/logo-b.png"
          width={120}
        />
        {state === 'locked' && (
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
          >
            <input
              autoFocus
              className="w-48 border-b border-black/20 bg-transparent py-2 text-center text-sm tracking-widest text-black/70 placeholder:text-black/30 focus:border-black/50 focus:outline-none"
              name="password"
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              type="password"
            />
            <button
              className="text-xs tracking-[0.3em] text-black/40 transition-colors hover:text-black/70"
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

'use client'

import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <Image
        alt="Love Reaction"
        className="opacity-10"
        height={80}
        src="/logo-b.png"
        width={80}
      />
      <p className="text-sm tracking-[0.3em] text-black/40">COMING SOON</p>
      <p className="max-w-xs text-xs leading-relaxed text-black/30">
        Our roster is being curated. Check back soon to discover the artists
        behind the sound.
      </p>
    </div>
  )
}

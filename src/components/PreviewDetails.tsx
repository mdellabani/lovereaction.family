import emailjs from 'emailjs-com'
import { usePlayer } from '@/context/PlayerContext'
import { PlayList, PreviewItem, ShopItem, TrackInfo } from '@/types/audio'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { isPlayList } from './PreviewList'
import TrackItem from './TrackItem'

export function ShopItemRow({
  item,
  release,
}: {
  item: ShopItem
  release?: string
}) {
  const [customPrice, setCustomPrice] = useState<string>('')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const effectivePrice = customPrice ? parseFloat(customPrice) : item.price
  const finalPrice = effectivePrice >= item.price ? effectivePrice : item.price

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_ORDER_TEMPLATE_ID ||
          process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!,
      )
      setSending(false)
      setSent(true)
      setTimeout(() => {
        setSent(false)
        setShowForm(false)
      }, 3000)
    } catch {
      setSending(false)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 flex-col">
          <span className="text-xs font-medium text-black/70">
            {item.format}
          </span>
          <span className="text-[10px] text-black/40">
            {item.soldOut ? (
              'Sold out'
            ) : item.nameYourPrice ? (
              <span className="flex items-center gap-1">
                €
                <input
                  className="w-12 border-b border-black/20 bg-transparent text-center text-[10px] text-black/60 focus:border-black/50 focus:outline-none"
                  min={item.price}
                  placeholder={item.price.toFixed(2)}
                  step="0.50"
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                />
                or more
              </span>
            ) : (
              `€${item.price.toFixed(2)}`
            )}
          </span>
        </div>
        {item.soldOut ? (
          <span className="text-[10px] tracking-[0.2em] text-black/30">
            SOLD OUT
          </span>
        ) : (
          <button
            className="text-[10px] tracking-[0.2em] text-black/40 transition-colors hover:text-black/70"
            type="button"
            onClick={() => setShowForm(!showForm)}
          >
            BUY
          </button>
        )}
      </div>
      {item.images && item.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto py-1">
          {item.images.map((src, idx) => (
            <button
              className="shrink-0 cursor-zoom-in"
              key={src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
            >
              <Image
                alt={item.name}
                className="rounded object-cover"
                height={80}
                src={src}
                width={80}
              />
            </button>
          ))}
        </div>
      )}
      {showForm && (
        <form
          className="flex flex-col gap-2 border-t border-black/5 pt-3"
          ref={formRef}
          onSubmit={handleOrder}
        >
          <input name="subject" type="hidden" value={`Order: ${item.name}`} />
          <input
            name="message"
            type="hidden"
            value={`Order request:\n\nItem: ${item.name}${release ? ` (${release})` : ''}\nFormat: ${item.format}\nAmount: €${finalPrice.toFixed(2)}`}
          />
          <div className="flex gap-2">
            <input
              autoFocus
              className="flex-1 border-b border-black/20 bg-transparent py-1 text-xs text-black/70 placeholder:text-black/30 focus:border-black/50 focus:outline-none"
              name="name"
              placeholder="Name"
              required
              type="text"
            />
            <input
              className="flex-1 border-b border-black/20 bg-transparent py-1 text-xs text-black/70 placeholder:text-black/30 focus:border-black/50 focus:outline-none"
              name="email"
              placeholder="Email"
              required
              type="email"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-black/40">
              {item.name} — €{finalPrice.toFixed(2)}
            </span>
            <button
              className="text-[10px] tracking-[0.2em] text-black/40 transition-colors hover:text-black/70 disabled:opacity-50"
              disabled={sending}
              type="submit"
            >
              {sent ? 'ORDER SENT!' : sending ? 'SENDING...' : 'CONFIRM'}
            </button>
          </div>
        </form>
      )}
      {lightboxIndex !== null && item.images && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setLightboxIndex(null)}
        >
          {item.images.length > 1 && (
            <button
              className="absolute left-4 text-2xl text-white/60 transition-colors hover:text-white"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(
                  (lightboxIndex - 1 + item.images!.length) %
                    item.images!.length,
                )
              }}
            >
              &#8249;
            </button>
          )}
          <Image
            alt={item.name}
            className="max-h-[90vh] w-auto rounded object-contain"
            height={800}
            src={item.images[lightboxIndex]}
            width={800}
          />
          {item.images.length > 1 && (
            <button
              className="absolute right-4 text-2xl text-white/60 transition-colors hover:text-white"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((lightboxIndex + 1) % item.images!.length)
              }}
            >
              &#8250;
            </button>
          )}
          <span className="absolute bottom-6 text-xs text-white/40">
            {lightboxIndex + 1} / {item.images.length}
          </span>
        </div>
      )}
    </div>
  )
}

const PreviewDetails = ({ track }: { track: PreviewItem }) => {
  const { togglePlay, setCurrentTrackId } = usePlayer()
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null)
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)

  const handlePlayPause = (track: TrackInfo) => {
    if (track === currentTrack) {
      togglePlay()
    } else {
      setCurrentTrackId(track.id)
      setCurrentTrack(track)
    }
  }

  const playlist = isPlayList(track) ? (track as PlayList) : null
  const galleryImages = playlist?.images

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border p-4 shadow-md">
      <div className="flex items-center gap-4">
        <Image
          alt={track.title}
          className="rounded-lg"
          height={100}
          src={track.imageUrl}
          width={100}
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold">{track.title}</h2>
          <p className="text-sm text-gray-600">{track.artist}</p>
        </div>
      </div>
      {galleryImages && galleryImages.length > 0 && (
        <div className="flex gap-3 overflow-x-auto py-1">
          {galleryImages.map((src, idx) => (
            <button
              className="shrink-0 cursor-zoom-in"
              key={src}
              type="button"
              onClick={() => setGalleryIndex(idx)}
            >
              <Image
                alt={`${track.title} — ${idx + 1}`}
                className="rounded object-cover"
                height={80}
                src={src}
                width={80}
              />
            </button>
          ))}
        </div>
      )}
      {galleryIndex !== null && galleryImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setGalleryIndex(null)}
        >
          {galleryImages.length > 1 && (
            <button
              className="absolute left-4 text-2xl text-white/60 transition-colors hover:text-white"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setGalleryIndex(
                  (galleryIndex - 1 + galleryImages.length) %
                    galleryImages.length,
                )
              }}
            >
              &#8249;
            </button>
          )}
          <Image
            alt={`${track.title} — ${galleryIndex + 1}`}
            className="max-h-[90vh] w-auto rounded object-contain"
            height={800}
            src={galleryImages[galleryIndex]}
            width={800}
          />
          {galleryImages.length > 1 && (
            <button
              className="absolute right-4 text-2xl text-white/60 transition-colors hover:text-white"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setGalleryIndex((galleryIndex + 1) % galleryImages.length)
              }}
            >
              &#8250;
            </button>
          )}
          <span className="absolute bottom-6 text-xs text-white/40">
            {galleryIndex + 1} / {galleryImages.length}
          </span>
        </div>
      )}
      {track.description && (
        <p className="whitespace-pre-line text-xs leading-relaxed text-black/60">
          {track.description}
        </p>
      )}
      {playlist && (
        <div className="w-full rounded-lg border p-4 shadow-md">
          <div className="flex flex-col gap-2">
            {playlist.tracks.map((item) => (
              <TrackItem
                handlePlayPause={handlePlayPause}
                key={item.id}
                track={item}
              />
            ))}
          </div>
        </div>
      )}
      {playlist?.shopItems && playlist.shopItems.length > 0 && (
        <div className="w-full rounded-lg border border-black/10 p-4">
          <div className="flex flex-col divide-y divide-black/5">
            {playlist.shopItems.map((item) => (
              <ShopItemRow
                item={item}
                key={item.name}
                release={`${track.artist} — ${track.title}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PreviewDetails

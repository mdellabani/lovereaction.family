'use client'

import { releases } from '@/components/data'
import { ShopItemRow, ShopSupportNote } from '@/components/PreviewDetails'
import { PlayList, ShopItem } from '@/types/audio'
import Image from 'next/image'

interface MusicCard {
  type: 'music'
  release: PlayList
  items: ShopItem[]
}

interface MerchCard {
  type: 'merch'
  release: PlayList
  item: ShopItem
}

type ShopCard = MusicCard | MerchCard

export default function Page() {
  const cards: ShopCard[] = releases.flatMap((release) => {
    const items = release.shopItems || []
    const musicItems = items.filter((i) => !i.images || i.images.length === 0)
    const merchItems = items.filter((i) => i.images && i.images.length > 0)

    const result: ShopCard[] = []
    if (musicItems.length > 0) {
      result.push({ type: 'music', release, items: musicItems })
    }
    merchItems.forEach((item) => {
      result.push({ type: 'merch', release, item })
    })
    return result
  })

  const releaseLabel = (r: PlayList) => `${r.artist} — ${r.title}`

  return (
    <div className="flex flex-col items-center gap-10 py-4">
      <p className="text-sm tracking-[0.3em] text-black/40">SHOP</p>
      <div className="w-full max-w-lg">
        <ShopSupportNote />
      </div>
      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3">
        {cards.map((card) => {
          if (card.type === 'music') {
            return (
              <div
                className="flex flex-col gap-3 rounded-lg border border-black/10 p-3"
                key={`${card.release.title}-music`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded">
                  <Image
                    alt={card.release.title || ''}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    src={card.release.imageUrl || '/logo-b.png'}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-black/40">
                    {card.release.artist}
                  </p>
                  <p className="text-[9px] tracking-[0.15em] text-black/30">
                    {card.release.title}
                  </p>
                </div>
                <div className="flex flex-col divide-y divide-black/5">
                  {card.items.map((item) => (
                    <ShopItemRow
                      item={item}
                      key={item.name}
                      release={releaseLabel(card.release)}
                    />
                  ))}
                </div>
              </div>
            )
          }

          return (
            <div
              className="flex flex-col gap-3 rounded-lg border border-black/10 p-3"
              key={`${card.release.title}-${card.item.name}`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded">
                <Image
                  alt={card.item.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  src={card.item.images![0]}
                />
              </div>
              <div className="text-center">
                <p className="text-[10px] text-black/40">
                  {card.release.artist}
                </p>
                <p className="text-[9px] tracking-[0.15em] text-black/30">
                  {card.release.title}
                </p>
              </div>
              <ShopItemRow
                item={card.item}
                release={releaseLabel(card.release)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export enum Category {
  LR = 'LR',
  ROOTS = 'ROOTS',
  ZONE = 'ZONE',
}

export interface PreviewItem {
  title?: string
  artist?: string
  description?: string
  type?: Category
  imageUrl?: string
}

export interface TrackInfo extends PreviewItem {
  id: number
  order: number
  description?: string
  url: string
}

export interface ShopItem {
  name: string
  format: string
  price: number
  currency: string
  images?: string[]
  soldOut?: boolean
  nameYourPrice?: boolean
}

export interface PlayList extends PreviewItem {
  images?: string[]
  tracks: TrackInfo[]
  shopItems?: ShopItem[]
}

export interface RSSPodcast {
  order: number
  type: Category
}

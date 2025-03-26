export enum Category {
  LR = 1,
  ROOTS,
  Zone,
}

export interface TrackInfo {
  id: number
  type: Category
  title: string
  artist: string
  description?: string
  imageUrl: string
  url: string
}

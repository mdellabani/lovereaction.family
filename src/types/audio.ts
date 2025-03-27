export enum Category {
  LR = 1,
  ROOTS,
  Zone,
}

export interface TrackInfo {
  id: number
  order?: number
  type?: Category
  title: string
  artist?: string
  description?: string
  imageUrl?: string
  url: string
}

export interface PlayList {
  title: string
  artist?: string
  type?: Category
  imageUrl?: string
  tracks: TrackInfo[]
}

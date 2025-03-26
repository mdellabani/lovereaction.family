export enum Universe {
  LR = 1,
  ROOTS,
  Zone,
}

export interface TrackInfo {
  id: number
  type: Universe
  title: string
  artist: string
  description?: string
  imageUrl: string
  url: string
}

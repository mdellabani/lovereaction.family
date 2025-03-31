export enum Category {
  LR = 'LR',
  ROOTS = 'ROOTS',
  Zone = 'ZONE',
}

export interface PreviewItem {
  title?: string
  artist?: string
  type?: Category
  imageUrl?: string
}

export interface TrackInfo extends PreviewItem {
  id: number
  order: number
  description?: string
  url: string
}

export interface PlayList extends PreviewItem {
  tracks: TrackInfo[]
}

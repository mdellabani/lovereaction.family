export interface TrackInfo {
  id: string;
  type: Universe,
  title: string;
  artist: string;
  imageUrl: string;
  url: string;
}

export enum Universe {
  LR = 1,
  ROOTS,
  Zone,
}

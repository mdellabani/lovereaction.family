import { Category, PlayList } from '@/types/audio'

export const releases: PlayList[] = [
  {
    title: 'Roots-001',
    artist: 'Z.Zee',
    type: Category.ROOTS,
    imageUrl: '/Roots-001.jpg',
    tracks: [
      {
        id: 1,
        order: 1,
        title: 'More of It',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-zzee-more-of-it',
      },
      {
        id: 2,
        order: 2,
        title: 'One Special Day',
        url: '/api/audio?file=Roots-001/A2.mp3',
      },
      {
        id: 3,
        order: 3,
        title: 'Brazil Meets India In Martillo',
        url: '/api/audio?file=Roots-001/B1.mp3',
      },
      {
        id: 4,
        order: 4,
        title: "Fleur D'Oranger",
        url: '/api/audio?file=Roots-001/B2.mp3',
      },
    ],
  },
  {
    title: 'LR-001',
    artist: 'Mirlaqi',
    type: Category.LR,
    imageUrl: '/LR-001.jpg',
    tracks: [
      {
        id: 1,
        order: 1,
        title: 'A Dream About You',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-mirlaqi-a-dream-about-you',
      },
      {
        id: 2,
        order: 2,
        title: 'Mimo Sur La Plage',
        url: '/api/audio?file=LR-001/A2.mp3',
      },
      {
        id: 3,
        order: 3,
        title: 'Take It As It Comes',
        url: '/api/audio?file=LR-001/A3.mp3',
      },
      {
        id: 4,
        order: 4,
        title: 'This Color',
        url: '/api/audio?file=LR-001/B1.mp3',
      },
      {
        id: 5,
        order: 5,
        title: 'Disco Lore (LeonxLeon Remix)',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-mirlaqi-mimo-sur-la-plage-leonxleon-remix',
      },
    ],
  },
]

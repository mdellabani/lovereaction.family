import { Category, PlayList, RSSPodcast } from '@/types/audio'

export const releases: PlayList[] = [
  {
    title: 'Roots-001',
    artist: 'Z.Zee',
    type: Category.ROOTS,
    imageUrl: '/Roots-001.jpg',
    tracks: [
      {
        id: 0,
        order: 1,
        title: 'More of It',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-zzee-more-of-it',
      },
      {
        id: 1,
        order: 2,
        title: 'One Special Day',
        url: '/api/audio?file=Roots-001/A2.mp3',
      },
      {
        id: 2,
        order: 3,
        title: 'Brazil Meets India In Martillo',
        url: '/api/audio?file=Roots-001/B1.mp3',
      },
      {
        id: 3,
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
        id: 0,
        order: 1,
        title: 'A Dream About You',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-mirlaqi-a-dream-about-you',
      },
      {
        id: 1,
        order: 2,
        title: 'Mimo Sur La Plage',
        url: '/api/audio?file=LR-001/A2.mp3',
      },
      {
        id: 2,
        order: 3,
        title: 'Take It As It Comes',
        url: '/api/audio?file=LR-001/A3.mp3',
      },
      {
        id: 3,
        order: 4,
        title: 'This Color',
        url: '/api/audio?file=LR-001/B1.mp3',
      },
      {
        id: 4,
        order: 5,
        title: 'Disco Lore (LeonxLeon Remix)',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-mirlaqi-mimo-sur-la-plage-leonxleon-remix',
      },
    ],
  },
]

export const orderedTracks: Map<string, RSSPodcast> = new Map([
  ['LR-COOL#11', { order: 1, type: Category.LR }],
  ['Podcastel #45', { order: 2, type: Category.ZONE }],
  ['LR-COOL#10', { order: 3, type: Category.LR }],
  ['Podcastel #44', { order: 3, type: Category.ZONE }],
  ['LR-COOL#09', { order: 4, type: Category.LR }],
  ['LR-COOL#08', { order: 5, type: Category.ZONE }],
  ['Podcastel #43', { order: 6, type: Category.ROOTS }],
  ['LR-COOL#07', { order: 7, type: Category.LR }],
  ['LR-COOL#06', { order: 8, type: Category.LR }],
  ['Podcastel #42', { order: 9, type: Category.ZONE }],
  ['LR-COOL#05', { order: 10, type: Category.ZONE }],
  ['Podcastel #41', { order: 12, type: Category.ZONE }],
  ['LR-COOL#04', { order: 12, type: Category.ROOTS }],
  ['Podcastel #40', { order: 13, type: Category.ROOTS }],
  ['Podcastel #39', { order: 14, type: Category.ROOTS }], // LR ?
  ['Podcastel #38', { order: 15, type: Category.ROOTS }], // LR ?
  ['Podcastel #37', { order: 16, type: Category.LR }],
  ['Podcastel #36', { order: 17, type: Category.LR }],
  ['Podcastel #35', { order: 18, type: Category.LR }],
  ['Podcastel #34', { order: 19, type: Category.LR }],
  ['Podcastel #33', { order: 20, type: Category.LR }], // ZONE ?
  ['Podcastel #32', { order: 21, type: Category.ROOTS }], // LR ?
  ['Podcastel #31', { order: 22, type: Category.ROOTS }], // LR ?
  ['Podcastel #30', { order: 23, type: Category.ROOTS }], // LR ?
  ['Podcastel #29', { order: 24, type: Category.LR }], // ZONE ?
  ['Podcastel #28', { order: 25, type: Category.LR }],
  ['Podcastel #27', { order: 26, type: Category.LR }],
  ['Podcastel #26', { order: 27, type: Category.LR }],
  ['Podcastel #25', { order: 28, type: Category.LR }],
  ['LR-COOL#03', { order: 29, type: Category.ROOTS }],
  ['Podcastel #24', { order: 30, type: Category.ROOTS }],
  ['Podcastel #23', { order: 31, type: Category.ROOTS }],
  ['Podcastel #22', { order: 32, type: Category.LR }],
  ['Podcastel #21', { order: 33, type: Category.ZONE }],
  ['Podcastel #20', { order: 34, type: Category.LR }],
  ['Podcastel #19', { order: 35, type: Category.LR }],
  ['Podcastel #18', { order: 36, type: Category.ROOTS }],
  ['Podcastel #17', { order: 37, type: Category.ZONE }],
  ['Podcastel #16', { order: 38, type: Category.LR }],
  ['Podcastel #15', { order: 39, type: Category.LR }],
  ['Podcastel #14', { order: 40, type: Category.ZONE }],
  ['Podcastel #13', { order: 41, type: Category.ZONE }],
  ['LR-COOL#02', { order: 42, type: Category.ROOTS }],
  ['Podcastel #12', { order: 43, type: Category.LR }],
  ['Podcastel #11', { order: 44, type: Category.LR }],
  ['Podcastel #10', { order: 45, type: Category.ROOTS }],
  ['Podcastel #9', { order: 46, type: Category.LR }],
  ['Podcastel #8', { order: 47, type: Category.ROOTS }],
  ['Podcastel #7', { order: 48, type: Category.ROOTS }],
  ['LR-COOL#01', { order: 49, type: Category.LR }],
  ['Podcastel #6', { order: 50, type: Category.LR }],
  ['Podcastel #5', { order: 51, type: Category.ZONE }],
  ['Podcastel #4', { order: 52, type: Category.LR }],
  ['Podcastel #3', { order: 53, type: Category.ROOTS }],
  ['Podcastel #2', { order: 54, type: Category.ZONE }],
  ['Podcastel #1', { order: 55, type: Category.LR }],
])

export const ALL_PODCASTS = 'podcasts-All-All'
export const PLAYLIST_CATEGORIES = ['All', 'LR-COOL', 'Podcastel']
export const TRACK_TYPES = ['All', 'LR', 'ROOTS', 'ZONE']

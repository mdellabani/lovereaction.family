import { Category, PlayList, RSSPodcast } from '@/types/audio'

export const releases: PlayList[] = [
  {
    title: 'ZONE#001',
    artist: 'ORA - New Land',
    type: Category.ZONE,
    imageUrl: '/releases/zone-001/cover.jpg',
    description:
      'Love Reaction returns with a new release and unveils the third and final chapter of its vinyl catalogue: ZONE, a series dedicated to club-oriented electronic music.\nFor the occasion, the label welcomes ORA, two seasoned professional musicians rooted in the jazz scene, eager to explore new sonic territories together.\n\nWith Common Frequency, the duo unfolds a raw and organic sonic tapestry. Live, they sculpt landscapes in real time using drum machines and synthesizers, unleashing a club energy that is both electric and vibrant. Between analog textures and immersive rhythms, this debut EP asserts a strong and magnetic identity.',
    shopItems: [
      {
        name: 'ZONE#001 Vinyl',
        format: 'Vinyl',
        price: 17.5,
        currency: 'EUR',
        nameYourPrice: true,
      },
      {
        name: 'ZONE#001 Digital',
        format: 'Digital',
        price: 7.5,
        currency: 'EUR',
        nameYourPrice: true,
      },
    ],
    tracks: [
      {
        id: 0,
        order: 1,
        title: 'Transient 96',
        imageUrl: '/releases/zone-001/cover.jpg',
        url: '/api/audio?file=Zone-001/A1.mp3',
      },
      {
        id: 1,
        order: 2,
        title: 'True Love',
        imageUrl: '/releases/zone-001/cover.jpg',
        url: '/api/audio?file=Zone-001/A2.mp3',
      },
      {
        id: 2,
        order: 3,
        title: 'Micronomie',
        imageUrl: '/releases/zone-001/cover.jpg',
        url: '/api/audio?file=Zone-001/B1.mp3',
      },
      {
        id: 3,
        order: 4,
        title: 'Hydromel',
        imageUrl: '/releases/zone-001/cover.jpg',
        url: '/api/audio?file=Zone-001/B2.mp3',
      },
    ],
  },
  {
    title: 'LR#001',
    artist: 'Mirlaqi - Disco Lore',
    type: Category.LR,
    imageUrl: '/releases/lr-001/cover.jpg',
    images: ['/releases/lr-001/A.jpg', '/releases/lr-001/B.jpg'],
    description:
      "After a first release by a member of the crew, Love Reaction is proud and humbled to welcome on the label one of Geneva's rising stars and longtime friend, Mirlaqi.\nWith this record, he offers a simple yet poetic groove: Disco and balearic in their broadest sense, tinged with his signature touch of Spatial House.\nA very personal project, produced in collaboration with family and friends.\n\nA-side includes the most organic tracks of the record, that, while still suited to make you dance, will also fit perfectly as a soundtrack to end a shiny afternoon in front of the ocean.\nOn the flip, the clubbier tracks: An original production, This Color, which is the track that inspired the cover art, and a remix by parisian italo-maestro LeonxLeon. Expect the most infectious grooves the balearic spectrum could offer and prepare to dance, not on the beach this time, but rather in orbit, on the red sand of Mars.",
    shopItems: [
      {
        name: 'LR#001 Vinyl',
        format: 'Vinyl',
        price: 18,
        currency: 'EUR',
        nameYourPrice: true,
      },
      {
        name: 'LR#001 T-Shirt',
        format: 'T-Shirt',
        price: 36,
        currency: 'EUR',
        images: [
          '/releases/lr-001/shirt-1.jpg',
          '/releases/lr-001/shirt-2.jpg',
        ],
      },
    ],
    tracks: [
      {
        id: 0,
        order: 1,
        title: 'A Dream About You',
        imageUrl: '/releases/lr-001/cover.jpg',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-mirlaqi-a-dream-about-you',
      },
      {
        id: 1,
        order: 2,
        title: 'Mimo Sur La Plage',
        imageUrl: '/releases/lr-001/cover.jpg',
        url: '/api/audio?file=LR-001/A2.mp3',
      },
      {
        id: 2,
        order: 3,
        title: 'Take It As It Comes',
        imageUrl: '/releases/lr-001/cover.jpg',
        url: '/api/audio?file=LR-001/A3.mp3',
      },
      {
        id: 3,
        order: 4,
        title: 'This Color',
        imageUrl: '/releases/lr-001/cover.jpg',
        url: '/api/audio?file=LR-001/B1.mp3',
      },
      {
        id: 4,
        order: 5,
        title: 'Disco Lore (LeonxLeon Remix)',
        imageUrl: '/releases/lr-001/cover.jpg',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-mirlaqi-mimo-sur-la-plage-leonxleon-remix',
      },
    ],
  },
  {
    title: 'ROOTS#001',
    artist: 'Z.Zee - Save the Child in You',
    type: Category.ROOTS,
    imageUrl: '/releases/roots-001/cover.jpg',
    images: ['/releases/roots-001/vinyles.jpg'],
    description:
      'For this maiden EP, Love Reaction calls upon a cornerstone of its family: Z.ZEE, who goes back to the roots of house music.\n\nAssisted by few musicians whose live performances add a remarkable share of relief and magic. Z.ZEE orchestrates, composes, plays bongos and tablas; he injects all his soul and services a Latin House that is the very picture of himself, with jazz rhythms and Rhodes melodies.\n\nThese elements sketch a balanced and luminous music, which will subtly transport you to a landscape bathed in orange light, where one simply relishes time, surrounded by warm souls and friendly smiles.',
    shopItems: [
      {
        name: 'ROOTS#001 Vinyl',
        format: 'Vinyl',
        price: 18,
        currency: 'EUR',
        soldOut: true,
      },
    ],
    tracks: [
      {
        id: 0,
        order: 1,
        title: 'More of It',
        imageUrl: '/releases/roots-001/cover.jpg',
        url: 'https://soundcloud.com/les-yeux-orange/premiere-zzee-more-of-it',
      },
      {
        id: 1,
        order: 2,
        title: 'One Special Day',
        imageUrl: '/releases/roots-001/cover.jpg',
        url: '/api/audio?file=Roots-001/A2.mp3',
      },
      {
        id: 2,
        order: 3,
        title: 'Brazil Meets India In Martillo',
        imageUrl: '/releases/roots-001/cover.jpg',
        url: '/api/audio?file=Roots-001/B1.mp3',
      },
      {
        id: 3,
        order: 4,
        title: "Fleur D'Oranger",
        imageUrl: '/releases/roots-001/cover.jpg',
        url: '/api/audio?file=Roots-001/B2.mp3',
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

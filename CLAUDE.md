# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

lovereaction.family is a Next.js 14 audio streaming web app for a music label. It serves releases (vinyl/digital), podcasts from a SoundCloud RSS feed, and has stub pages for events, artists, and shop. There is no database — releases are hardcoded in `src/components/data.tsx` and podcasts are parsed from RSS at runtime.

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build (ignores TS errors via next.config)
npm run lint     # ESLint
```

No test framework is configured.

Pre-commit hooks (Husky + lint-staged) run ESLint --fix and Prettier --write on staged .ts/.tsx files.

## Architecture

**Routing**: Next.js 14 App Router under `src/app/`. All pages are Client Components (`'use client'`).

**Provider hierarchy** (in `ClientLayout.tsx`):
```
HeroUIProvider → NextThemesProvider → PlayerProvider → PasswordProtection + Page content
```

**State management**: `PlayerContext.tsx` uses React Context + `useReducer`. It holds all player state (playlist, track index, play/pause, volume, progress) and exposes actions via `usePlayer()` hook. The RSS feed is parsed here on mount and cached in localStorage for 24 hours.

**Audio sources are mixed**:
- Local files: served via `/api/audio?file=Zone-001/A1.mp3` from an `/assets` directory
- External: direct SoundCloud URLs in release data

**Two API routes**:
- `GET /api/rss` — proxies the SoundCloud RSS feed
- `GET /api/audio?file=...` — streams local MP3 files from `/assets`

## Key Domain Model

- `PreviewItem` — base interface (title, artist, type, imageUrl)
- `TrackInfo extends PreviewItem` — adds id, order, url (a playable track)
- `PlayList extends PreviewItem` — adds tracks array
- `Category` enum: LR, ROOTS, ZONE (the three label sub-brands)

Track IDs are sequential per playlist (0, 1, 2...), not globally unique.

## Code Style

- Prettier: single quotes, no semicolons, trailing commas
- ESLint enforces JSX prop sorting (callbacks last) and Tailwind class ordering
- Dark mode is currently force-disabled (`forcedTheme="light"` in ClientLayout)
- Password protection is gated on `NEXT_PUBLIC_PASSWORD` env var — if unset, access is open

## Notable Patterns

- `PreviewList` is a generic component (`<T extends PreviewItem>`) used for both releases (PlayList items) and podcasts (TrackInfo items). When rendering individual tracks, pass the parent `playlist` prop so clicking a track switches the active playlist correctly.
- `data.tsx` contains the `orderedTracks` Map that assigns ordering and category to each podcast episode by title.
- The `parseRSS` function in PlayerContext filters RSS items to only "LR-COOL" and "Podcastel" episodes.
- Remote images are restricted to `i1.sndcdn.com` in `next.config.js`.

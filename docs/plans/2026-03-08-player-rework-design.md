# Player Rework Design

## Goal
Restyle the audio player to be responsive (Spotify-inspired) and add a "next up" queue panel.

## Desktop Layout
- Fixed bottom bar, single row: `[Art + Title/Artist] [prev|play|next|loop] [Progress Slider] [Volume] [Queue Icon]`
- Thin gradient progress line at top edge of bar (purple > red > yellow > green, matching header)
- Interactive inline slider for seeking (restyled)
- Follows site light/dark theme
- Queue icon (lucide `ListMusic`) on far right — opens side drawer from right

## Mobile Layout
- Two-row compact bar:
  - Row 1: Album art (small) + Title/Artist + Play/Pause + Queue Icon
  - Row 2: Full-width progress slider
- Thin gradient progress line at top edge
- No volume control (users use device volume)
- No loop/skip buttons visible — accessible in queue panel
- Queue icon opens slide-up panel (~70% screen height)

## Queue Panel

### Mobile: Slide-up panel
- Slides up from bottom, covers ~70% of screen
- Dismissible by swiping down (touch drag gesture)
- Backdrop blur + dark overlay behind

### Desktop: Side drawer
- Slides in from right edge
- ~320px wide
- Dismissible by clicking outside or close button
- Backdrop blur

### Panel Content (shared)
- Playlist title header
- Scrollable track list: thumbnail + title + artist per row
- Current track highlighted with accent color + animated bars icon
- Tap/click a track to play it immediately

## Styling
- Progress gradient: `from-purple-400 via-red-300 via-yellow-200 to-green-300`
- Site theme aware (light bg in light mode, dark bg in dark mode)
- Smooth CSS transitions for panel open/close
- Player bar shadow for elevation

## Components
- `AudioPlayer.tsx` — reworked, responsive layout
- `QueuePanel.tsx` — new, the slide-up/side-drawer queue view
- `PlayerContainer.tsx` — minor updates for queue panel positioning

## Existing dependencies
- `react-player` — audio playback (keep)
- `rc-slider` — progress/volume sliders (keep, restyle)
- `lucide-react` — icons (keep, add ListMusic)

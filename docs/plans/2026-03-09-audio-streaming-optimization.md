# Audio Streaming Optimization Plan

**Goal:** Make audio playback faster (instant start, seekable) and reduce bandwidth waste.

**Current state:** `/api/audio` streams full MP3 files (320kbps, 18-23MB each) with no caching and no Range request support.

---

### Task 1: Add HTTP Range Request Support (Priority: HIGH)

**File:** `src/app/api/audio/route.ts`

Enable HTTP 206 Partial Content so the browser can:
- Start playback immediately (only fetches first chunk)
- Seek to any position without downloading the whole file
- Stream progressively as the user listens

**Implementation:**
- Parse `Range` header from request (e.g., `bytes=0-65535`)
- If Range header present: return 206 with `Content-Range`, `Accept-Ranges: bytes`, and the requested byte slice via `fs.createReadStream({ start, end })`
- If no Range header: return 200 with full file (current behavior) + `Accept-Ranges: bytes` header to advertise support

### Task 2: Add Cache Headers (Priority: MEDIUM)

**File:** `src/app/api/audio/route.ts`

Add response headers so browsers cache audio files:
- `Cache-Control: public, max-age=604800, immutable` (7 days — files don't change)
- `ETag` based on file path + mtime for cache validation

This prevents re-downloading the same track on repeat plays or page revisits.

### Task 3: Encode Web-Optimized Versions (Priority: LOW / OPTIONAL)

**Not a code change** — this is a one-time asset pipeline step.

Current files are 320 kbps. For web streaming, 192 kbps is indistinguishable to most listeners and cuts file sizes by ~40%.

```bash
# Example: batch convert with ffmpeg
for f in assets/**/*.mp3; do
  ffmpeg -i "$f" -b:a 192k -y "${f%.mp3}-web.mp3"
done
```

Could also consider:
- Generating 128kbps versions for mobile (lower bandwidth)
- Keeping 320kbps originals as source of truth

This task is optional — Tasks 1 and 2 give the biggest wins without touching the audio files.

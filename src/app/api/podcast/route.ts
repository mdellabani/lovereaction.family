import { type NextRequest, NextResponse } from 'next/server'
import RSSParser from 'rss-parser'

const RSS_URL =
  'https://feeds.soundcloud.com/users/soundcloud:users:505440711/sounds.rss'

let cachedFeed: { items: Record<string, string>; ts: number } | null = null
const CACHE_TTL = 10 * 60 * 1000 // 10 min — short enough to get fresh signed URLs

async function resolveUrl(title: string): Promise<string | null> {
  if (!cachedFeed || Date.now() - cachedFeed.ts > CACHE_TTL) {
    const parser = new RSSParser()
    const feed = await parser.parseURL(RSS_URL)
    const items: Record<string, string> = {}
    for (const item of feed.items) {
      if (item.title && item.enclosure?.url) {
        items[item.title] = item.enclosure.url
      }
    }
    cachedFeed = { items, ts: Date.now() }
  }
  return cachedFeed.items[title] ?? null
}

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  if (!title) {
    return NextResponse.json(
      { error: 'title parameter is required' },
      { status: 400 },
    )
  }

  let url = await resolveUrl(title)
  if (!url) {
    return NextResponse.json({ error: 'Track not found' }, { status: 404 })
  }

  const rangeHeader = request.headers.get('range')
  const headers: Record<string, string> = {}
  if (rangeHeader) {
    headers['Range'] = rangeHeader
  }

  let upstream = await fetch(url, { headers })

  // If SoundCloud returns 403, the signed URL expired — bust cache and retry once
  if (upstream.status === 403) {
    cachedFeed = null
    url = await resolveUrl(title)
    if (!url) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 })
    }
    upstream = await fetch(url, { headers })
  }

  if (!upstream.ok && upstream.status !== 206) {
    return new Response('Upstream error', { status: upstream.status })
  }

  const responseHeaders: Record<string, string> = {
    'Content-Type': upstream.headers.get('Content-Type') || 'audio/mpeg',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-store',
  }

  const contentLength = upstream.headers.get('Content-Length')
  if (contentLength) responseHeaders['Content-Length'] = contentLength

  const contentRange = upstream.headers.get('Content-Range')
  if (contentRange) responseHeaders['Content-Range'] = contentRange

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  })
}

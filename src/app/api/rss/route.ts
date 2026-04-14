import { type NextRequest, NextResponse } from 'next/server'
import RSSParser from 'rss-parser'

const REVALIDATE_TIME = 60 * 60 * 2 // 2 hours — SoundCloud signed URLs expire frequently
export async function GET(request: NextRequest) {
  const bustCache = request.nextUrl.searchParams.has('t')
  const parser = new RSSParser()
  return await parser
    .parseURL(
      'https://feeds.soundcloud.com/users/soundcloud:users:505440711/sounds.rss',
    )
    .then((feed) =>
      NextResponse.json(feed, {
        headers: {
          'Cache-Control': bustCache
            ? 'no-store'
            : `s-maxage=${REVALIDATE_TIME}, stale-while-revalidate`,
        },
      }),
    )
    .catch((error) =>
      NextResponse.json(
        { error: 'Failed to fetch RSS feed.' + error },
        { status: 500 },
      ),
    )
}

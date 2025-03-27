import { NextResponse } from 'next/server'
import RSSParser from 'rss-parser'

const REVALIDATE_TIME = 60 * 60 * 24
export async function GET() {
  const parser = new RSSParser()
  return await parser
    .parseURL(
      'https://feeds.soundcloud.com/users/soundcloud:users:505440711/sounds.rss',
    )
    .then((feed) =>
      NextResponse.json(feed, {
        headers: {
          'Cache-Control': `s-maxage=${REVALIDATE_TIME}, stale-while-revalidate`,
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

import fs from 'fs'
import { NextRequest } from 'next/server'
import path from 'path'

const isValidAudioFile = (fileName: string) => fileName.endsWith('.mp3')

function toReadableStream(
  nodeStream: fs.ReadStream,
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      nodeStream.on('data', (chunk) => {
        controller.enqueue(chunk as Uint8Array)
      })
      nodeStream.on('end', () => {
        controller.close()
      })
      nodeStream.on('error', (err) => {
        controller.error(err)
      })
    },
  })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const file = searchParams.get('file')

  if (!file || typeof file !== 'string') {
    return new Response(
      JSON.stringify({ error: 'File parameter is required' }),
      { status: 400 },
    )
  }

  const audioFilePath = path.resolve('assets', file)
  if (!isValidAudioFile(file) || !fs.existsSync(audioFilePath)) {
    return new Response(JSON.stringify({ error: 'File not found' }), {
      status: 404,
    })
  }

  const stat = fs.statSync(audioFilePath)
  const fileSize = stat.size
  const etag = `"${stat.mtimeMs.toString(36)}-${fileSize.toString(36)}"`

  const commonHeaders: Record<string, string> = {
    'Content-Type': 'audio/mpeg',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=604800, immutable',
    ETag: etag,
  }

  const rangeHeader = req.headers.get('range')

  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d+)-(\d*)/)
    if (!match) {
      return new Response('Invalid Range header', {
        status: 416,
        headers: { 'Content-Range': `bytes */${fileSize}` },
      })
    }

    const start = parseInt(match[1], 10)
    const end = match[2] ? parseInt(match[2], 10) : fileSize - 1

    if (start >= fileSize || end >= fileSize || start > end) {
      return new Response('Range Not Satisfiable', {
        status: 416,
        headers: { 'Content-Range': `bytes */${fileSize}` },
      })
    }

    const contentLength = end - start + 1
    const stream = toReadableStream(
      fs.createReadStream(audioFilePath, { start, end }),
    )

    return new Response(stream, {
      status: 206,
      headers: {
        ...commonHeaders,
        'Content-Length': contentLength.toString(),
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      },
    })
  }

  const stream = toReadableStream(fs.createReadStream(audioFilePath))

  return new Response(stream, {
    headers: {
      ...commonHeaders,
      'Content-Length': fileSize.toString(),
    },
  })
}

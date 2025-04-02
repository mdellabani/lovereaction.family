import fs from 'fs'
import { NextRequest } from 'next/server'
import path from 'path'

const isValidAudioFile = (fileName: string) => fileName.endsWith('.mp3')

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

  const readStream = fs.createReadStream(audioFilePath)
  const stream = new ReadableStream({
    start(controller) {
      readStream.on('data', (chunk) => {
        controller.enqueue(chunk)
      })

      readStream.on('end', () => {
        controller.close()
      })

      readStream.on('error', (err) => {
        controller.error(err)
      })
    },
  })
  return new Response(stream, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': fs.statSync(audioFilePath).size.toString(),
    },
  })
}

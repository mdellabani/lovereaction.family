import fs from 'fs'
import { NextApiRequest } from 'next'
import path from 'path'

const isValidAudioFile = (fileName: string) => fileName.endsWith('.mp3')

export async function GET(req: NextApiRequest) {
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
    console.log('ssFile path:', audioFilePath, !fs.existsSync(audioFilePath))
    return new Response(JSON.stringify({ error: 'File not found' }), {
      status: 404,
    })
  }

  const readStream = fs.createReadStream(audioFilePath)
  return new Response(readStream, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': fs.statSync(audioFilePath).size,
    },
  })
}

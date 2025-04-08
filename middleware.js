// middleware.js
import { NextResponse } from 'next/server'

export function middleware(req) {
  const password = process.env.PASSWORD

  const authHeader = req.headers.get('authorization')
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Password Protected"',
      },
    })
  }

  const encoded = authHeader.split(' ')[1]
  const decoded = Buffer.from(encoded, 'base64').toString()
  const [, pass] = decoded.split(':')

  if (pass !== password) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Password Protected"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}

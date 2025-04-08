import httpAuth from 'http-auth'
import { NextResponse } from 'next/server'

const basic = httpAuth.basic(
  {
    realm: 'Restricted',
  },
  (password, callback) => {
    const expectedPassword = process.env.AUTH_PASSWORD

    // Validate the password
    callback(password === expectedPassword)
  },
)

export function middleware(req) {
  const { authorization } = req.headers

  if (!authorization || !basic.check(req)) {
    return new Response('Unauthorized', { status: 401 })
  }

  return NextResponse.next()
}

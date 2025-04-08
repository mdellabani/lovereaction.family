'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PasswordProtection = ({
  setAuthenticated,
}: {
  setAuthenticated: (arg0: boolean) => void
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedPassword = localStorage.getItem('authenticated')
    if (storedPassword === 'true') {
      setIsAuthenticated(true)
      setAuthenticated(true)
      return
    }

    const password = process.env.NEXT_PUBLIC_PASSWORD
    console.log('zzzp', password)
    const userPassword = prompt('Enter password:')

    if (userPassword === password) {
      localStorage.setItem('authenticated', 'true')
      setIsAuthenticated(true)
      setAuthenticated(true)
    } else {
      alert('Incorrect password!')
      router.push('/')
    }
  }, [router, setAuthenticated])

  if (!isAuthenticated) {
    return <div>Loading...</div> // Or a loading spinner, or nothing at all
  }

  return null
}

export default PasswordProtection

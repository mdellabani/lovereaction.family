'use client'
import { Navbar, NavbarContent, NavbarItem, NavbarMenu } from '@heroui/navbar'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Switch from './Switch'

const Header = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const imageSrc = isDark ? '/logo-w.png' : '/logo-b.png'

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex items-center justify-between p-4">
      <Navbar
        className="flex h-[80px] min-h-[80px] items-center justify-center"
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <button className="sm:hidden">☰</button>
          <Link href="/">
            <Image alt="Logo" height={100} src={imageSrc} width={100} />
          </Link>
        </NavbarContent>

        <NavbarContent className="hidden justify-center sm:flex">
          {sections.map((section) => (
            <NavbarItem key={section.route}>
              <Link
                className="text-2xl text-black hover:text-gray-500 dark:text-white"
                href={section.route}
              >
                {section.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarMenu>
          {sections.map((section) => (
            <NavbarItem key={section.route}>
              <Link
                className="text-lg text-black hover:text-gray-500 dark:text-white"
                href={section.route}
              >
                {section.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarMenu>
        <NavbarContent className="center justify-end">
          <NavbarItem key={'theme'}>
            <Switch />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  )
}

interface NavSection {
  name: string
  route: string
}

const sections: NavSection[] = [
  { name: 'Label', route: '/label' },
  { name: 'Podcasts', route: '/podcasts' },
  { name: 'Events', route: '/events' },
  { name: 'Artists', route: '/artists' },
  { name: 'Shops', route: '/shop' },
]

export default Header

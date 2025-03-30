'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from '@heroui/navbar'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const imageSrc = isDark ? '/logo-w.png' : '/logo-b.png'

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex items-center justify-between p-4">
      <Navbar
        className="flex items-center justify-center gap-6"
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={'☰'} />
        </NavbarContent>
        <NavbarContent className="pr-3 sm:hidden" justify="center">
          <NavbarBrand>
            <Link href="/">
              <Image alt="Logo" height={100} src={imageSrc} width={100} />
            </Link>{' '}
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="pr-3 sm:flex" gap-4 justify="center">
          <NavbarBrand>
            <Link href="/">
              <Image alt="Logo" height={100} src={imageSrc} width={100} />
            </Link>{' '}
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-6 sm:flex">
          {sections.map((section) => (
            <NavbarItem key={section.route}>
              <Link
                className="text-black hover:text-gray-500 dark:text-white"
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
                className="text-black hover:text-gray-500 dark:text-white"
                href={section.route}
              >
                {section.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <button
        className="rounded-md bg-gray-200 p-2 dark:bg-gray-800"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
      </button>
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

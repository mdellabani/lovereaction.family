'use client'

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const imageSrc = isDark ? '/logo-w.png' : '/logo-b.png'

  return (
    <Navbar maxWidth="sm" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image alt="Logo" height={100} src={imageSrc} width={100} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {sections.map((section) => (
          <NavbarItem key={section.route}>
            <Link color="foreground" href={section.route}>
              {section.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {sections.map((section) => (
          <NavbarMenuItem key={section.route}>
            <Link
              className="w-full"
              color="foreground"
              href={section.route}
              size="lg"
            >
              {section.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <button
        className="rounded-md bg-gray-200 p-2 dark:bg-gray-800"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
      </button>
    </Navbar>
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

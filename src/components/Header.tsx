'use client'
import { Navbar, NavbarContent, NavbarItem, NavbarMenu } from '@heroui/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ThemeSwitch from './Switch'

const Header = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const imageSrc = isDark ? '/logo-w.png' : '/logo-b.png'

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-center border-b border-gray-300  bg-white dark:border-gray-700 dark:bg-black">
      <Navbar
        className="flex max-w-[600px] items-center justify-center"
        isBordered={false}
        isMenuOpen={isMenuOpen}
        position="sticky"
        shouldHideOnScroll={false}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden">
          <button>☰</button>
          <Link href="/">
            <Image alt="Logo" height={100} src={imageSrc} width={100} />
          </Link>
        </NavbarContent>

        <NavbarContent className="hidden justify-center sm:flex">
          <Link href="/">
            <Image alt="Logo" height={100} src={imageSrc} width={100} />
          </Link>
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
      </Navbar>
      <ThemeSwitch />
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

'use client'
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from '@heroui/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const imageSrc = isDark ? '/logo-w.png' : '/logo-b.png'

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile: HeroUI Navbar with hamburger menu */}
      <div className="w-full sm:hidden">
        <Navbar
          className="!min-h-0"
          isBlurred={false}
          isBordered={false}
          isMenuOpen={isMenuOpen}
          maxWidth="full"
          position="static"
          shouldHideOnScroll={false}
          style={{ backgroundColor: 'transparent', height: '64px' }}
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            />
          </NavbarContent>

          <NavbarMenu>
            <NavbarItem>
              <Link
                className="text-sm uppercase tracking-wide text-black hover:text-gray-500 dark:text-white"
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </NavbarItem>
            {sections.map((section) => (
              <NavbarItem key={section.route}>
                <Link
                  className="text-sm uppercase tracking-wide text-black hover:text-gray-500 dark:text-white"
                  href={section.route}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.name}
                </Link>
              </NavbarItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>

      {/* Desktop: logo + nav + logo in a subtle bar */}
      <nav className="hidden h-full items-center gap-5 px-6 sm:flex">
        <Link className="shrink-0" href="/">
          <Image
            alt="Logo"
            height={36}
            quality={100}
            src={imageSrc}
            width={36}
          />
        </Link>
        {sections.map((section) => (
          <Link
            className="whitespace-nowrap text-sm font-medium uppercase tracking-wide text-black/80 transition-colors hover:text-black dark:text-white/80 dark:hover:text-white"
            href={section.route}
            key={section.route}
          >
            {section.name}
          </Link>
        ))}
      </nav>
    </>
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

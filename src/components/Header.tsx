'use client'
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
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
          style={{ backgroundColor: 'transparent', height: '40px' }}
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

      {/* Desktop: centered nav tabs with logo */}
      <nav className="hidden items-center justify-center gap-6 py-2 sm:flex">
        <Link className="shrink-0" href="/">
          <Image
            alt="Logo"
            height={28}
            quality={100}
            src="/logo-b.png"
            width={28}
          />
        </Link>
        <Link
          className="whitespace-nowrap text-sm font-medium uppercase tracking-wide text-black/80 transition-colors hover:text-black dark:text-white/80 dark:hover:text-white"
          href="/"
        >
          Home
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

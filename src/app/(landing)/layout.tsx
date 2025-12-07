'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'O nas', href: '#o-nas' },
  { label: 'Trenerzy', href: '#trenerzy' },
  { label: 'Harmonogram', href: '#harmonogram' },
]

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="dark bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 cursor-pointer">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                  <Image
                    src="/bonzai-logo.png"
                    alt="Bonzai MMA"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="font-bold text-lg sm:text-xl tracking-tight">BONZAI MMA</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-zinc-300 hover:text-white hover:bg-zinc-800"
                  >
                    Zaloguj się
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
                    Dołącz teraz
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  className="p-2 text-zinc-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-zinc-800">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-zinc-300 hover:text-white hover:bg-zinc-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Zaloguj się
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        className="w-full bg-white text-black hover:bg-zinc-200 font-semibold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dołącz teraz
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </header>
        <main className="pt-16 sm:pt-20">{children}</main>
    </div>
  )
}

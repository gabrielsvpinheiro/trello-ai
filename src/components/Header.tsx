'use client'

import Link from 'next/link'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="bg-gray-900 shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center mt-4 mb-4">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-light text-gray-50">
              <Logo />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 
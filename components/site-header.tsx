"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="w-full pt-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <Link href="/" className="group">
            <h1 className="text-2xl font-semibold text-gray-900">
              Ceritakan
              <div className="h-1 w-full bg-[#3366FF] scale-x-100 group-hover:scale-x-0 transition-transform rounded-full" />
            </h1>
          </Link>
          <nav className="flex items-center gap-12">
            <Link
              href="/public"
              className={`text-lg transition-colors ${
                pathname === '/public'
                  ? 'text-[#3366FF] font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              public
            </Link>
            <Link
              href="/"
              className={`text-lg transition-colors ${
                pathname === '/'
                  ? 'text-[#3366FF] font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              write
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}


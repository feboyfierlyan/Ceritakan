"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function AnimatedPrompt() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const isPublicPage = pathname === '/public'

  return (
    <h2 
      className={`text-3xl font-normal text-center transition-all duration-1000 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: isPublicPage ? 'translateY(0) scale(0.9)' : 'translateY(0) scale(1)',
        transition: 'transform 0.5s ease-in-out, opacity 1s ease-in-out',
        marginBottom: isPublicPage ? '2rem' : '0',
      }}
    >
      Apa yang membuatmu <span className="font-bold">bahagia</span> hari ini?
    </h2>
  )
}


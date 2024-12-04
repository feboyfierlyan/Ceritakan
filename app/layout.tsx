import { inter } from './fonts'
import "@/styles/globals.css"


export const metadata = {
  title: "Ceritakan",
  description: "Share your daily moments",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


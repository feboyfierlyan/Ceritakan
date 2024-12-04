import { SiteHeader } from "@/components/site-header"
import { PublicFeed } from "@/components/public-feed"

export default function PublicPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-hidden">
        <div className="max-w-2xl mx-auto relative">
          <PublicFeed />
        </div>
      </main>
    </div>
  )
}


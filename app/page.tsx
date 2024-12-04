import { SiteHeader } from "@/components/site-header"
import { PromptInput } from "@/components/prompt-input"
import { AnimatedPrompt } from "@/components/animated-prompt"

export default function WritePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center space-y-12">
            <AnimatedPrompt />
            <PromptInput />
          </div>
        </div>
      </main>
    </div>
  )
}


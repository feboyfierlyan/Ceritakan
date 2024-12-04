"use client"

import { Message } from "@/components/message"
import { AnimatedPrompt } from "@/components/animated-prompt"
import { useEffect, useState } from "react"

interface MessageType {
  id: number
  content: string
  image?: string
  timestamp: string
}

export function PublicFeed() {
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]')
    setMessages(storedMessages)
  }, [])

  return (
    <div className="space-y-6 pt-16 relative">
      <div className="sticky top-0 bg-white pb-4 z-10">
        <AnimatedPrompt />
      </div>
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-4 -mr-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            image={message.image}
            timestamp={new Date(message.timestamp).toLocaleString()}
          />
        ))}
      </div>
    </div>
  )
}


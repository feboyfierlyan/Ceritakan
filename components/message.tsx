import Image from "next/image"
import { Avatar } from "@/components/ui/avatar"

interface MessageProps {
  content: string
  image?: string
  timestamp: string
}

export function Message({ content, image, timestamp }: MessageProps) {
  return (
    <div className="flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-3 mb-4">
      <Avatar className="w-8 h-8 bg-gray-200" />
      <div className="flex flex-col gap-2">
        <div className="bg-gray-900 text-white rounded-2xl rounded-tl-none px-4 py-2 max-w-md">
          <p className="text-sm">{content}</p>
        </div>
        {image && (
          <div className="relative overflow-hidden rounded-2xl max-w-md">
            <Image
              src={image}
              alt="Attached image"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        )}
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
    </div>
  )
}


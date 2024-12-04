"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const placeholders = [
  "Type your response...",
  "bahagia?",
  "sedih?",
  "marah?",
  "gapapa cerita aja :)"
]

export function PromptInput() {
  const [response, setResponse] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [currentPlaceholder, setCurrentPlaceholder] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (response) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setCurrentPlaceholder(placeholders[placeholderIndex].slice(0, currentIndex))
      
      if (currentIndex === placeholders[placeholderIndex].length) {
        clearInterval(interval)
        setTimeout(() => {
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length)
        }, 2000)
      } else {
        currentIndex++
      }
    }, 100)

    return () => clearInterval(interval)
  }, [placeholderIndex, response])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!response.trim() && !image) return

    setIsSubmitting(true)
    
    // Convert image to base64 if present
    let imageData = null
    if (image) {
      const reader = new FileReader()
      imageData = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(image)
      })
    }

    // Save the message to localStorage
    const newMessage = {
      id: Date.now(),
      content: response,
      image: imageData,
      timestamp: new Date().toISOString()
    }
    const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]')
    localStorage.setItem('messages', JSON.stringify([newMessage, ...existingMessages]))
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setResponse("")
    setImage(null)
    setImagePreview(null)
    router.push('/public')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4 flex flex-col items-center">
      <div className="relative w-full">
        <div className="relative flex items-center w-full bg-[#F3F3F3] rounded-[30px] shadow-sm">
          <ChevronRight className="h-5 w-5 text-gray-400 absolute left-4" />
          <input
            type="text"
            placeholder={currentPlaceholder}
            className="w-full bg-transparent py-4 pl-12 pr-12 text-sm focus:outline-none rounded-[30px]"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-5 w-5" />
            <span className="sr-only">Attach image</span>
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
      {imagePreview && (
        <div className="relative w-full">
          <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
          <button
            type="button"
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            onClick={() => {
              setImage(null)
              setImagePreview(null)
            }}
          >
            &times;
          </button>
        </div>
      )}
      <Button 
        type="submit" 
        disabled={isSubmitting || (!response.trim() && !image)}
        className="bg-[#3366FF] hover:bg-[#2952CC] px-10 py-2 text-sm font-medium rounded-[30px] h-auto transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Mengirim..." : "Kirim"}
      </Button>
    </form>
  )
}


"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function GallerySection() {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  const images = [
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Xăm môi trước và sau 1",
      category: "Trước và sau",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Xăm môi trước và sau 2",
      category: "Trước và sau",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Xăm môi collagen 1",
      category: "Xăm môi collagen",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Xăm môi collagen 2",
      category: "Xăm môi collagen",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Xăm môi pha lê 1",
      category: "Xăm môi pha lê",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Xăm môi pha lê 2",
      category: "Xăm môi pha lê",
    },
  ]

  const categories = ["Tất cả", "Trước và sau", "Xăm môi collagen", "Xăm môi pha lê"]
  const [activeCategory, setActiveCategory] = useState("Tất cả")

  const filteredImages =
    activeCategory === "Tất cả" ? images : images.filter((image) => image.category === activeCategory)

  const openImage = (src: string) => {
    setSelectedImage(src)
    setOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === category ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg cursor-pointer" onClick={() => openImage(image.src)}>
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <img src={selectedImage || "/placeholder.svg"} alt="Enlarged view" className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    </div>
  )
}


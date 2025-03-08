"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const images = [
    {
      src: "/afterbf-moi-1.png",
      alt: "Xăm môi trước và sau 1",
      category: "Trước và sau",
    },
    {
      src: "/afterbf-moi-2.png",
      alt: "Xăm môi trước và sau 2",
      category: "Trước và sau",
    },
    {
      src: "/afterbf-may-1.png",
      alt: "Phun xăm mày trước và sau 1",
      category: "Trước và sau",
    },
    {
      src: "/moi-1.jpg",
      alt: "Phun xăm môi 2",
      category: "Phun xăm môi",
    },
    {
      src: "/moi-2.jpg",
      alt: "Phun xăm môi 2",
      category: "Phun xăm môi",
    },
    {
      src: "/moi-3.jpg",
      alt: "Phun xăm môi 3",
      category: "Phun xăm môi",
    },
    {
      src: "/moi-4.jpg",
      alt: "Phun xăm môi 4",
      category: "Phun xăm môi",
    },
    {
      src: "/moi-5.jpg",
      alt: "Phun xăm môi 5",
      category: "Phun xăm môi",
    },
    {
      src: "/may-mi.jpg",
      alt: "Phun xăm mày 1",
      category: "Phun xăm mày",
    },
    {
      src: "/may-2.jpg",
      alt: "Phun xăm mày 2",
      category: "Phun xăm mày",
    },
    {
      src: "/mi-1.jpg",
      alt: "Phun xăm mí 1",
      category: "Phun xăm mí",
    },
    {
      src: "/mi-2.webp",
      alt: "Phun xăm mí 2",
      category: "Phun xăm mí",
    },
    {
      src: "/mi-3.jpg",
      alt: "Phun xăm mí 3",
      category: "Phun xăm mí",
    },
  ];

  const categories = [
    "Tất cả",
    "Trước và sau",
    "Phun xăm mày",
    "Phun xăm môi",
    "Phun xăm mí",
  ];
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredImages =
    activeCategory === "Tất cả"
      ? images
      : images.filter((image) => image.category === activeCategory);

  const openImage = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openImage(image.src)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform hover:scale-105"
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt="Enlarged view"
            className="w-full h-auto"
            width={500}
            height={500}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

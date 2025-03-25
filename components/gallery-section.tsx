"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageItem {
  src: string;
  alt: string;
  category: string;
  type: string;
}

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("images", images);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customer-images`
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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
      : images.filter((image) => {
          if (activeCategory === "Trước và sau") {
            return image.type === "before-after";
          }
          return image.category.toLowerCase() === activeCategory.toLowerCase();
        });

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
        {loading ? (
          <div className="col-span-full text-center py-10">Đang tải...</div>
        ) : (
          filteredImages.map((image, index) => (
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
          ))
        )}
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

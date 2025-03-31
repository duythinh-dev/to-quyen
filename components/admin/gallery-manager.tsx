"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/auth";

interface ImageItem {
  _id: string;
  src: string;
  alt: string;
  category: string;
  type?: string;
}

interface GalleryManagerProps {
  data: any; // Thay 'any' bằng kiểu dữ liệu thực tế của gallery
  onDataLoad: (data: any) => void;
}

const fetchGallery = async (): Promise<ImageItem[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customer-images`
  );
  return response.json();
};

export default function GalleryManager({
  data,
  onDataLoad,
}: GalleryManagerProps) {
  const [images, setImages] = useState<ImageItem[]>(data || []);
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Phun xăm môi");
  const [selectedType, setSelectedType] = useState("before-after");
  const [activeTab, setActiveTab] = useState("all");
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const categories = ["Phun xăm môi", "Phun xăm mày", "Phun xăm mí"];

  const navigationTabs = ["all", ...categories, "Trước và Sau"];
  console.log("data", data);
  const types = [
    { label: "Trước và sau", value: "before-after" },
    { label: "Kết quả", value: "result" },
  ];

  useEffect(() => {
    if (!data) {
      setIsLoading(true);
      fetchGallery()
        .then((fetchedImages) => {
          setImages(fetchedImages);
          onDataLoad(fetchedImages);
        })
        .catch((err) => {
          setError("Không thể tải danh sách hình ảnh");
          console.error("Error fetching images:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setImages(data);
    }
  }, [data, onDataLoad]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa hình ảnh này?")) return;

    try {
      const token = auth.getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer-images/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      setImages(images.filter((img) => img._id !== id));
      toast({
        title: "Success",
        description: "Đã xóa hình ảnh thành công",
        variant: "default",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Không thể xóa hình ảnh",
        variant: "destructive",
      });
    }
  };

  const handleEditImage = async (imageData: {
    category: string;
    type: string;
    file?: File;
  }) => {
    if (!editingImage) return;

    try {
      const token = auth.getToken();
      let imageUrl = editingImage.src;

      // Only upload new image if a file is selected
      if (imageData.file) {
        const formData = new FormData();
        formData.append("image", imageData.file);

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/services/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      // Update image information
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer-images/${editingImage._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            src: imageUrl,
            category: imageData.category,
            type: imageData.type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update image");
      }

      const updatedImages = images.map((img) =>
        img._id === editingImage._id ? { ...img, src: imageUrl } : img
      );
      setImages(updatedImages);
      onDataLoad(updatedImages);
      setIsEditDialogOpen(false);
      setEditingImage(null);
      toast({
        title: "Success",
        description: "Đã cập nhật hình ảnh thành công",
        variant: "default",
      });
    } catch (error) {
      console.error("Edit error:", error);
      toast({
        title: "Error",
        description: "Không thể cập nhật hình ảnh",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);

      // 1. Upload image to server
      const formData = new FormData();
      formData.append("image", selectedFile);

      const token = auth.getToken();

      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const { url } = await uploadResponse.json();

      // 2. Save image information
      const saveImageResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer-images`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            src: url,
            alt: selectedFile.name,
            category: selectedCategory,
            type: selectedType,
          }),
        }
      );

      if (!saveImageResponse.ok) {
        throw new Error("Failed to save image information");
      }

      const savedImage = await saveImageResponse.json();

      // Cập nhật state local và parent
      const updatedImages = [...images, savedImage];
      setImages(updatedImages);
      onDataLoad(updatedImages);

      // Reset form
      setSelectedFile(null);
      setSelectedCategory("Phun xăm môi");
      setSelectedType("before-after");

      toast({
        title: "Success",
        description: "Hình ảnh đã được tải lên thành công",
        variant: "default",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Có lỗi xảy ra khi tải lên hình ảnh",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const filteredImages = images.filter((img) => {
    if (activeTab === "all") return true;
    if (activeTab === "Trước và Sau") return img.type === "before-after";
    return img.category === activeTab;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="border-b border-gray-200">
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Quản lý Hình ảnh</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus size={16} />
              Thêm Hình ảnh
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Tải lên hình ảnh mới</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {selectedFile ? (
                  <div className="relative aspect-square w-full">
                    <Image
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center aspect-square flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-blue-500 hover:text-blue-600"
                    >
                      Chọn hình ảnh để tải lên
                    </label>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loại dịch vụ:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Loại hình ảnh:</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {types.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!selectedFile || isUploading}
                  className="w-full"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang tải lên...
                    </>
                  ) : (
                    "Tải lên"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {navigationTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-3 px-4 text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {tab === "all" ? "Tất cả" : tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image: ImageItem) => (
          <div
            key={image._id}
            className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-3">
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 bg-white/90 hover:bg-white"
                onClick={() => {
                  setEditingImage(image);
                  setSelectedCategory(image.category);
                  setSelectedType(image.type || "before-after");
                  setSelectedFile(null);
                  setIsEditDialogOpen(true);
                }}
              >
                <Pencil size={16} />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                className="h-9 w-9"
                onClick={() => handleDeleteImage(image._id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="text-gray-400 mb-2">
            {activeTab === "all" ? "📸" : "🔍"}
          </div>
          <p className="text-gray-600 text-lg font-medium">
            {activeTab === "all"
              ? "Chưa có hình ảnh nào. Hãy thêm hình ảnh mới!"
              : activeTab === "Trước và Sau"
              ? "Chưa có hình ảnh trước và sau"
              : `Chưa có hình ảnh nào trong danh mục ${activeTab}`}
          </p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa hình ảnh</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {selectedFile ? (
                <div className="relative aspect-square w-full">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : editingImage ? (
                <div className="relative aspect-square w-full">
                  <Image
                    src={editingImage.src}
                    alt={editingImage.alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="edit-image-upload"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="edit-image-upload"
                    className="absolute bottom-2 right-2 cursor-pointer"
                  >
                    <Button size="sm" variant="secondary">
                      <Pencil size={16} className="mr-2" />
                      Đổi hình
                    </Button>
                  </label>
                </div>
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Loại dịch vụ:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Loại hình ảnh:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={() =>
                  handleEditImage({
                    category: selectedCategory,
                    type: selectedType,
                    file: selectedFile || undefined,
                  })
                }
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

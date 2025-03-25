// components/ImageUploader.tsx
"use client";

import { useState } from "react";
import { uploadImage } from "@/utils/uploadImage";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

export default function ImageUploader({
  text,
  btnProps,
}: {
  text?: React.ReactNode;
  btnProps?: ButtonProps;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await uploadImage(file);
      console.log("Upload success:", result);
      // Xử lý kết quả upload ở đây (ví dụ: cập nhật URL ảnh trong state)
    } catch (error) {
      console.error("Upload failed:", error);
      // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi)
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button
          variant="outline"
          disabled={isUploading}
          className="cursor-pointer"
          asChild
          {...btnProps}
        >
          <span>{isUploading ? "Đang tải lên..." : text || "Chọn ảnh"}</span>
        </Button>
      </label>
    </div>
  );
}

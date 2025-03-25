"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import { auth } from "@/lib/auth";
import LoginForm from "./login-form";

interface Service {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  currentPrice: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface UploadResponse {
  url: string;
  public_id: string;
}

// Thay đổi từ hardcode URL thành sử dụng env variable
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/services`;

export default function ProductManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    currentPrice: "",
    image: "",
    category: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      basePrice: "",
      currentPrice: "",
      image: "",
      category: "",
    });
    setEditingService(null);
    setTempFile(null);
    setLocalPreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = auth.getToken();
      if (!token) throw new Error("Chưa đăng nhập");

      let imageUrl = formData.image;

      if (tempFile) {
        imageUrl = await uploadImage(tempFile);
      }

      const serviceData = {
        ...formData,
        image: imageUrl,
        basePrice: parseFloat(formData.basePrice),
        currentPrice: parseFloat(formData.currentPrice),
      };

      const url = editingService ? `${API_URL}/${editingService._id}` : API_URL;
      const method = editingService ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi lưu dịch vụ");
      }

      const result = await response.json();

      if (editingService) {
        setServices(
          services.map((s) => (s._id === editingService._id ? result : s))
        );
        toast.success("Cập nhật dịch vụ thành công!");
      } else {
        setServices([...services, result]);
        toast.success("Thêm dịch vụ thành công!");
      }

      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + (error as Error).message);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      basePrice: service.basePrice.toString(),
      currentPrice: service.currentPrice.toString(),
      image: service.image,
      category: service.category,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) return;

    try {
      const token = auth.getToken();
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Lỗi khi xóa dịch vụ");
      }

      setServices(services.filter((s) => s._id !== id));
      toast.success("Xóa dịch vụ thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + (error as Error).message);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = auth.getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Lỗi khi upload hình ảnh");
      const data: UploadResponse = await response.json();
      return data.url;
    } catch (error) {
      throw new Error("Lỗi upload hình ảnh: " + (error as Error).message);
    }
  };

  useEffect(() => {
    const token = auth.getToken();
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const token = auth.getToken();
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Lỗi khi tải dịch vụ");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        toast.error("Có lỗi khi tải dịch vụ");
      }
    };

    if (isAuthenticated) {
      loadServices();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý Dịch vụ</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setIsOpen(true);
              }}
            >
              Thêm Dịch vụ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Sửa dịch vụ" : "Thêm dịch vụ mới"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên dịch vụ</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="basePrice">Giá cơ bản</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, basePrice: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPrice">Giá hiện tại</Label>
                <Input
                  id="currentPrice"
                  type="number"
                  value={formData.currentPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, currentPrice: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Hình ảnh</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setTempFile(null);
                        setLocalPreview("");
                      }}
                      placeholder="Nhập URL hình ảnh..."
                      className="flex-1"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const file = e.target.files[0];
                            setTempFile(file);
                            const previewUrl = URL.createObjectURL(file);
                            setLocalPreview(previewUrl);
                            setFormData({ ...formData, image: "" });
                          }
                        }}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        className="whitespace-nowrap"
                      >
                        Chọn hình
                      </Button>
                    </div>
                  </div>
                  {(formData.image || localPreview) && (
                    <div className="relative h-40 w-full rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={localPreview || formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {editingService ? "Cập nhật" : "Thêm"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{service.name}</span>
                <span className="text-green-600 font-medium">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(service.currentPrice)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <p className="text-sm text-gray-600">{service.description}</p>
              <div className="text-sm text-gray-500">
                Danh mục: {service.category}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(service)}
              >
                Sửa
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(service._id)}
              >
                Xóa
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

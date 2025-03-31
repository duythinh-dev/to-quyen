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

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  isDiscounted: boolean;
  discountedPrice: number;
}

interface UploadResponse {
  url: string;
  public_id: string;
}

// Thay đổi từ hardcode URL thành sử dụng env variable
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/services`;

interface ProductManagerProps {
  data: any; // Thay 'any' bằng kiểu dữ liệu thực tế của products
  onDataLoad: (data: any) => void;
}

const fetchProducts = async (): Promise<Service[]> => {
  const token = auth.getToken();
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export default function ProductManager({
  data,
  onDataLoad,
}: ProductManagerProps) {
  const [services, setServices] = useState<Service[]>(data || []);
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
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
        price: parseFloat(formData.price),
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
      price: service.price.toString(),
      image: service.image,
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
    if (!data) {
      setIsLoading(true);
      fetchProducts()
        .then((fetchedProducts) => {
          setServices(fetchedProducts);
          onDataLoad(fetchedProducts); // Lưu vào state của parent
        })
        .catch((err) => {
          setError("Không thể tải dữ liệu sản phẩm");
          console.error("Error fetching products:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setServices(data); // Sử dụng data từ props nếu có
    }
  }, [data, onDataLoad]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Quản lý Dịch vụ</h2>
          <div className="w-32 h-10 bg-gray-200 animate-pulse rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 bg-gray-200 rounded-md w-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <div className="w-16 h-8 bg-gray-200 rounded" />
                <div className="w-16 h-8 bg-gray-200 rounded" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center space-y-2">
          <div className="text-red-500 text-xl">{error}</div>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    );
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
                <Label htmlFor="price">Giá dịch vụ</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
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
                  }).format(
                    service.isDiscounted
                      ? service.discountedPrice
                      : service.price
                  )}
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

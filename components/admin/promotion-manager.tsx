"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { auth } from "@/lib/auth";
import { Promotion, Service, ServiceDiscount } from "@/types";
import Image from "next/image";
import { X, Plus } from "lucide-react";

interface PromotionManagerProps {
  data: Promotion[];
  onDataLoad: (data: Promotion[]) => void;
  productsData: Service[];
  onLoadServices: (data: Service[]) => void;
}

export default function PromotionManager({
  data: promotions,
  onDataLoad,
  productsData: services,
  onLoadServices,
}: PromotionManagerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<"all" | Promotion["status"]>(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: [""],
    startDate: "",
    endDate: "",
    serviceDiscounts: [] as ServiceDiscount[],
    promoCode: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const filteredPromotions = promotions
    .filter((promo) => filterStatus === "all" || promo.status === filterStatus)
    .filter(
      (promo) =>
        promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.promoCode?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const isLoadingInitial = isLoading && !isInitialized;

  const fetchPromotions = async () => {
    if (isInitialized) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/promotions`
      );
      if (!response.ok) throw new Error("Failed to fetch promotions");
      const data = await response.json();
      onDataLoad(data);
      setIsInitialized(true);
    } catch (error) {
      toast.error("Không thể tải danh sách khuyến mãi");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services`
      );
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      onLoadServices(data);
    } catch (error) {
      toast.error("Không thể tải danh sách dịch vụ");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsUploading(true);

    try {
      const token = auth.getToken();
      if (!token) throw new Error("Unauthorized");

      // Upload image first if there's a selected file
      let imageUrl = formData.image;
      if (selectedFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("image", selectedFile);

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/services/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataUpload,
          }
        );

        if (!uploadResponse.ok) throw new Error("Failed to upload image");
        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const transformedDiscounts = formData.serviceDiscounts.map(
        (discount) => ({
          serviceId: discount.serviceId,
          originalPrice: discount.originalPrice,
          discountedPrice: discount.discountedPrice,
        })
      );

      const promotionData = {
        title: formData.title,
        description: formData.description,
        details: formData.details.filter((detail) => detail.trim() !== ""),
        startDate: formData.startDate,
        endDate: formData.endDate,
        serviceDiscounts: transformedDiscounts,
        image: imageUrl, // Use the uploaded image URL or existing URL
        ...(formData.promoCode && { promoCode: formData.promoCode }),
      };

      let response;
      let updatedPromotion: Promotion;

      if (selectedPromotion) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/promotions/${selectedPromotion._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(promotionData),
          }
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/promotions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(promotionData),
          }
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.overlappingPromotion) {
          const overlapping = errorData.overlappingPromotion;
          const startDate = new Date(overlapping.startDate).toLocaleDateString(
            "vi-VN"
          );
          const endDate = new Date(overlapping.endDate).toLocaleDateString(
            "vi-VN"
          );
          throw new Error(
            `Đã có chương trình khuyến mãi "${overlapping.title}" trong khoảng thời gian từ ${startDate} đến ${endDate}`
          );
        }
        throw new Error("Failed to save promotion");
      }

      updatedPromotion = await response.json();

      onDataLoad(
        selectedPromotion
          ? promotions.map((p) =>
              p._id === selectedPromotion._id ? updatedPromotion : p
            )
          : [...promotions, updatedPromotion]
      );

      toast.success(
        selectedPromotion
          ? "Cập nhật khuyến mãi thành công"
          : "Tạo khuyến mãi mới thành công"
      );

      setIsFormOpen(false);
      resetForm();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Không thể lưu khuyến mãi"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      details: [""],
      startDate: "",
      endDate: "",
      serviceDiscounts: [],
      promoCode: "",
      image: "",
    });
    setSelectedPromotion(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa khuyến mãi này?")) return;

    try {
      const token = auth.getToken();
      if (!token) throw new Error("Unauthorized");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/promotions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete promotion");

      onDataLoad(promotions.filter((p) => p._id !== id));
      toast.success("Xóa khuyến mãi thành công");
    } catch (error) {
      toast.error("Không thể xóa khuyến mãi");
      console.error(error);
    }
  };

  const handleEdit = async (promotion: Promotion) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/promotions/${promotion._id}`
      );
      if (!response.ok) throw new Error("Failed to fetch promotion details");

      // Format the dates to YYYY-MM-DD

      const promotionDetails = await response.json();

      const startDate = new Date(promotionDetails.startDate)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(promotionDetails.endDate)
        .toISOString()
        .split("T")[0];

      setSelectedPromotion(promotionDetails);
      setFormData({
        title: promotionDetails.title,
        description: promotionDetails.description,
        details:
          promotionDetails.details.length > 0 ? promotionDetails.details : [""],
        startDate: startDate,
        endDate: endDate,
        serviceDiscounts: promotionDetails.serviceDiscounts,
        promoCode: promotionDetails.promoCode || "",
        image: promotionDetails.image || "",
      });
      setIsFormOpen(true);
    } catch (error) {
      toast.error("Không thể tải thông tin khuyến mãi");
      console.error(error);
    }
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    setFormData({ ...formData, details: newDetails });
  };

  const addDetailRow = () => {
    setFormData({ ...formData, details: [...formData.details, ""] });
  };

  const removeDetailRow = (index: number) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: newDetails });
  };

  const handleServiceDiscountChange = (
    serviceId: string,
    discountedPrice: number
  ) => {
    const service = services.find((s) => s._id === serviceId);
    if (!service) return;

    setFormData((prev) => {
      const updatedDiscounts = [...prev.serviceDiscounts];
      const index = updatedDiscounts.findIndex(
        (d) => d.serviceId === serviceId
      );

      if (index >= 0) {
        updatedDiscounts[index] = {
          serviceId,
          originalPrice: service.price,
          discountedPrice,
        };
      } else {
        updatedDiscounts.push({
          serviceId,
          originalPrice: service.price,
          discountedPrice,
        });
      }

      return { ...prev, serviceDiscounts: updatedDiscounts };
    });
  };

  return (
    <div className="p-2 space-y-1 md:p-6 md:space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý Khuyến mãi</h2>
        <Button onClick={() => setIsFormOpen(true)}>Thêm Khuyến mãi</Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as "all" | Promotion["status"])
          }
          className="px-4 py-2 border rounded"
        >
          <option value="all">Tất cả</option>
          <option value="active">Đang chạy</option>
          <option value="upcoming">Sắp diễn ra</option>
          <option value="expired">Đã kết thúc</option>
        </select>
      </div>

      {isLoadingInitial ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredPromotions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Chưa có khuyến mãi nào
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || filterStatus !== "all"
              ? "Không tìm thấy khuyến mãi nào phù hợp với bộ lọc"
              : "Hãy bắt đầu bằng việc thêm khuyến mãi đầu tiên của bạn"}
          </p>
          <Button onClick={() => setIsFormOpen(true)}>Thêm Khuyến mãi</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPromotions.map((promotion) => (
            <Card key={promotion._id}>
              <CardHeader>
                {promotion.image && (
                  <div className="relative aspect-video w-full mb-4">
                    <Image
                      src={promotion.image}
                      alt={promotion.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <CardTitle>{promotion.title}</CardTitle>
                  <div className="hidden md:flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(promotion)}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(promotion._id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>{promotion.description}</p>
                  {promotion.details.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Chi tiết:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {promotion.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-2">
                    <p className="font-medium">Giá khuyến mãi:</p>
                    <div className="space-y-1">
                      {promotion.serviceDiscounts.map((discount) => {
                        const service = services.find(
                          (s) => s._id === discount.serviceId
                        );
                        const discountPercent = (
                          ((discount.originalPrice - discount.discountedPrice) /
                            discount.originalPrice) *
                          100
                        ).toFixed(0);

                        return (
                          <div key={discount.serviceId} className="text-sm">
                            <span>{service?.name}: </span>
                            <span className="line-through text-gray-500">
                              {discount.originalPrice.toLocaleString()}đ
                            </span>
                            <span className="mx-2">→</span>
                            <span className="font-medium">
                              {discount.discountedPrice.toLocaleString()}đ
                            </span>
                            <span className="text-green-600 ml-2">
                              (-{discountPercent}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>
                      Thời gian:{" "}
                      {new Date(promotion.startDate).toLocaleDateString()} -{" "}
                      {new Date(promotion.endDate).toLocaleDateString()}
                    </p>
                    {promotion.promoCode && <p>Mã: {promotion.promoCode}</p>}
                    <p>
                      Trạng thái:{" "}
                      {promotion.status === "active"
                        ? "Đang chạy"
                        : promotion.status === "upcoming"
                        ? "Sắp diễn ra"
                        : "Đã kết thúc"}
                    </p>
                  </div>
                  <div className="flex md:hidden gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(promotion)}
                      className="flex-1"
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(promotion._id)}
                      className="flex-1"
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={isFormOpen}
        onOpenChange={(open) => {
          if (!open) resetForm();
          setIsFormOpen(open);
        }}
      >
        <DialogContent className="max-w-5xl h-screen md:h-auto md:max-h-[90vh] flex flex-col overflow-hidden p-0 md:p-6 gap-0">
          <DialogHeader className="p-4 md:p-0 md:pb-4 border-b flex-shrink-0">
            <DialogTitle className="text-2xl">
              {selectedPromotion
                ? "Chỉnh sửa khuyến mãi"
                : "Thêm khuyến mãi mới"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-4 md:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 py-6">
                {/* Left column - Image */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <Label className="text-base md:text-lg font-semibold mb-4">
                      Hình ảnh khuyến mãi
                    </Label>
                    <div className="mt-2 border-2 border-dashed rounded-xl bg-gray-50/50">
                      {selectedFile || formData.image ? (
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={
                              selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : formData.image
                            }
                            alt="Preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="secondary"
                            className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white shadow-md"
                            onClick={() => {
                              setSelectedFile(null);
                              setFormData({ ...formData, image: "" });
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gray-50/50 rounded-lg">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="promotion-image"
                            onChange={handleImageUpload}
                          />
                          <label
                            htmlFor="promotion-image"
                            className="cursor-pointer text-center p-8"
                          >
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                              <Plus size={24} className="text-blue-500" />
                            </div>
                            <p className="text-sm font-medium text-blue-500">
                              Chọn hình ảnh
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG (Khuyến nghị: 900x900px)
                            </p>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 bg-gray-50/50 p-3 md:p-4 rounded-lg">
                    <h3 className="font-medium">Thời gian khuyến mãi</h3>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Ngày bắt đầu</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: e.target.value,
                            })
                          }
                          required
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">Ngày kết thúc</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          min={formData.startDate}
                          required
                          className="bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column - Form fields */}
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className="text-base md:text-lg font-semibold"
                      >
                        Thông tin khuyến mãi
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Nhập tiêu đề khuyến mãi"
                        required
                        className="text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Nhập mô tả ngắn về chương trình"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Chi tiết khuyến mãi</Label>
                      <div className="space-y-3 bg-gray-50/50 p-3 md:p-4 rounded-lg">
                        {formData.details.map((detail, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={detail}
                              onChange={(e) =>
                                handleDetailChange(index, e.target.value)
                              }
                              placeholder="Nhập chi tiết khuyến mãi..."
                              className="bg-white"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeDetailRow(index)}
                              disabled={formData.details.length === 1}
                              className="shrink-0"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addDetailRow}
                          className="w-full"
                        >
                          <Plus size={16} className="mr-2" />
                          Thêm chi tiết
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Giá dịch vụ khuyến mãi</Label>
                      <div className="space-y-3 bg-gray-50/50 p-3 md:p-4 rounded-lg">
                        {services.map((service) => {
                          const discount = formData.serviceDiscounts.find(
                            (d) => d.serviceId === service._id
                          );
                          console.log("discountedPrice", discount);

                          return (
                            <div
                              key={service._id}
                              className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 items-center bg-white p-3 rounded-md shadow-sm"
                            >
                              <div>
                                <Label className="font-medium">
                                  {service.name}
                                </Label>
                                <div className="text-sm text-gray-500">
                                  Giá gốc:{" "}
                                  {service.price?.toLocaleString() || 0}đ
                                </div>
                              </div>
                              <div>
                                <Input
                                  type="text"
                                  value={
                                    service?.discountedPrice
                                      ? service.discountedPrice.toLocaleString()
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const value = Number(
                                      e.target.value.replace(/\D/g, "")
                                    );
                                    if (value > service.price) {
                                      toast.error(
                                        "Giá khuyến mãi không thể cao hơn giá gốc"
                                      );
                                      return;
                                    }
                                    handleServiceDiscountChange(
                                      service._id,
                                      value
                                    );
                                  }}
                                  placeholder="Nhập giá khuyến mãi"
                                  className="text-right"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="promoCode">
                        Mã khuyến mãi (không bắt buộc)
                      </Label>
                      <Input
                        id="promoCode"
                        value={formData.promoCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            promoCode: e.target.value,
                          })
                        }
                        placeholder="Nhập mã khuyến mãi nếu có"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 p-4 md:pt-4 border-t mt-auto flex-shrink-0 bg-white">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                disabled={isLoading}
                className="flex-1 md:flex-none"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 md:flex-none md:min-w-[120px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {selectedPromotion ? "Đang cập nhật..." : "Đang tạo..."}
                  </div>
                ) : selectedPromotion ? (
                  "Cập nhật"
                ) : (
                  "Thêm mới"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import ProductManager from "@/components/admin/product-manager";
import PromotionManager from "@/components/admin/promotion-manager";
import GalleryManager from "@/components/admin/gallery-manager";
import AdminLoginForm from "@/components/admin/login-form";
import clsx from "clsx";
import ImageUploader from "@/components/ImageUploader";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container max-w-md mx-auto mt-20">
        <AdminLoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Tabs defaultValue="products" className="flex w-full">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b md:hidden">
          <div className="flex items-center justify-between px-4 h-16">
            <h1 className="text-lg font-semibold">Trang Quản trị</h1>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`
            absolute top-full left-0 right-0 bg-white shadow-lg 
            transition-all duration-200 ease-in-out
            ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
          >
            <TabsList className="flex flex-col w-full h-fit">
              <TabsTrigger
                value="products"
                className="w-full justify-start px-6 py-3 text-left hover:bg-gray-50"
                onClick={() => setSidebarOpen(false)}
              >
                Quản lý Sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value="promotions"
                className="w-full justify-start px-6 py-3 text-left hover:bg-gray-50"
                onClick={() => setSidebarOpen(false)}
              >
                Quản lý Khuyến mãi
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="w-full justify-start px-6 py-3 text-left hover:bg-gray-50"
                onClick={() => setSidebarOpen(false)}
              >
                Quản lý Hình ảnh
              </TabsTrigger>
              <div className="p-3 border-t">
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="w-full"
                >
                  Về trang chủ
                </Button>
              </div>
            </TabsList>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 bg-white border-r flex-col">
          <div className="p-6 border-b">
            <h1 className="text-xl font-semibold">Trang Quản trị</h1>
          </div>

          <div className="flex-1 py-6">
            <TabsList className="flex flex-col h-fit">
              <TabsTrigger
                value="products"
                className="w-full justify-start px-6 py-3 text-left mb-1 hover:bg-gray-50"
              >
                Quản lý Sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value="promotions"
                className="w-full justify-start px-6 py-3 text-left mb-1 hover:bg-gray-50"
              >
                Quản lý Khuyến mãi
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="w-full justify-start px-6 py-3 text-left mb-1 hover:bg-gray-50"
              >
                Quản lý Hình ảnh
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 border-t">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Về trang chủ
            </Button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto md:p-8 p-4 md:ml-0 mt-16 md:mt-0 bg-gray-50">
          <TabsContent value="products">
            <ProductManager />
          </TabsContent>

          <TabsContent value="promotions">
            <PromotionManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

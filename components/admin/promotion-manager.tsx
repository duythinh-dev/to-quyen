"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PromotionManager() {
  const [promotions, setPromotions] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý Khuyến mãi</h2>
        <Button>Thêm Khuyến mãi</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Danh sách khuyến mãi sẽ được hiển thị ở đây */}
      </div>
    </div>
  );
}

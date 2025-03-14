"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Có thể thêm logic xử lý ở đây
    router.push("/");
  }, [router]);

  return null; // hoặc return một loading component
}

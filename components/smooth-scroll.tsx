"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Lấy tất cả các liên kết nội bộ có href bắt đầu bằng #
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");

      if (!href || href === "#") return;

      e.preventDefault();

      const element = document.querySelector(href);
      if (!element) return;

      // Tính toán vị trí cuộn, trừ đi chiều cao của header (64px)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    };

    // Thêm event listener cho mỗi liên kết
    internalLinks.forEach((link) => {
      link.addEventListener("click", handleLinkClick as EventListener);
    });

    // Cleanup khi component unmount
    return () => {
      internalLinks.forEach((link) => {
        link.removeEventListener("click", handleLinkClick as EventListener);
      });
    };
  }, []);

  return null;
}

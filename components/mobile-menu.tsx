"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-md border-t shadow-lg"
          >
            <div className="bg-white">
              <div className="container py-6 flex flex-col h-full">
                <nav className="flex flex-col gap-4 text-center">
                  <Link
                    href="#services"
                    className="text-lg font-medium py-4 hover:text-primary border-b border-border"
                    onClick={handleLinkClick}
                  >
                    Dịch vụ
                  </Link>
                  <Link
                    href="#about"
                    className="text-lg font-medium py-4 hover:text-primary border-b border-border"
                    onClick={handleLinkClick}
                  >
                    Giới thiệu
                  </Link>
                  <Link
                    href="#gallery"
                    className="text-lg font-medium py-4 hover:text-primary border-b border-border"
                    onClick={handleLinkClick}
                  >
                    Hình ảnh
                  </Link>
                  <Link
                    href="#testimonials"
                    className="text-lg font-medium py-4 hover:text-primary border-b border-border"
                    onClick={handleLinkClick}
                  >
                    Đánh giá
                  </Link>
                  <Link
                    href="#contact"
                    className="text-lg font-medium py-4 hover:text-primary border-b border-border"
                    onClick={handleLinkClick}
                  >
                    Liên hệ
                  </Link>
                </nav>
                <div className="mt-6">
                  <Button asChild className="w-full" size="lg">
                    <Link href="#contact" onClick={handleLinkClick}>
                      Đặt lịch ngay
                    </Link>
                  </Button>
                </div>
                <div className="mt-auto pt-6 text-center text-sm text-muted-foreground">
                  <p>© 2024 BeautyLips</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

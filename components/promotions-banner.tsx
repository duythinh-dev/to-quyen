"use client";

import { FadeIn } from "@/components/animations/scroll-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Promotion } from "@/types";

export default function PromotionsBanner() {
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const fetchPrm = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/promotions/active`,
          {
            method: "GET",
          }
        );
        const promotionDetails = await response.json();
        //   {
        //     "_id": "67e60e7574aac3b8c83a7138",
        //     "title": "Happy Weekend - Ưu đãi cuối tuần",
        //     "description": "Để cuối tuần của bạn thêm trọn vẹn, chúng tôi mang đến ưu đãi đặc biệt giảm đến 30% cho tất cả các dịch vụ vào Thứ 7 và Chủ nhật.",
        //     "details": [
        //         "Áp dụng cho tất cả khách hàng vào T7-CN",
        //         "Không áp dụng cùng các chương trình khuyến mãi khác",
        //         "Cần đặt lịch trước để đảm bảo slot"
        //     ],
        //     "startDate": "2025-03-28T00:00:00.000Z",
        //     "endDate": "2025-04-28T00:00:00.000Z",
        //     "serviceDiscounts": [
        //         {
        //             "serviceId": "67e60adb74aac3b8c83a70a0",
        //             "originalPrice": 1500000,
        //             "discountedPrice": 999000,
        //             "_id": "67e6120e74aac3b8c83a71ba"
        //         },
        //         {
        //             "serviceId": "67e60b0674aac3b8c83a70a4",
        //             "originalPrice": 700000,
        //             "discountedPrice": 499000,
        //             "_id": "67e6120e74aac3b8c83a71bb"
        //         },
        //         {
        //             "serviceId": "67e60b2674aac3b8c83a70a8",
        //             "originalPrice": 300000,
        //             "discountedPrice": 199000,
        //             "_id": "67e6120e74aac3b8c83a71bc"
        //         }
        //     ],
        //     "status": "active",
        //     "isApplied": false,
        //     "createdAt": "2025-03-28T02:50:29.569Z",
        //     "updatedAt": "2025-03-28T03:05:50.168Z",
        //     "displayDiscountPercent": 34,
        //     "__v": 0
        // }
        setPromotion(promotionDetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrm();
  }, []);

  // Get promotion active
  if (!promotion) return null;

  return (
    <section id="promotions" className="py-12 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative">
        <div className="bg-background/80 backdrop-blur-md rounded-2xl p-8 border-2 border-primary/20 shadow-lg relative overflow-hidden">
          {/* Decorative corner flowers */}
          <div className="absolute top-0 left-0 w-24 h-24 opacity-20">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z"
                fill="currentColor"
                className="text-primary"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z"
                fill="currentColor"
                className="text-primary"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <FadeIn direction="left">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  <span>Ưu đãi đặc biệt</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {promotion.title}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {promotion.description}
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <div className="space-y-4">
                  {promotion.details.map((detail, index) => (
                    <div className="flex items-start gap-3" key={index}>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                        <Gift className="h-3 w-3 text-primary" />
                      </div>
                      <p>{detail}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    size="lg"
                    asChild
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Link href="#contact">Đặt lịch ngay</Link>
                  </Button>
                  <div className="bg-background/80 backdrop-blur px-4 py-2 rounded-lg border border-primary/20 text-sm">
                    Chương trình kéo dài từ{" "}
                    <span className="font-bold">
                      {new Date(promotion.startDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>{" "}
                    đến{" "}
                    <span className="font-bold">
                      {new Date(promotion.endDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-background rounded-2xl overflow-hidden">
                  <img
                    src={promotion.image || "/promotion-8-3.png"}
                    alt={promotion.title}
                    className="w-full aspect-square object-cover"
                  />
                </div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-primary text-primary-foreground rounded-full h-24 w-24 flex items-center justify-center text-center font-bold shadow-lg"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div>
                    <div className="text-2xl">
                      {promotion.displayDiscountPercent}%
                    </div>
                    <div className="text-xs">Giảm</div>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

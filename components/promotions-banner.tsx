"use client";

import { FadeIn } from "@/components/animations/scroll-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

export default function PromotionsBanner() {
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
                  Chúc mừng ngày Quốc tế Phụ nữ
                  <span className="text-primary"> 08/03</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Nhân dịp 8/3, Tố Quyên Beauty dành tặng chị em những ưu đãi
                  đặc biệt để tôn vinh vẻ đẹp tự nhiên của người phụ nữ Việt.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                      <Gift className="h-3 w-3 text-primary" />
                    </div>
                    <p>
                      Giảm{" "}
                      <span className="font-bold text-primary">300.000đ</span>{" "}
                      dịch vụ{" "}
                      <span className="font-bold text-primary">
                        Phun xăm môi
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                      <Gift className="h-3 w-3 text-primary" />
                    </div>
                    <p>
                      Giảm{" "}
                      <span className="font-bold text-primary">300.000đ</span>{" "}
                      dịch vụ{" "}
                      <span className="font-bold text-primary">
                        Phun xăm chân mày
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                      <Gift className="h-3 w-3 text-primary" />
                    </div>
                    <p>
                      Giảm{" "}
                      <span className="font-bold text-primary">100.000đ</span>{" "}
                      dịch vụ{" "}
                      <span className="font-bold text-primary">
                        Phun xăm mí
                      </span>
                    </p>
                  </div>
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
                    <span className="font-bold">22/02</span> đến{" "}
                    <span className="font-bold">10/03/2025</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-background rounded-2xl overflow-hidden">
                  <img
                    src="/promotion-8-3.png"
                    alt="Chúc mừng ngày 8/3"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <p className="font-bold text-xl">
                      Tôn vinh vẻ đẹp phụ nữ Việt
                    </p>
                  </div>
                </div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-primary text-primary-foreground rounded-full h-24 w-24 flex items-center justify-center text-center font-bold shadow-lg"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div>
                    <div className="text-2xl">-30%</div>
                    <div className="text-xs">Chỉ 3 tuần</div>
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

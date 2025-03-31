"use client";

import ServiceCard from "./service-card";

import { StaggerItem } from "./animations/scroll-animation";

import { StaggerContainer } from "./animations/scroll-animation";

import { useState, useEffect } from "react";

import { FadeIn } from "./animations/scroll-animation";
import { Service } from "@/types";

export default function ServiceSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("services", services);

  useEffect(() => {
    const loadServices = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services`
      );
      const data = await response.json();
      setServices(data);
      setIsLoading(false);
    };
    loadServices();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Dịch vụ phun xăm của chúng tôi
            </h2>
            <p className="text-muted-foreground">
              Chúng tôi cung cấp các dịch vụ phun xăm chất lượng cao, cam kết
              không sưng, tỉ mỉ sử dụng công nghệ hiện đại và mực xăm an toàn.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeletons
              <>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card text-card-foreground shadow-sm"
                  >
                    <div className="aspect-[4/3] relative bg-muted animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                      <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              services.map((service) => (
                <StaggerItem key={service._id}>
                  <ServiceCard
                    title={service.name}
                    description={service.description}
                    price={formatPrice(service.discountedPrice)}
                    image={service.image}
                    originalPrice={formatPrice(service.price)}
                    isPromotion={service.isDiscounted}
                  />
                </StaggerItem>
              ))
            )}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}

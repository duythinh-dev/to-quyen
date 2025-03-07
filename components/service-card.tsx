import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  isPromotion?: boolean;
  originalPrice?: string;
  promotionLabel?: string;
}

export default function ServiceCard({
  title,
  description,
  price,
  image,
  isPromotion = false,
  originalPrice,
  promotionLabel = "Khuyến mãi",
}: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        {isPromotion && (
          <div className="absolute top-0 right-0 m-2">
            <Badge className="bg-primary hover:bg-primary/90">
              {promotionLabel}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isPromotion && originalPrice ? (
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-primary">{price}</p>
            <p className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </p>
          </div>
        ) : (
          <p className="text-2xl font-bold text-primary">{price}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="#contact">Đặt lịch ngay</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

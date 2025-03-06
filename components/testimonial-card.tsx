import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"

interface TestimonialCardProps {
  name: string
  avatar: string
  rating: number
  testimonial: string
}

export default function TestimonialCard({ name, avatar, rating, testimonial }: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <img src={avatar || "/placeholder.svg"} alt={name} className="h-12 w-12 rounded-full object-cover" />
          <div>
            <h3 className="font-medium">{name}</h3>
            <div className="flex text-yellow-500">
              {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                <Star key={`star-${i}`} className="h-4 w-4 fill-current" />
              ))}
              {rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-current" />}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{testimonial}</p>
      </CardContent>
    </Card>
  )
}


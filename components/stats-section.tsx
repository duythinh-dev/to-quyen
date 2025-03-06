import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/scroll-animation"
import AnimatedCounter from "@/components/animated-counter"
import { Users, Award, Clock, Heart } from "lucide-react"

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Thành tựu của chúng tôi</h2>
            <p className="text-muted-foreground">
              Những con số nói lên sự tin tưởng và uy tín của chúng tôi trong lĩnh vực xăm môi thẩm mỹ.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <StaggerItem>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={5000} suffix="+" />
                </h3>
                <p className="text-muted-foreground">Khách hàng hài lòng</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={10} suffix="+" />
                </h3>
                <p className="text-muted-foreground">Năm kinh nghiệm</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={15000} suffix="+" />
                </h3>
                <p className="text-muted-foreground">Giờ làm việc</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={98} suffix="%" />
                </h3>
                <p className="text-muted-foreground">Tỷ lệ hài lòng</p>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}


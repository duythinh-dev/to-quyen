import Link from "next/link";
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/service-card";
import TestimonialCard from "@/components/testimonial-card";
import GallerySection from "@/components/gallery-section";
import ContactForm from "@/components/contact-form";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Parallax,
  ScaleIn,
} from "@/components/animations/scroll-animation";
import ScrollToTop from "@/components/scroll-to-top";
import StatsSection from "@/components/stats-section";
import AnimatedLogo from "@/components/animated-logo";
import PageTransition from "@/components/page-transition";
import Image from "next/image";
import SmoothScroll from "@/components/smooth-scroll";
import MobileMenu from "@/components/mobile-menu";
import PromotionsBanner from "@/components/promotions-banner";
export default function Home() {
  const contactInfo = {
    phone: "0337 835 385",
    address: "40B Lê Duẩn, Huyện Sa Thầy, Kon Tum",
    businessHours: "T2-CN: 8:30 - 17:30",
    name: "Tố Quyên",
    facebook: "https://www.facebook.com/to.quyen.490388",
  };

  return (
    <PageTransition>
      <SmoothScroll />
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Image
              src="/logo.png"
              alt="Logo"
              width={1000}
              height={300}
              className="w-32 h-10 rounded-xl"
            />
            <nav className="hidden md:flex gap-6">
              <Link
                href="#services"
                className="text-sm font-medium hover:text-primary"
              >
                Dịch vụ
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary"
              >
                Giới thiệu
              </Link>
              <Link
                href="#gallery"
                className="text-sm font-medium hover:text-primary"
              >
                Hình ảnh
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-primary"
              >
                Đánh giá
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary"
              >
                Liên hệ
              </Link>
            </nav>
            <Button asChild className="hidden md:inline-flex">
              <Link href="#contact">Đặt lịch ngay</Link>
            </Button>
            <MobileMenu />
          </div>
        </header>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20" />
            <div className="relative h-[600px] bg-cover bg-center bg-[url('/main-mb.jpg')] sm:bg-[url('/main.png')]">
              <div className="container h-full flex flex-col justify-center">
                <div className="max-w-2xl space-y-4">
                  <FadeIn direction="down" delay={0.2}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                      Dịch vụ phun xăm chuyên nghiệp
                    </h1>
                  </FadeIn>
                  <FadeIn direction="down" delay={0.4}>
                    <p className="text-lg md:text-xl text-muted-foreground">
                      Tôn lên vẻ đẹp tự nhiên của đôi môi bạn với công nghệ phun
                      xăm hiện đại, an toàn và bền màu.
                    </p>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.6}>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button size="lg" asChild>
                        <Link href="#contact">
                          Đặt lịch tư vấn
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="#services">Xem dịch vụ</Link>
                      </Button>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>

          {/* Info Bar */}
          <section className="border-y bg-muted/40">
            <div className="container py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Liên hệ</h3>
                    <p className="text-sm text-muted-foreground">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Địa chỉ</h3>
                    <p className="text-sm text-muted-foreground">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Giờ làm việc</h3>
                    <p className="text-sm text-muted-foreground">
                      {contactInfo.businessHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          {/* <StatsSection /> */}
          <PromotionsBanner />

          {/* Services Section */}
          <section id="services" className="py-16 md:py-24">
            <div className="container">
              <FadeIn>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Dịch vụ phun xăm của chúng tôi
                  </h2>
                  <p className="text-muted-foreground">
                    Chúng tôi cung cấp các dịch vụ phun xăm chất lượng cao, cam
                    kết không xưng, sử dụng công nghệ hiện đại và mực xăm an
                    toàn.
                  </p>
                </div>
              </FadeIn>
              <StaggerContainer>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StaggerItem>
                    <ServiceCard
                      title="Phun xăm môi"
                      description="Giúp đôi môi hồng hào tự nhiên, cân đối và quyến rũ. Công nghệ phun xăm hiện đại giúp môi lên màu đều, tự nhiên và bền màu."
                      price="999.000 VNĐ"
                      image="/lip.jpg"
                      originalPrice="1.500.000 VNĐ"
                      isPromotion
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <ServiceCard
                      title="Phun xăm chân mày"
                      description="Tạo dáng chân mày sắc nét, tự nhiên theo từng khuôn mặt. Kỹ thuật phun xăm chuyên nghiệp giúp từng sợi mày được định hình rõ ràng, không bị đơ cứng."
                      price="499.000 VNĐ"
                      image="/phun-theu-chan-may.jpg"
                      originalPrice="700.000 VNĐ"
                      isPromotion
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <ServiceCard
                      title="Phun xăm mí"
                      description="Tạo đường viền mí mắt sắc nét, giúp đôi mắt to tròn và quyến rũ hơn. Công nghệ phun xăm an toàn, không gây đau rát, giúp đường mí đẹp tự nhiên"
                      price="199.000 VNĐ"
                      originalPrice="300.000 VNĐ"
                      image="/xam-mi.jpg"
                      isPromotion
                    />
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 md:py-24 bg-muted/30">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <Parallax speed={-0.2}>
                  <img
                    src="/phun-xam.jpg"
                    alt="Về chúng tôi"
                    className="rounded-lg shadow-lg"
                  />
                </Parallax>
                <div className="space-y-6">
                  <FadeIn direction="right">
                    <h2 className="text-3xl font-bold tracking-tight">
                      Về chúng tôi
                    </h2>
                    <p className="text-muted-foreground">
                      Với nhiều năm kinh nghiệm trong lĩnh vực phun xăm thẩm mỹ,
                      chúng tôi tự hào mang đến cho khách hàng những dịch vụ
                      chất lượng cao, an toàn và hiệu quả.
                    </p>
                  </FadeIn>
                  <StaggerContainer delay={0.2}>
                    <ul className="space-y-2">
                      <StaggerItem>
                        <li className="flex items-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-primary shrink-0 mt-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>
                            Với nhiều năm kinh nghiệm, cam kết không xưng, tỉ mỉ
                            và chất lượng cao
                          </span>
                        </li>
                      </StaggerItem>
                      <StaggerItem>
                        <li className="flex items-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-primary shrink-0 mt-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>
                            Sử dụng mực xăm nhập khẩu, an toàn cho sức khỏe
                          </span>
                        </li>
                      </StaggerItem>
                      <StaggerItem>
                        <li className="flex items-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-primary shrink-0 mt-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>
                            Thiết bị hiện đại, đảm bảo vệ sinh và an toàn
                          </span>
                        </li>
                      </StaggerItem>
                      <StaggerItem>
                        <li className="flex items-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-primary shrink-0 mt-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Tư vấn cá nhân hóa cho từng khách hàng</span>
                        </li>
                      </StaggerItem>
                    </ul>
                  </StaggerContainer>
                  <FadeIn direction="up" delay={0.6}>
                    <Button asChild>
                      <Link href="#contact">Liên hệ ngay</Link>
                    </Button>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="py-16 md:py-24">
            <div className="container">
              <FadeIn>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Hình ảnh thực tế
                  </h2>
                  <p className="text-muted-foreground">
                    Khám phá một số hình ảnh trước và sau khi sử dụng dịch vụ
                    xăm môi của chúng tôi.
                  </p>
                </div>
              </FadeIn>
              <ScaleIn>
                <GallerySection />
              </ScaleIn>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
            <div className="container">
              <FadeIn>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Khách hàng nói gì về chúng tôi
                  </h2>
                  <p className="text-muted-foreground">
                    Hàng ngàn khách hàng đã hài lòng với dịch vụ xăm môi của
                    chúng tôi.
                  </p>
                </div>
              </FadeIn>
              <StaggerContainer>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StaggerItem>
                    <TestimonialCard
                      name="Nguyễn Thị Hương"
                      avatar="/placeholder.svg?height=100&width=100"
                      rating={5}
                      testimonial="Tôi rất hài lòng với kết quả xăm môi. Màu sắc tự nhiên và bền đẹp. Chuyên viên rất tận tâm và chuyên nghiệp."
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <TestimonialCard
                      name="Trần Minh Anh"
                      avatar="/placeholder.svg?height=100&width=100"
                      rating={5}
                      testimonial="Đã thử nhiều nơi nhưng chỉ ở đây tôi mới thực sự hài lòng. Môi đẹp tự nhiên, không đau và hồi phục nhanh."
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <TestimonialCard
                      name="Lê Thanh Thảo"
                      avatar="/placeholder.svg?height=100&width=100"
                      rating={4}
                      testimonial="Dịch vụ chuyên nghiệp, không gian sạch sẽ và thoải mái. Tôi sẽ giới thiệu cho bạn bè và người thân."
                    />
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16 md:py-24">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <FadeIn direction="left">
                    <h2 className="text-3xl font-bold tracking-tight">
                      Liên hệ với chúng tôi
                    </h2>
                    <p className="text-muted-foreground">
                      Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn trong
                      thời gian sớm nhất để tư vấn và đặt lịch.
                    </p>
                  </FadeIn>
                  <StaggerContainer>
                    <div className="space-y-4">
                      <StaggerItem>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Điện thoại</p>
                            <p className="text-sm text-muted-foreground">
                              {contactInfo.phone}
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Địa chỉ</p>
                            <p className="text-sm text-muted-foreground">
                              {contactInfo.address}
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Giờ làm việc</p>
                            <p className="text-sm text-muted-foreground">
                              {contactInfo.businessHours}
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                    </div>
                  </StaggerContainer>
                  <FadeIn direction="up" delay={0.6}>
                    <div className="pt-4">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.331200136876!2d107.795262!3d14.408061300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316bf7002945b03f%3A0xa01d0d624100c690!2zUGh1biB4xINtIHRo4bqpbSBt4bu5IFThu5EgUXV5w6pu!5e0!3m2!1svi!2s!4v1741230317000!5m2!1svi!2s"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </FadeIn>
                </div>
                <ScaleIn delay={0.3}>
                  <ContactForm />
                </ScaleIn>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t py-8 md:py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold">Tố Quyên</span>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Chuyên cung cấp dịch vụ phun xăm thẩm mỹ chất lượng cao, an
                  toàn và hiệu quả.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-4">Dịch vụ</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Phun xăm môi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Phun xăm chân mày
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Phun xăm mí
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Liên kết</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#about"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Về chúng tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Dịch vụ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#gallery"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Hình ảnh
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Theo dõi chúng tôi</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.facebook.com/to.quyen.490388"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>© 2025 Tố Quyên. Tất cả các quyền được bảo lưu.</p>
            </div>
          </div>
        </footer>
        <ScrollToTop />
      </div>
    </PageTransition>
  );
}

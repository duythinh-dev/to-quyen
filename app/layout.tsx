import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tố Quyên | Dịch vụ phun xăm chuyên nghiệp",
  description:
    "Dịch vụ xăm môi thẩm mỹ chuyên nghiệp tại Kon Tum. Tố Quyên - Nơi tôn vinh vẻ đẹp tự nhiên của đôi môi bạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Tố Quyên | Dịch vụ phun xăm chuyên nghiệp",
  description:
    "Dịch vụ xăm môi thẩm mỹ chuyên nghiệp tại Kon Tum. Tố Quyên - Nơi tôn vinh vẻ đẹp tự nhiên của đôi môi bạn.",
  keywords: [
    "phun xăm môi",
    "xăm môi thẩm mỹ",
    "phun môi đẹp",
    "phun xăm tại Kon Tum",
    "phun xăm tại Sa Thầy",
    "xăm môi tại Sa Thầy",
    "xăm môi tại Kon Tum",
    "xăm mí tại Sa Thầy",
    "xăm mí tại Kon Tum",
    "Tố Quyên",
    "dịch vụ phun xăm",
    "thẩm mỹ Kon Tum",
    "phun xăm mày",
    "xăm mày thẩm mỹ",
    "phun mày đẹp",
    "phun xăm mày tại Kon Tum",
    "phun xăm mày tại Sa Thầy",
    "xăm mày tại Sa Thầy",
    "xăm môi",
    "xăm mày",
    "phun xăm",
    "xăm môi thẩm mỹ",
    "xăm mày thẩm mỹ",
    "phun xăm môi",
    "phun xăm mày",
  ],
  openGraph: {
    title: "Tố Quyên | Dịch vụ phun xăm chuyên nghiệp tại Kon Tum",
    description:
      "Dịch vụ xăm môi thẩm mỹ chuyên nghiệp tại Sa Thầy - Kon Tum. Tố Quyên - Nơi tôn vinh vẻ đẹp tự nhiên của đôi môi bạn.",
    url: "https://toquyen.vercel.app",
    siteName: "Tố Quyên Beauty",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <Analytics />
      <body>{children}</body>
    </html>
  );
}

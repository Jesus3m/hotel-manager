"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { Layout } from "@/shared/ui/templates/layout";
import { HotelProvider } from "@/shared/context/hotel/hotel.context";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/shared/services/client";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="es">
        <body className={inter.className}>
          <HotelProvider>
            <Layout>{children}</Layout>
          </HotelProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}

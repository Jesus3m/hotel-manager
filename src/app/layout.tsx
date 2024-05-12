"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Layout } from "@/shared/ui/templates/layout";
import { HotelProvider } from "@/shared/context/hotel/hotel.context";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/shared/services/client";
import { GlobalProvider } from "@/shared/context/global.context";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <html lang="es" className="overflow-x-hidden">
          <motion.body>
            <HotelProvider>
              <AnimatePresence key={path}>
                <Layout>{children}</Layout>
              </AnimatePresence>
            </HotelProvider>
          </motion.body>
        </html>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

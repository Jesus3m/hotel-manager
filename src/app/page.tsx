"use client";
import { HotelView } from "@/core/hotels/hotel.view";
import { useGlobal } from "@/shared/context/global.context";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Home() {
  const { isAuth } = useGlobal();
  const router = useRouter();

  useEffect(() => {
    if (isAuth && isAuth?.user.role !== "admin") {
      router.push("/booking");
    }
  }, [isAuth]);
  return (
    <Suspense>
      <HotelView></HotelView>
    </Suspense>
  );
}

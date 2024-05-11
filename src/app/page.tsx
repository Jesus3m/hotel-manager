import { HotelView } from "@/core/hotels/hotel.view";
import { HotelProvider } from "@/shared/context/hotel/hotel.context";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <HotelView></HotelView>
    </Suspense>
  );
}

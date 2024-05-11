"use client";
import { BookingView } from "@/core/booking/booking.view";
import { Suspense } from "react";

export default function Booking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="p-4">
        <BookingView></BookingView>
      </main>
    </Suspense>
  );
}

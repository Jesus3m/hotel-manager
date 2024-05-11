"use client";
import { BookingView } from "@/core/booking/booking.view";
import { AdminBookingView } from "@/core/booking/view/admin/admin.view";
import { Suspense } from "react";

export default function Booking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="p-4">
        <AdminBookingView></AdminBookingView>
      </main>
    </Suspense>
  );
}

"use client";
import React, { useEffect } from "react";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { useSearchParams } from "next/navigation";
import { Booking } from "@/shared/ui/templates/layout/booking";
import { BookingCard } from "./components/booking-card";
import { CardSkeleton } from "./components/booking-card/skeleton";

export const BookingView = () => {
  const { rooms, getRooms, isLoadingRooms } = useHotel();

  const params = useSearchParams();

  useEffect(() => {
    getRooms({
      location: params.get("location"),
      startDate: params.get("startDate"),
      endDate: params.get("endDate"),
      guests: params.get("guests"),
    });
  }, [params]);

  return (
    <>
      <Booking />

      <main className="flex flex-col items-center justify-between ">
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 p-12 lg:grid-cols-4 w-full">
          {rooms.length > 0 &&
            rooms.map((room) => <BookingCard key={room._id} {...room} />)}
          {isLoadingRooms &&
            Array(10)
              .fill("")
              .map((x, i) => <CardSkeleton key={i} />)}
        </section>
        {!rooms.length && (
          <h3 className="w-full text-center">
            No tenemos habitaciones disponibles con estos parámetros!
          </h3>
        )}
      </main>
    </>
  );
};

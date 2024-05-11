"use client";
import React, { useState } from "react";
import { HotelCard } from "./components/hotel-card";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { CategorySlide } from "./components/categories-slide";
import { Modal } from "@/shared/ui/templates/modal/modal.component";
import { CreateHotelView } from "./views/create/create-hotel.view";
import { Hotel } from "./hotel.interfaces";
import { Booking } from "@/shared/ui/templates/layout/booking";
import { CardSkeleton } from "./components/hotel-card/skeleton";

export const HotelView = () => {
  const { hotels, loadingHotels } = useHotel();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Hotel>({} as Hotel);

  return (
    <>
      <Booking />

      <main className="flex flex-col items-center justify-between ">
        <CategorySlide />
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 p-12 lg:grid-cols-4 w-full">
          {!loadingHotels &&
            hotels?.map((hotel) => (
              <HotelCard
                key={hotel._id}
                toggleModal={() => {
                  setIsOpen((prev) => !prev);
                  setModalData(hotel);
                }}
                {...hotel}
              />
            ))}
          {!hotels?.length &&
            !loadingHotels &&
            Array(10)
              .fill("")
              .map((x, i) => <CardSkeleton key={i} />)}
        </section>
        <section className="fixed z-10 bottom-0 right-0">
          <button
            className="p-2 m-4 shadow-xl rounded text-white flex justify-center items-center"
            style={{ background: "#de1262" }}
            onClick={() => {
              setIsOpen(true);
              window.scrollTo(0, 0);
            }}
          >
            Crear Hotel
          </button>
        </section>
        <Modal
          title={modalData._id ? "Editar Hotel" : "Crear Hotel"}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <CreateHotelView
            toggleModal={() => setIsOpen((prev) => !prev)}
            data={modalData}
          />
        </Modal>
      </main>
    </>
  );
};

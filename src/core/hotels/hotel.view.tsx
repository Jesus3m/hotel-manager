"use client";
import React, { useState } from "react";
import { HotelCard } from "./components/hotel-card";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { useHotelView } from "./hotel.hook";
import { CategorySlide } from "./components/categories-slide";
import { Modal } from "@/shared/ui/templates/modal/modal.component";
import { CreateHotelView } from "./views/create/create-hotel.view";
import { Hotel } from "./hotel.interfaces";

export const HotelView = () => {
  const { hotels } = useHotel();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Hotel>({} as Hotel);

  return (
    <main className="flex flex-col items-center justify-between">
      <CategorySlide />
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 p-12 lg:grid-cols-4">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            toggleModal={() => {
              setIsOpen((prev) => !prev);
              setModalData(hotel);
            }}
            {...hotel}
          />
        ))}
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
        title={modalData.id ? "Editar Hotel" : "Crear Hotel"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <CreateHotelView
          toggleModal={() => setIsOpen((prev) => !prev)}
          data={modalData}
        />
      </Modal>
    </main>
  );
};

"use client";
import React, { FC, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
import { Pagination } from "swiper/modules";

import { Room } from "@/core/hotels/hotel.interfaces";
import { Modal } from "@/shared/ui/templates/modal/modal.component";
import { CreateBookingView } from "../../view/create/create-booking.view";
import { Booking } from "../../booking.interface";
export const BookingCard: FC<Room> = ({ ...room }) => {
  const ref = useRef<any>();

  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Booking & { room: Room }>(
    {} as any
  );

  return (
    <>
      <div
        ref={ref}
        className={`flex flex-col gap-1 ${
          room.status === "disabled" ? "grayscale text-gray-500" : ""
        }`}
      >
        <a
          onClick={() => {
            setModalData({ room } as any);
            setIsOpen(true);
          }}
        >
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className={`rounded-xl h-40 ${
              room.status === "disabled" ? "opacity-50 blur" : ""
            }`}
          >
            {room?.hotel?.image.map((image) => (
              <SwiperSlide key={nanoid()}>
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </a>
        <div className="font-bold text-sm">{room.name}</div>
        <div className="text-xs">{room.hotel?.name}</div>
        <div className="text-sm flex justify-between">
          <span className="font-bold"> {room.cost} $ por Noche</span>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateBookingView
          data={modalData}
          toggleModal={() => {
            setIsOpen((prev) => !prev);

            setModalData({} as any);
          }}
        ></CreateBookingView>
      </Modal>
    </>
  );
};

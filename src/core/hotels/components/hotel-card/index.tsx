"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { Hotel } from "../../hotel.interfaces";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
import { Pagination } from "swiper/modules";
import Dropdown from "@/shared/ui/molecules/dropdown";

import { FaEllipsisVertical } from "react-icons/fa6";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
export const HotelCard: FC<Hotel & { toggleModal: () => void }> = ({
  name,
  image,
  description,
  location,
  _id,
  category,
  status,
  toggleModal,
}) => {
  const ref = useRef<any>();

  const [position, setPosition] = useState("bottom end");
  const { push } = useRouter();

  const { update } = useHotel();

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-1 ${
        status === "disabled" ? "grayscale text-gray-500" : ""
      }`}
    >
      <Link href={`/detail/${_id}`}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className={`rounded-xl h-40 ${
            status === "disabled" ? "opacity-50 blur" : ""
          }`}
        >
          {image.map((image) => (
            <SwiperSlide key={nanoid()}>
              <img src={image} alt="" className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Link>
      <div className="font-bold">{name}</div>
      <div className="text-sm flex justify-between">
        <span>
          {location.country}, {location.city}
        </span>
        <span className="text-xs">
          <Dropdown
            options={[
              {
                label: "Editar",
                onClick: () => {
                  toggleModal();
                },
              },
              {
                label: status === "disabled" ? "Habilitar" : "Deshabilitar",
                onClick: () => {
                  update(_id!, {
                    name,
                    image,
                    description,
                    location,
                    _id,
                    category,
                    status: status === "disabled" ? "enabled" : "disabled",
                  });
                },
              },
              {
                label: "Ver habitaciones",
                onClick: () => {
                  push(`/detail/${_id}/rooms`);
                },
              },
            ]}
            position={position}
          >
            {({ active }: any) => (
              <button
                className={
                  "rounded-lg p-1 px-2 text-xs text-gray-500 hover:bg-gray-200"
                }
              >
                <FaEllipsisVertical></FaEllipsisVertical>
              </button>
            )}
          </Dropdown>
        </span>
      </div>
    </div>
  );
};

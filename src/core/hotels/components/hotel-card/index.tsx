import React, { FC, useEffect, useRef, useState } from "react";
import { Hotel } from "../../hotel.interfaces";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
import { Pagination } from "swiper/modules";
import Dropdown from "@/shared/ui/molecules/dropdown";

import { FaEllipsisVertical } from "react-icons/fa6";

export const HotelCard: FC<Hotel & { toggleModal: () => void }> = ({
  name,
  image,
  location,
  id,
  toggleModal,
}) => {
  const ref = useRef<any>();

  const [position, setPosition] = useState("bottom start");

  useEffect(() => {
    if (ref.current) {
      const pos = ref.current.getBoundingClientRect();
      if (pos.left < pos.right) {
        setPosition("bottom end");
      }
    }
  }, [ref]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <Link href={`/detail/${id}`}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="rounded-xl h-40"
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
                label: "Deshabilitar",
                onClick: () => {
                  console.log("Eliminar");
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

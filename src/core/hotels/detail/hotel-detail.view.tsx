"use client";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
export const HotelDetailView = () => {
  const { id } = useParams();

  const { getHotel, hotel, hotels } = useHotel();
  useEffect(() => {
    getHotel(id as string);
  }, [id, hotels]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
      <div>
        <h2 className="text-3xl font-bold my-2">{hotel?.name}</h2>

        <Swiper spaceBetween={20}>
          {hotel?.image?.map((image) => (
            <SwiperSlide className="m-auto" key={nanoid()}>
              <img
                className=" rounded-xl w-full h-full object-cover object-center"
                src={image}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <h3 className="p-2 text-sm font-bold">
          {hotel?.location?.city}, {hotel?.location?.country}
        </h3>
      </div>
      <div>
        <span className="w-full h-1 bg-gray-300"></span>

        <div>
          <h2 className="font-bold my-2">Description:</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
            temporibus doloribus ex maxime nostrum ratione numquam vel,
            veritatis enim natus unde atque accusamus blanditiis libero nobis
            est, deleniti nemo! Dolore!
          </p>
        </div>
        <div>
          <h2 className="font-bold my-2">Categorias:</h2>
          <p>
            {hotel?.category?.map((category) => (
              <span key={nanoid()} className="mr-2 p-1 bg-gray-300 rounded-md">
                {category}
              </span>
            ))}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

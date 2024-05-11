"use client";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";

export const HotelDetailView = () => {
  const { id: _id } = useParams();

  const { getHotel, hotel, hotels } = useHotel();
  useEffect(() => {
    getHotel(_id as string);
  }, [_id, hotels]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
        <div className="h-min">
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
        <div className="flex flex-col gap-3">
          {hotel?.description && (
            <div>
              <h2 className="font-bold my-2">Description:</h2>
              <p>{hotel?.description}</p>
            </div>
          )}
          <div>
            <h2 className="font-bold my-2">Categorías:</h2>
            <p>
              {Array.isArray(hotel?.category) &&
                hotel?.category?.map((category) => (
                  <span
                    key={nanoid()}
                    className="mr-2 p-1 bg-gray-300 rounded-md"
                  >
                    {category}
                  </span>
                ))}
            </p>
          </div>
          <div>
            <img
              src="https://s1.elespanol.com/2023/09/01/elandroidelibre/791181520_235739262_1706x960.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

"use client";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
import { Navigation, Pagination } from "swiper/modules";

export const HotelDetailView = () => {
  const { id: _id } = useParams();

  const { getHotel, hotel, loadingHotel } = useHotel();
  useEffect(() => {
    getHotel(_id as string);
  }, [_id]);

  return !loadingHotel ? (
    <>
      <h2 className=" text-3xl font-bold p-4">{hotel?.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
        <div className="max-h-96">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={{ clickable: true }}
            spaceBetween={20}
            className="h-full flex justify-center items-center rounded-xl m-auto"
          >
            {hotel?.image?.map((image) => (
              <SwiperSlide className="m-auto" key={nanoid()}>
                <img
                  className="rounded-xl w-full h-full object-contain object-center"
                  src={image}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className=" text-sm font-bold">
            {hotel?.location?.city}, {hotel?.location?.state},{" "}
            {hotel?.location?.country}
          </h3>
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
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
      <div className="bg-gray-300 animate-pulse w-full h-80 rounded-lg"></div>
      <div className="flex flex-col gap-3">
        <div className="bg-gray-300 animate-pulse w-full h-10 rounded-lg"></div>
        <div className="bg-gray-300 animate-pulse w-full h-4 rounded-lg"></div>
        <div className="bg-gray-300 animate-pulse w-full h-4 rounded-lg"></div>
        <div className="bg-white animate-pulse w-full h-4 rounded-lg"></div>
        <div className="bg-gray-300 animate-pulse w-full h-10 rounded-lg"></div>
        <div className="bg-gray-300 animate-pulse w-full h-4 rounded-lg"></div>
        <div className="bg-gray-300 animate-pulse w-full h-4 rounded-lg"></div>
        <div className="bg-gray-300 animate-pulse w-full h-44 rounded-lg"></div>
      </div>
    </div>
  );
};

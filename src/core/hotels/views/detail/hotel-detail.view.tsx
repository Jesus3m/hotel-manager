"use client";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
import { Button } from "@/shared/ui/atoms/button";

const habitations = [
  {
    location: "11B",
    cost: 1500,
    name: "Agila",
    type: "Basic",
    taxes: 2.99,
  },
  {
    location: "12B",
    cost: 2000,
    name: "Leon",
    type: "Premium",
    taxes: 3.99,
  },
  {
    location: "13B",
    cost: 2500,
    name: "Villa",
    type: "Premium",
    taxes: 3.99,
  },
  {
    location: "14B",
    cost: 3000,
    name: "Pex",
    type: "Premium",
    taxes: 3.99,
  },
  {
    location: "15B",
    cost: 2000,
    name: "Sofa",
    type: "Basic",
    taxes: 3.99,
  },
];

export const HotelDetailView = () => {
  const { id } = useParams();

  const { getHotel, hotel, hotels } = useHotel();
  useEffect(() => {
    getHotel(id as string);
  }, [id, hotels]);

  return (
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
        <span className="w-full h-1 bg-gray-300"></span>

        {hotel.description && (
          <div>
            <h2 className="font-bold my-2">Description:</h2>
            <p>{hotel.description}</p>
          </div>
        )}
        <div>
          <h2 className="font-bold my-2">Categorias:</h2>
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
      <div className="col-span-2 w-full p-4">
        <div className="flex justify-between">
          <h2 className="font-bold my-2">Habitaciones</h2>
          <div>
            <Button onClick={console.log}>Crear Habitacion</Button>
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {habitations.map((habitation) => (
            <li
              key={habitation.location}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {habitation.location}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {habitation.name}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {habitation.type}
                </p>
                {habitation.cost ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Base Cost: &nbsp;
                    {habitation.cost}$
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

"use client";
import { Location } from "@/core/hotels/hotel.interfaces";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import React, { useState } from "react";
import { FaSistrix } from "react-icons/fa6";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { hotels as hotelData } from "@/shared/services/hotel/consts";

const inputs = [
  {
    placeholder: "Explora destinos",
    key: 1,
    type: "text",
    label: "Donde",
    name: "location",
    data: ["a", "b", "c"],
  },
  {
    placeholder: "dd/mm/yyy",
    key: 2,
    type: "date",
    name: "startDate",
    label: "Llegada",
  },
  {
    placeholder: "dd/mm/yyy",
    key: 3,
    type: "date",
    name: "endDate",
    label: "Salida",
  },
  {
    placeholder: "Cuantos?",
    key: 4,
    type: "number",
    name: "guests",
    label: "Personas",
  },
];
export const Booking = () => {
  const { getHotels } = useHotel();
  const [locations, setLocations] = useState<Location[]>([]);

  useState(() => {
    setLocations(hotelData.map((hotel) => hotel.location));
  });

  const { register, handleSubmit } = useForm();

  const handleFilter = (filter: any) => {
    getHotels({
      location: {
        state: filter.location,
      },
      startDate: new Date(filter.startDate),
      endDate: new Date(filter.endDate),
      guests: Number(filter.guests),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFilter)}>
        <div className="w-4/5 m-auto flex flex-col justify-between items-end px-2 py-2 rounded shadow-none md:shadow-lg md:flex-row gap-4 border-t-2">
          {inputs.map((input) => (
            <div key={input.key} className="relative w-full">
              <label
                className="absolute font-bold text-xs translate-y-[-10px]"
                key={input.key}
              >
                {input.label}
              </label>
              <input
                className="bg-gray-50 md:bg-white p-2 md:p-1 outline-none w-full shadow-sm md:shadow-none "
                type={input.type}
                list={input.data?.length ? input.name : undefined}
                placeholder={input.placeholder}
                {...register(input.name)}
              />
              {locations && (
                <datalist id={input.name}>
                  {locations.map((item) => (
                    <option key={nanoid()} value={`${item.city}`} />
                  ))}
                </datalist>
              )}
            </div>
          ))}
          <button
            className="p-2 w-full md:w-10 rounded text-white flex justify-center items-center text-2xl"
            style={{ background: "#de1262" }}
          >
            <FaSistrix />
          </button>
        </div>
      </form>
      <div className=" bg-gray-300 h-0.5 m-5"></div>
    </>
  );
};

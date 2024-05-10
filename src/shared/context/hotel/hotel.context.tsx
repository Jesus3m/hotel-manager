"use client";
import React, { FC, ReactNode, useContext, useEffect } from "react";
import { Hotel } from "@/core/hotels/hotel.interfaces";
import hotelService from "@/shared/services/hotel/hotel.service";

interface HotelContext {
  hotels: Hotel[];
  hotel: Hotel;
  create: (hotel: Hotel) => void;
  getHotel: (id: string) => Hotel;
}

export const hotelContext = React.createContext<HotelContext>({
  hotels: [],
  hotel: {} as Hotel,
  create(hotel) {
    return;
  },
  getHotel(id) {
    return {} as Hotel;
  },
});
export const useHotel = () => {
  return useContext(hotelContext);
};

export const HotelProvider: FC<Readonly<{ children: ReactNode }>> = ({
  children,
}) => {
  const [hotels, setHotels] = React.useState<Hotel[]>([]);
  const [hotel, setHotel] = React.useState<Hotel>({} as Hotel);

  const create = (hotel: Hotel) => {
    setHotels((prev) => [...prev, hotel]);
  };

  const getHotel = (id: string) => {
    const hotel = hotels.find((hotel) => hotel.id === id);
    setHotel(hotel as Hotel);
    return hotel as Hotel;
  };

  useEffect(() => {
    if (hotels.length > 0) {
      localStorage.setItem("hotels", JSON.stringify(hotels));
    }
  }, [hotels]);

  useEffect(() => {
    setHotels(hotelService.getHotels());
  }, []);

  return (
    <hotelContext.Provider value={{ hotels, create, getHotel, hotel }}>
      {children}
    </hotelContext.Provider>
  );
};

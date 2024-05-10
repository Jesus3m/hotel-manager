"use client";
import React, { FC, ReactNode, useContext, useEffect } from "react";
import { Hotel, Room } from "@/core/hotels/hotel.interfaces";
import hotelService from "@/shared/services/hotel/hotel.service";
import { hotels as hotelData } from "@/shared/services/hotel/consts";
import { nanoid } from "nanoid";
interface HotelContext {
  hotels: Hotel[];
  hotel: Hotel;
  create: (hotel: Hotel) => void;
  update: (id: string, hotel: Hotel) => void;
  getHotel: (id: string) => Hotel;
  getHotels: (filter?: Record<string, any>) => Hotel[];
  setRoom: (room: Room) => void;
}

export const hotelContext = React.createContext<HotelContext>({
  hotels: [],
  hotel: {} as Hotel,
  create(hotel) {
    return;
  },
  update(id, hotel) {
    return;
  },
  getHotel(id) {
    return {} as Hotel;
  },
  getHotels(filter?: Record<string, any>) {
    return [];
  },
  setRoom(room) {
    return;
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

  const update = (id: string, hotel: Hotel) => {
    setHotels((prev) => prev.map((h) => (h.id === id ? hotel : h)));
    setHotel(hotel);
  };

  const getHotel = (id: string) => {
    const hotel = hotels.find((hotel) => hotel.id === id);
    setHotel(hotel as Hotel);
    return hotel as Hotel;
  };

  const getHotels = (filter?: Record<string, any>) => {
    if (!filter) {
      setHotels(hotelData as Hotel[]);
      return [];
    }
    const filterHotels = hotelData.filter((h) => {
      if (filter?.category && !h?.category?.includes(filter.category)) {
        return false;
      }
      return true;
    });

    setHotels(filterHotels as Hotel[]);
    return filterHotels as Hotel[];
  };

  const setRoom = (room: Room) => {
    if (hotel.id) {
      if (room.id) {
        update(hotel.id, {
          ...hotel,
          rooms: hotel.rooms?.map((r) => (r.id === room.id ? room : r)),
        });
      } else {
        update(hotel.id, {
          ...hotel,
          rooms: [...(hotel.rooms || []), { ...room, id: nanoid() }],
        });
      }
    }
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
    <hotelContext.Provider
      value={{ hotels, create, getHotel, hotel, update, getHotels, setRoom }}
    >
      {children}
    </hotelContext.Provider>
  );
};

"use client";
import React, { FC, ReactNode, useContext, useEffect } from "react";
import { Hotel, Room } from "@/core/hotels/hotel.interfaces";
import hotelService from "@/shared/services/hotel/hotel.service";
import { useMutation, useQuery } from "react-query";
import roomService from "@/shared/services/room/room.service";
import bookingService from "@/shared/services/booking/booking.service";
import { Booking } from "@/core/booking/booking.interface";
interface HotelContext {
  hotels?: Hotel[];
  hotel: Hotel;
  bookings: Booking[];
  rooms: Room[];
  create: (hotel: Hotel) => void;
  update: (_id: string, hotel: Hotel) => void;
  getHotel: (_id: string) => void;
  getHotels: (filter?: Record<string, any>) => void;
  getBookings: (filter?: Record<string, any>) => void;
  getRooms: (filter?: Record<string, any>) => void;
  setRoom: (room: Room) => void;
  setBooking: (booking: Booking) => void;
  categories: any[];
  loadingHotels: boolean;
  isLoadingRooms: boolean;
}

export const hotelContext = React.createContext<HotelContext>({
  hotels: [],
  bookings: [],
  rooms: [],
  categories: [],
  hotel: {} as Hotel,
  loadingHotels: true,
  isLoadingRooms: true,

  create(hotel) {
    return;
  },
  update(id, hotel) {
    return;
  },
  getHotel(id) {
    return {} as Hotel;
  },
  getHotels(filter?: Record<string, any>) {},
  getBookings(filter?: Record<string, any>) {},
  getRooms(filter?: Record<string, any>) {},
  setRoom(room) {
    return;
  },
  setBooking(booking) {
    return;
  },
});
export const useHotel = () => {
  return useContext(hotelContext);
};

export const HotelProvider: FC<Readonly<{ children: ReactNode }>> = ({
  children,
}) => {
  const {
    mutate: getAll,
    data: hotels,
    isLoading: loadingHotels,
  } = useMutation(hotelService.findAll);

  const {
    mutate: getRooms,
    data: rooms,
    isLoading: isLoadingRooms,
  } = useMutation(roomService.findAll);

  const { mutate: getCategories, data: categories } = useMutation(
    hotelService.getCategories
  );

  const { mutate: getBookings, data: bookings } = useMutation(
    bookingService.findAll
  );

  const { mutate: createHotel, data: hotelCreated } = useMutation(
    hotelService.create,
    {
      onSuccess: (data) => {
        getAll({});
        getCategories();
      },
    }
  );

  const { mutate: createRoom, data: roomCreated } = useMutation(
    roomService.create,
    {
      onSuccess: (data) => {
        getById(data.data.hotel_id);
      },
    }
  );
  const { mutate: setBooking, data: bookingCreated } = useMutation(
    bookingService.create,
    {
      onSuccess: (data) => {},
    }
  );

  const { mutate: updateRoom, data: roomUpdated } = useMutation(
    (args: any) => roomService.update(args._id, args),
    {
      onSuccess: (data) => {
        getById(data.data.hotel_id);
      },
    }
  );

  const { mutate: updateHotel, data: hotelUpdate } = useMutation(
    (args: any) => hotelService.update(args._id, args),
    {
      onSuccess: (data) => {
        getAll({});
        getCategories();
      },
    }
  );

  const { data: hotel, mutate: getById } = useMutation(hotelService.get);

  const create = (hotel: Hotel) => {
    createHotel(hotel);
  };

  const update = (_id: string, hotel: Hotel) => {
    updateHotel({ ...hotel } as any);
  };

  const getHotel = (_id: string) => {
    getById(_id);
  };

  const getHotels = (filter?: Record<string, any>) => {
    getAll({ ...filter });
  };

  const setRoom = (room: Room) => {
    if (hotel?.data && hotel?.data._id) {
      if (room._id) {
        updateRoom({
          ...room,
        });
      } else {
        createRoom({
          ...room,
        });
      }
    }
  };

  useEffect(() => {
    getAll({});
    getCategories();
  }, []);

  return (
    <hotelContext.Provider
      value={{
        hotels: hotels?.data,
        create,
        getHotel,
        hotel: hotel?.data || ({} as Hotel),
        update,
        getHotels,
        setRoom,
        categories: categories!,
        loadingHotels,
        rooms: rooms?.data || [],
        getRooms,
        setBooking,
        isLoadingRooms,
        bookings: bookings?.data || [],
        getBookings,
      }}
    >
      {children}
    </hotelContext.Provider>
  );
};

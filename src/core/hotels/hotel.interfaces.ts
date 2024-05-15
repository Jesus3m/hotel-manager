import { Booking } from "../booking/booking.interface";

export interface Hotel {
  _id?: string;
  description?: string;
  temp?: string;
  name: string;
  image: string[];
  location: Location;
  category?: string[];
  status?: string;
  rooms?: Room[];
  bookings?: Partial<Booking[]>;
}

export interface Room {
  _id?: string;
  hotel_id: string;
  location: string;
  cost: number;
  name: string;
  type: string;
  taxes: number;
  hotel?: {
    _id?: string;
    description?: string;
    temp?: string;
    name: string;
    image: string[];
    location: Location;
    category?: string[];
    status?: string;
    bookings?: Partial<Booking[]>;
  };
  allowedGuests?: number;
  status?: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  street: string;
}

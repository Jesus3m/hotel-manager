import { Hotel, Room } from "../hotels/hotel.interfaces";

export interface Booking {
  _id: string;
  startDate: Date;
  endDate: Date;
  hotel_id: string;
  room_id: string;
  user_id: string;
  hotel?: {
    _id?: string;
    description?: string;
    temp?: string;
    name: string;
    image: string[];
    location: Location;
    category?: string[];
    status?: string;
  };
  room?: {
    _id?: string;
    hotel_id: string;
    hotel?: {
      _id?: string;
      description?: string;
      temp?: string;
      name: string;
      image: string[];
      location: Location;
      category?: string[];
      status?: string;
    };
    location: string;
    cost: number;
    name: string;
    type: string;
    taxes: number;
    allowedGuests?: number;
    status?: string;
  };
  guests: {
    name: string;
    lastname: string;
    birthdate: Date;
    phone: string;
    email: string;
    document: string;
    documentType: string;
  }[];
  user: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
  };
  total: number;
  price: number;
}

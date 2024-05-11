import { Hotel, Room } from "../hotels/hotel.interfaces";

export interface Booking {
  _id: string;
  startDate: Date;
  endDate: Date;
  hotel_id: string;
  room_id: string;
  user_id: string;
  hotel?: Partial<Hotel>;
  room?: Partial<Room>;
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

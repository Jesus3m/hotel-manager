export interface Hotel {
  _id?: string;
  description?: string;
  name: string;
  image: string[];
  location: Location;
  category?: string[];
  status?: string;
  rooms?: Room[];
}

export interface Room {
  _id?: string;
  hotel_id: string;
  location: string;
  cost: number;
  name: string;
  type: string;
  taxes: number;
  allowedGuests?: number;
  status?: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  street: string;
}

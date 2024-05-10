export interface Hotel {
  id?: string;
  name: string;
  image: string[];
  location: Location;
  category?: string[];
}

export interface Location {
  city: string;
  state: string;
  country: string;
  street: string;
}

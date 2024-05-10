export interface Hotel {
  id?: string;
  description: string;
  name: string;
  image: string[];
  location: Location;
  category?: string[];
  status?: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  street: string;
}

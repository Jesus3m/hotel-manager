import { hotels } from "./consts";

export class HotelService {
  getHotels() {
    const hotelLocal = JSON.parse(localStorage.getItem("hotels") || "[]");
    return hotelLocal.length ? hotelLocal : hotels;
  }
}

export default new HotelService();

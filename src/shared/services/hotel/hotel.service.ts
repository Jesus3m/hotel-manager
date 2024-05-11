import { Hotel } from "@/core/hotels/hotel.interfaces";
import Service from "../_generic/generic.services";
import { AxiosClient } from "../client";

export class HotelService extends Service<Hotel> {
  async getCategories() {
    const res = await AxiosClient.get<{ _id: string }[]>("/hotel/category");

    return res.data;
  }
}

export default new HotelService("/hotel");

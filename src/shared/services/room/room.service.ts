import { Room } from "@/core/hotels/hotel.interfaces";
import Service from "../_generic/generic.services";
import { AxiosClient } from "../client";

export class RoomService extends Service<Room> {}

export default new RoomService("/room");

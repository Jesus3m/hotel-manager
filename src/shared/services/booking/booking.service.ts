import { Booking } from "@/core/booking/booking.interface";
import Service from "../_generic/generic.services";
import { AxiosClient } from "../client";

export class BookingService extends Service<Booking> {}

export default new BookingService("/booking");

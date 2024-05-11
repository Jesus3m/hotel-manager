import { useHotel } from "@/shared/context/hotel/hotel.context";
import { Modal } from "@/shared/ui/templates/modal/modal.component";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CreateBookingView } from "../create/create-booking.view";
import { Booking } from "../../booking.interface";
import { Room } from "@/core/hotels/hotel.interfaces";

export const AdminBookingView = () => {
  const { bookings, getBookings } = useHotel();

  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Booking & { room: Room }>(
    {} as any
  );

  useEffect(() => {
    getBookings({});
  }, []);

  return (
    <div className="w-full">
      <div className="col-span-2 w-full p-4">
        <div className="flex justify-between">
          <h2 className="font-bold my-2">Reservaciones</h2>
        </div>

        <ul role="list" className="divide-y  divide-gray-100 w-full my-4">
          {bookings.length ? (
            bookings.map((booking, i) => (
              <li
                onClick={() => {
                  setModalData(booking as any);
                  setIsOpen(true);
                }}
                key={booking.user.name}
                className={`flex rounded-xl justify-between gap-x-6 py-5 px-2 cursor-pointer ${
                  i % 2 ? "bg-gray-200" : ""
                }`}
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {booking.user.name} {booking.user.lastName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {booking.guests.length} huespedes
                    </p>
                  </div>
                  <div>
                    <p className="truncate text-xs leading-5 text-gray-500">
                      Desde: {moment(booking.startDate).format("DD-MM-YYYY")}
                    </p>
                    <p className="truncate text-xs leading-5 text-gray-500">
                      Hasta: {moment(booking.endDate).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {booking.hotel?.name}
                    </p>
                    {booking.room ? (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Habitación: &nbsp;
                        {booking.room.location} - {booking.room.name}
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Online
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h3>Aun no cuenta con reservas disponibles </h3>
          )}
        </ul>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateBookingView
          viewMode
          data={modalData}
          toggleModal={() => {
            setIsOpen((prev) => !prev);

            setModalData({} as any);
          }}
        ></CreateBookingView>
      </Modal>
    </div>
  );
};

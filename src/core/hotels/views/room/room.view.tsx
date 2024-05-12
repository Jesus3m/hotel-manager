"use client";

import { Button } from "@/shared/ui/atoms/button";
import { Modal } from "@/shared/ui/templates/modal/modal.component";
import React, { useEffect, useState } from "react";
import { CreateRoomView } from "./create/create-room.view";
import { Room } from "../../hotel.interfaces";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import { FaEllipsisVertical } from "react-icons/fa6";
import Dropdown from "@/shared/ui/molecules/dropdown";
import { useParams } from "next/navigation";

export const RoomView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Room>({} as Room);

  const { id: _id } = useParams();

  const { hotel, setRoom } = useHotel();

  return (
    <div>
      <div className="col-span-2 w-full p-4">
        <div className="flex justify-between">
          <h2 className="font-bold my-2">Habitaciones</h2>
          <div>
            <Button
              onClick={() => {
                setIsOpen(true);
                window.scrollTo(0, 0);
              }}
            >
              Crear Habitación
            </Button>
          </div>
        </div>

        <ul role="list" className="divide-y divide-gray-100 w-full my-4">
          {hotel.rooms && hotel.rooms.length ? (
            hotel.rooms.map((room) => (
              <li
                key={room.location}
                className={`flex justify-between gap-x-6 py-5 px-2 ${
                  room.status === "disabled"
                    ? "opacity-50 bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {room.location}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {room.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {room.type}
                    </p>
                    {room.cost ? (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Base Cost: &nbsp;
                        {room.cost}$
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
                  <Dropdown
                    options={[
                      {
                        label: "Editar",
                        onClick: () => {
                          setIsOpen(true);
                          setModalData(room);
                        },
                      },
                      {
                        label:
                          room.status === "disabled"
                            ? "Habilitar"
                            : "Deshabilitar",
                        onClick: () => {
                          setRoom({
                            ...room,
                            status:
                              room.status === "disabled"
                                ? "enabled"
                                : "disabled",
                          });
                        },
                      },
                    ]}
                    position={"bottom end"}
                  >
                    {({ active }: any) => (
                      <button
                        className={
                          "rounded-lg p-1 px-2 text-xs text-gray-500 hover:bg-gray-200"
                        }
                      >
                        <FaEllipsisVertical></FaEllipsisVertical>
                      </button>
                    )}
                  </Dropdown>
                </div>
              </li>
            ))
          ) : (
            <h3>Aun no cuenta con habitaciones disponibles para este hotel</h3>
          )}
        </ul>
      </div>
      <Modal
        title="Crear Habitación"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setModalData({} as Room);
        }}
      >
        <CreateRoomView
          data={modalData as Room}
          toggleModal={() => {
            setIsOpen((prev) => !prev);
            setModalData({} as Room);
          }}
        ></CreateRoomView>
      </Modal>
    </div>
  );
};

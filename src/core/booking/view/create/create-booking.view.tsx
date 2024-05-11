import { Input } from "@/shared/ui/atoms/input";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useHotel } from "@/shared/context/hotel/hotel.context";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useSearchParams } from "next/navigation";
import { Booking } from "../../booking.interface";
import { Button } from "@/shared/ui/atoms/button";
import { Room } from "@/core/hotels/hotel.interfaces";
import { useGlobal } from "@/shared/context/global.context";

const schema = yup.object({}).required();

export const CreateBookingView: FC<{
  data: Booking & { room: Room };
  toggleModal: () => void;
}> = ({ data, toggleModal }) => {
  const params = useSearchParams();
  const { setBooking } = useHotel();

  const { isAuth } = useGlobal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
  } = useForm<Booking & { temp: string }>({
    defaultValues: {
      ...data,
      user: isAuth?.user,
    },
    resolver: yupResolver(schema) as any,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const onSubmit = useCallback(
    (booking: Booking) => {
      const room = data.room;
      delete booking.room;
      delete booking.hotel;
      setBooking({
        ...booking,
        hotel_id: room?.hotel_id!,
        room_id: room?._id!,
        guests: booking.guests.filter((x) => x.document),
      });
      toggleModal();
    },
    [data, errors]
  );

  useEffect(() => {
    setValue("startDate", params.get("startDate") as any);
    setValue("endDate", params.get("endDate") as any);
  }, [params]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 py-4 px-2">
        <h3>Datos de reserva</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <Input
            label="Hotel"
            type="text"
            disabled
            error={errors?.hotel?.name?.message}
            {...register("room.hotel.name")}
          />
          <Input
            label="Habitación"
            type="text"
            disabled
            error={errors?.hotel?.name?.message}
            {...register("room.name")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <Input
            label="Desde"
            type="date"
            disabled
            error={errors.startDate?.message}
            placeholder="25/12/2022"
            {...register("startDate")}
          />
          <Input
            label="Hasta"
            type="date"
            disabled
            error={errors.endDate?.message}
            placeholder="29/12/2022"
            {...register("endDate")}
          />
        </div>
        <h3>Datos de contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <Input
            label="Nombre"
            error={errors.user?.name?.message}
            placeholder="Jhon"
            {...register("user.name")}
          />
          <Input
            label="Apellidos"
            error={errors.user?.lastName?.message}
            placeholder="Doe"
            type="textarea"
            {...register("user.lastName")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <Input
            label="Telefono"
            error={errors.user?.phone?.message}
            placeholder="+57 312 345 6789"
            type="input"
            {...register("user.phone")}
          />

          <Input
            label="Email"
            error={errors.user?.email?.message}
            placeholder="hola@hola.com"
            type="email"
            {...register("user.email")}
          />
        </div>

        <h3>Huéspedes</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-2 flex flex-col gap-3 border-2 rounded-lg"
          >
            <div className="w-full flex justify-between">
              <h5>Huesped {index + 1}</h5>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
              >
                x
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <Input
                label="Nombre"
                error={errors.guests?.[index]?.name?.message}
                placeholder="Jhon"
                {...register(`guests.${index}.name`)}
              />
              <Input
                label="Apellidos"
                error={errors.guests?.[index]?.lastname?.message}
                placeholder="Doe"
                {...register(`guests.${index}.lastname`)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <Input
                label="Telefono"
                error={errors.guests?.[index]?.name?.message}
                placeholder="+57 312 345 6789"
                {...register(`guests.${index}.phone`)}
              />
              <Input
                label="Correo"
                error={errors.guests?.[index]?.lastname?.message}
                placeholder="hola@hola.com"
                {...register(`guests.${index}.email`)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <Input
                label="Tipo de documento"
                error={errors.guests?.[index]?.name?.message}
                placeholder="CC"
                {...register(`guests.${index}.documentType`)}
              />
              <Input
                label="documento"
                error={errors.guests?.[index]?.lastname?.message}
                placeholder="12345678"
                {...register(`guests.${index}.document`)}
              />
            </div>
          </div>
        ))}
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              append({} as any);
            }}
          >
            Agregar Huésped
          </Button>
        </div>

        <div className="flex justify-end w-full">
          <button
            style={{ background: "#de1262" }}
            className="p-2 rounded text-white w-max"
            type="submit"
          >
            Guardar Booking
          </button>
        </div>
      </div>
    </form>
  );
};

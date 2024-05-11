import { Input } from "@/shared/ui/atoms/input";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useHotel } from "@/shared/context/hotel/hotel.context";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Room } from "@/core/hotels/hotel.interfaces";
import { useParams } from "next/navigation";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    location: yup
      .string()
      .required("La ubicación de la habitación es requerida"),
    type: yup.string().required("El tipo de habitación es requerido"),
  })
  .required();

export const CreateRoomView: FC<{
  data: Room;
  toggleModal: () => void;
}> = ({ data, toggleModal }) => {
  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
    unregister,
  } = useForm<Room & { temp: string }>({
    defaultValues: { ...data },
    resolver: yupResolver(schema) as any,
  });

  const { setRoom } = useHotel();

  const { id } = useParams();

  const onSubmit = useCallback(
    (room: Room) => {
      if (!Object.entries(errors).length) {
        setRoom({ ...room, hotel_id: id as string });
      }
      toggleModal();
    },
    [data, errors]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 py-4 px-2">
        <h3>Datos generales</h3>
        <Input
          label="Nombre del room"
          error={errors.name?.message}
          placeholder="Habitación Presidencial"
          {...register("name")}
        />
        <Input
          label="Ubicación"
          error={errors.location?.message}
          placeholder="11B"
          type="textarea"
          {...register("location")}
        />

        <Input
          label="Tipo"
          error={errors.type?.message}
          placeholder="Premium"
          type="input"
          {...register("type")}
        />

        <Input
          label="Cantidad de huéspedes permitidos"
          error={errors.allowedGuests?.message}
          placeholder="5"
          type="number"
          {...register("allowedGuests")}
        />

        <h3>Costos</h3>
        <Input
          label="Costo Base"
          placeholder="5500"
          type="number"
          error={errors.cost?.message}
          {...register("cost")}
        />

        <Input
          label="Impuesto"
          error={errors.taxes?.message}
          placeholder="2.99"
          type="number"
          {...register("taxes")}
        />

        <div className="flex justify-end w-full">
          <button
            style={{ background: "#de1262" }}
            className="p-2 rounded text-white w-max"
            type="submit"
          >
            Guardar Room
          </button>
        </div>
      </div>
    </form>
  );
};

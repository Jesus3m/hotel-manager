import { Input } from "@/shared/ui/atoms/input";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { Hotel } from "../hotel.interfaces";
import { useHotel } from "@/shared/context/hotel/hotel.context";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    location: yup.object().shape({
      city: yup.string().required("La ciudad es requerida"),
      state: yup.string().required("El estado es requerido"),
      country: yup.string().required("El país es requerido"),
      street: yup.string().required("La calle es requerida"),
    }),
    image: yup
      .string()
      .matches(
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
        "La imagen debe ser una url valida"
      ),
    category: yup.string(),
  })
  .required();

export const CreateHotelView: FC<{ data: Hotel; toggleModal: () => void }> = ({
  data,
  toggleModal,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<Hotel>({
    defaultValues: data,
    resolver: yupResolver(schema) as any,
  });

  const { create } = useHotel();

  const handleAddImage = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const values = getValues();
      try {
        const validate =
          /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
            values.image as unknown as string
          );
        if (!validate) return;
        setImages((prev) => [...prev, values.image as unknown as string]);
        setValue(`image`, "" as unknown as string[]);
      } catch (error) {
        console.log(error);
        return;
      }
    },
    [errors]
  );

  useEffect(() => {
    if (data?.image?.length) {
      setImages(data.image);
    }
  }, [data]);

  const onSubmit = useCallback(
    (data: Hotel) => {
      console.log(errors);
      if (!errors) {
        const form = {
          ...data,
          id: nanoid(),
          image: images,
        };
        create(form);
        toggleModal();
      }
    },
    [images, data, errors]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 py-4 px-2">
        <h3>Datos generales</h3>
        <Input
          label="Nombre del hotel"
          error={errors.name?.message}
          placeholder="Colombia"
          {...register("name")}
        />
        <h3>Ubicación</h3>
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="País"
            error={errors.location?.country?.message}
            placeholder="Colombia"
            {...register("location.country")}
          />
          <Input
            label="Departamento"
            placeholder="Bogota"
            error={errors.location?.state?.message}
            {...register("location.state")}
          />
          <Input
            label="Ciudad"
            placeholder="San Federico"
            error={errors.location?.city?.message}
            {...register("location.city")}
          />
          <Input
            label="Dirección"
            placeholder="Calle 123"
            className="col-span-3"
            error={errors.location?.street?.message}
            {...register("location.street")}
          />
        </div>
        <h3>Categorías</h3>
        <div className=" w-full">
          <Input
            type="tag"
            label="Categoría"
            placeholder="Agregue sus Categorías"
            error={errors.category?.message}
            {...register("category")}
          />
        </div>
        <h3>Galería</h3>
        <div className="flex gap-3 w-full">
          <Input
            label="Imagen"
            placeholder="Agregar url de la imagen"
            className="w-3/4"
            error={errors.image?.message}
            {...register("image")}
          />
          <button
            className="p-2 rounded text-white flex justify-center items-center text-2xl w-1/4"
            style={{ background: "#de1262" }}
            onClick={handleAddImage}
          >
            +
          </button>
        </div>
        <div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
          >
            {images.map((image) => (
              <SwiperSlide key={nanoid()}>
                <img src={image} className="m-auto w-[50%] object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-end w-full">
          <button
            style={{ background: "#de1262" }}
            className="p-2 rounded text-white w-max"
            type="submit"
          >
            Guardar Hotel
          </button>
        </div>
      </div>
    </form>
  );
};

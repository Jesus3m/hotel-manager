// @ts-ignore;
import { Input } from "@/shared/ui/atoms/input";
import React, {
  FC,
  FormEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { Hotel } from "../../hotel.interfaces";
import { useHotel } from "@/shared/context/hotel/hotel.context";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateHotel } from "./createHotel.hook";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    description: yup.string(),
    location: yup.object().shape({
      city: yup.string().required("La ciudad es requerida"),
      state: yup.string().required("El estado es requerido"),
      country: yup.string().required("El país es requerido"),
      street: yup.string().required("La calle es requerida"),
    }),
    image: yup.array(
      yup
        .string()
        .matches(
          /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
          "La imagen debe ser una url valida"
        )
    ),
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
    resetField,
    formState: { errors, isValid },
    watch,
  } = useForm<Hotel & { temp: string }>({
    defaultValues: { ...data },
    resolver: yupResolver(schema) as any,
  });

  const { cities, states, onSelectState } = useCreateHotel();
  const { create, update } = useHotel();

  const handleAddImage = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const values = getValues();
      const validate =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
          values.temp as unknown as string
        );
      if (!validate) return;
      setImages((prev) => [...prev, values.temp as unknown as string]);
      resetField(`temp`);
    },
    [errors]
  );

  useEffect(() => {
    if (data?.image?.length) {
      setImages(data.image);
    }
  }, [data]);

  const onSubmit = useCallback(
    (hotel: Hotel) => {
      if (!Object.entries(errors).length) {
        if (data._id) {
          const form = {
            ...hotel,
            image: images,
          };

          update(data._id, form);
        } else {
          const form = {
            ...hotel,
            image: images,
          };
          create(form);
        }
      }
      toggleModal();
    },
    [images, data, errors]
  );

  useEffect(() => {
    onSelectState(getValues("location.state"));
  }, [watch("location.state"), getValues]);

  const handleCategory = (e: any) => {
    if (e.key === "Enter" || e.key === ",") {
      (e as FormEvent<HTMLInputElement>).preventDefault();
      console.log(e.target.value);
      setValue("category", [...(getValues("category") || []), e.target.value]);
      e.currentTarget.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 py-4 px-2 text-gray-800">
        <h3>Datos generales</h3>
        <Input
          label="Nombre del hotel"
          error={errors.name?.message}
          placeholder="Colombia"
          {...register("name")}
        />
        <Input
          label="descripción del hotel"
          error={errors.name?.message}
          placeholder="Este hotel 6 estrellas tiene 50 habitaciones de la mas alta calidad"
          type="textarea"
          {...register("description")}
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
            type="select"
            options={states?.map((state: any) => ({
              label: state.name,
              value: state.name,
            }))}
            error={errors.location?.state?.message}
            {...register("location.state")}
          />
          <Input
            label="Ciudad"
            placeholder="San Federico"
            error={errors.location?.city?.message}
            type="select"
            options={cities?.map((city: any) => ({
              label: city,
              value: city,
            }))}
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
            placeholder="Agregue sus Categorías (Separadas por coma o enter)"
            error={errors.category?.message}
            onChange={handleCategory}
            onKeyDown={handleCategory}
          />
          <div className="flex mt-2 gap-1 ">
            {watch("category")?.map((category) => (
              <span
                className="p-1 w-fit rounded bg-slate-200"
                key={nanoid()}
                onClick={() =>
                  setValue(
                    "category",
                    getValues("category")?.filter((c) => c !== category)
                  )
                }
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <h3>Galería</h3>
        <div className="flex gap-3 w-full">
          <Input
            label="Imagen"
            placeholder="Agregar url de la imagen"
            className="w-3/4"
            error={errors.image?.message}
            {...register("temp")}
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
            className="relative h-80 flex justify-center items-center rounded-xl m-auto"
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
          >
            {images.map((image) => (
              <SwiperSlide key={nanoid()}>
                <button
                  className="absolute right-0 top-0 bg-gray-200 p-2 rounded"
                  onClick={() =>
                    setImages((prev) => prev.filter((i) => i !== image))
                  }
                >
                  Eliminar
                </button>
                <img
                  src={image}
                  className="rounded-xl w-full h-full object-contain object-center"
                />
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

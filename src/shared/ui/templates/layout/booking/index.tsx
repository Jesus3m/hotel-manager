"use client";
import { Location } from "@/core/hotels/hotel.interfaces";
import { useHotel } from "@/shared/context/hotel/hotel.context";
import React, { useEffect, useState } from "react";
import { FaSistrix } from "react-icons/fa6";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import { colombia } from "@/shared/services/colombia";

const schema = yup
  .object({
    location: yup.string().required("La ubicación es requerida"),
    startDate: yup
      .date()
      .min(new Date(), "La fecha de entrada no puede ser menor de hoy")
      .required("Fecha es requerida"),
    endDate: yup
      .date()
      .min(
        yup.ref("startDate"),
        "La fecha de salida no puede ser menor que la de ingreso"
      )
      .required("Fecha es requerida"),
    guests: yup
      .number()
      .min(1, "El número de personas debe ser mayor a 0")
      .required("El número de personas es requerido"),
  })
  .required();
const inputs = [
  {
    placeholder: "Explora destinos",
    key: 1,
    type: "text",
    label: "Donde",
    name: "location",
    autocomplete: true,
  },
  {
    placeholder: "dd/mm/yyy",
    key: 2,
    type: "date",
    name: "startDate",
    label: "Llegada",
  },
  {
    placeholder: "dd/mm/yyy",
    key: 3,
    type: "date",
    name: "endDate",
    label: "Salida",
  },
  {
    placeholder: "Cuantos?",
    key: 4,
    type: "number",
    name: "guests",
    label: "Personas",
  },
];

export const Booking = () => {
  const { push } = useRouter();
  const params = useSearchParams();

  const [cities, setCities] = useState(
    colombia
      .map((x) => x.ciudades)
      .flat(2)
      .map((x) => ({ name: x, id: nanoid() }))
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: params.get("location")!,
      startDate: moment(params.get("startDate") || undefined)
        .add(1, "days")
        .format("YYYY-MM-DD") as unknown as Date,
      endDate: moment(params.get("endDate") || undefined)
        .add(2, "days")
        .format("YYYY-MM-DD") as unknown as Date,
      guests: Number(params.get("guests"))!,
    },
    resolver: yupResolver(schema),
  });

  const handleFilter = (filter: any) => {
    push(
      `/booking?location=${filter.location}&startDate=${moment(
        filter.startDate
      ).format("YYYY-MM-DD")}&endDate=${moment(filter.endDate).format(
        "YYYY-MM-DD"
      )}&guests=${filter.guests}`
    );
  };

  const handleOnSelect = (item: any) => {
    setValue("location", item.name);
  };

  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFilter)}>
        <div className="w-4/5 m-auto flex flex-col justify-between items-end px-2 py-2 rounded shadow-none md:shadow-lg md:flex-row gap-4">
          {inputs.map((input) =>
            !input.autocomplete ? (
              <div key={input.key} className="relative w-full">
                <label
                  className="absolute font-bold text-xs translate-y-[-10px]"
                  key={input.key}
                >
                  {input.label}
                </label>
                <input
                  className="bg-gray-50 md:bg-white p-2 md:p-1 outline-none w-full shadow-sm md:shadow-none "
                  type={input.type}
                  placeholder={input.placeholder}
                  {...register(input.name as any)}
                />
              </div>
            ) : (
              <ReactSearchAutocomplete
                key={input.key}
                items={cities}
                className="w-full border-none z-10"
                placeholder="Donde?"
                styling={{
                  borderRadius: "0px",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "white",
                }}
                onSelect={handleOnSelect}
                formatResult={formatResult}
              />
            )
          )}
          <button
            className="p-2 w-full md:w-10 rounded text-white flex justify-center items-center text-2xl"
            style={{ background: "#de1262" }}
          >
            <FaSistrix />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              reset({
                endDate: "" as unknown as Date,
                location: "",
                guests: 0,
                startDate: "" as unknown as Date,
              });
              push("/booking");
            }}
            className="p-2 w-full md:w-10 rounded text-white flex justify-center items-center text-2xl"
            style={{ background: "#de1262" }}
          >
            <FaRegTrashCan />
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-2">
        {Object.values(errors).map((error) => (
          <span key={error.message} className="text-red-500">
            {error.message}
          </span>
        ))}
      </div>
      <div className=" bg-gray-300 h-0.5 m-5"></div>
    </>
  );
};

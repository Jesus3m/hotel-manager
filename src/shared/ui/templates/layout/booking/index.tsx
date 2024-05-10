import React from "react";
import { FaSistrix } from "react-icons/fa6";

const inputs = [
  {
    placeholder: "Explora destinos",
    key: 1,
    label: "Donde",
  },
  {
    placeholder: "dd/mm/yyy",
    key: 2,
    label: "Llegada",
  },
  {
    placeholder: "dd/mm/yyy",
    key: 3,
    label: "Salida",
  },
  {
    placeholder: "Cuantos?",
    key: 4,
    label: "Personas",
  },
];
export const Booking = () => {
  return (
    <>
      {/* <div className="w-4/5 m-auto flex justify-between items-end px-2 py-2 rounded shadow-lg">
        {inputs.map((input) => (
          <div key={input.key} className="relative">
            <label
              className="absolute font-bold text-xs translate-y-[-10px]"
              key={input.key}
            >
              {input.label}
            </label>
            <input
              className="p-1 outline-none w-full"
              type="text"
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <button
          className="p-2 w-10 rounded text-white flex justify-center items-center text-2xl"
          style={{ background: "#de1262" }}
        >
          <FaSistrix />
        </button>
      </div> */}
      <div className=" bg-gray-300 h-0.5 m-5"></div>
    </>
  );
};

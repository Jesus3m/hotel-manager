import React, { forwardRef, InputHTMLAttributes, Ref } from "react";

export const Input: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    options?: { value: string; label: string }[];
  }
> = forwardRef(function MyInput(props, ref: Ref<HTMLInputElement>) {
  return (
    <label htmlFor={props.name} className={`${props.className} relative`}>
      <span className="absolute text-xs mx-2 mt-1 text-gray-700">
        {props.label}
      </span>
      {props.type === "select" && (
        <select
          {...(props as any)}
          ref={ref as any}
          className={`${props.className} w-full outline-none border-none rounded-md bg-gray-100 p-2 pt-5`}
        >
          {props?.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {props.type !== "select" && (
        <input
          {...props}
          ref={ref}
          className={`${props.className} w-full outline-none border-none rounded-md bg-gray-100 p-2 pt-5`}
        />
      )}
      <span className="text-red-500 text-xs">{props.error}</span>
    </label>
  );
});

import React, { forwardRef, InputHTMLAttributes, Ref } from "react";

export const Input: React.FC<
  InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
> = forwardRef(function MyInput(props, ref: Ref<HTMLInputElement>) {
  return (
    <label htmlFor={props.name} className={`${props.className} relative`}>
      <span className="absolute text-xs mx-2 mt-1">{props.label}</span>

      <input
        {...props}
        ref={ref}
        className={`${props.className} w-full outline-none border-none rounded-md bg-gray-100 p-2 pt-5`}
      />
      <span className="text-red-500 text-xs">{props.error}</span>
    </label>
  );
});

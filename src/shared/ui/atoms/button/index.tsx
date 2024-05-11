import React, { ButtonHTMLAttributes, FC, FormEvent } from "react";

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
> = ({ children, onClick, ...props }) => {
  return (
    <button
      {...props}
      className={`p-2 shadow-xl rounded text-white flex justify-center items-center ${props.className}`}
      style={{ background: "#de1262" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

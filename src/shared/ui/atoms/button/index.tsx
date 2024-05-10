import React, { FormEvent } from "react";

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: FormEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      className="p-2 shadow-xl rounded text-white flex justify-center items-center"
      style={{ background: "#de1262" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import React, { FC } from "react";
import { Navigation } from "./navigation";
import { Booking } from "./booking";

export const Layout: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <main>
      <Navigation />
      <Booking />
      {children}
    </main>
  );
};

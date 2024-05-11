import React, { FC } from "react";
import { Navigation } from "./navigation";
import { Booking } from "./booking";
import { useGlobal } from "@/shared/context/global.context";

export const Layout: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const { isAuth } = useGlobal();
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
};

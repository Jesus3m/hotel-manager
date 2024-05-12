import React, { FC } from "react";
import { Navigation } from "./navigation";
import { Booking } from "./booking";
import { useGlobal } from "@/shared/context/global.context";
import { motion } from "framer-motion";

export const Layout: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const { isAuth } = useGlobal();
  return (
    <motion.main
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0, x: -0 }}
      transition={{ type: "spring" }}
    >
      <Navigation />
      {children}
    </motion.main>
  );
};

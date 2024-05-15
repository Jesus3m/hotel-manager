import { colombia } from "@/shared/services/colombia";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

export const useCreateHotel = () => {
  const [states, setStates] = useState(colombia);
  const [cities, setCities] = useState<any>();

  const onSelectState = (state: string) => {
    setCities(colombia.find((x) => x.name === state)?.ciudades);
  };

  return {
    cities,
    states,
    onSelectState,
  };
};

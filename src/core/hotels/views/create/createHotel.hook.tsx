import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export const useCreateHotel = () => {
  const { data: cities } = useQuery(
    "cities",
    async () => (await axios.get("https://api-colombia.com/api/v1/City")).data,
    {}
  );

  const { data: states } = useQuery(
    "states",
    async () =>
      (await axios.get("https://api-colombia.com/api/v1/Department")).data,
    {}
  );

  return {
    cities,
    states,
  };
};

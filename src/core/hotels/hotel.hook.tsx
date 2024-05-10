import { useHotel } from "@/shared/context/hotel/hotel.context";
import { hotels } from "@/shared/services/hotel/consts";
import { useEffect, useState } from "react";

export const useHotelView = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const categories = new Array(
      ...(new Set([
        ...hotels.map((hotel) => hotel.category || []).flat(2),
      ]) as unknown as string[])
    );
    setCategories(categories);
  }, [hotels]);
  return {
    categories,
  };
};

import { useHotel } from "@/shared/context/hotel/hotel.context";
import { useEffect, useState } from "react";

export const useHotelView = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { hotels } = useHotel();

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

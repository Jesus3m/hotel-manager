import React from "react";
import { nanoid } from "nanoid";
import {
  FaAnchor,
  FaAddressBook,
  FaAirbnb,
  FaAngleRight,
  FaAdn,
  FaAdversal,
  FaAlgolia,
  FaAudioDescription,
  FaBatteryEmpty,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import { useHotelView } from "../../hotel.hook";
import { useHotel } from "@/shared/context/hotel/hotel.context";

const Icons = [
  FaAnchor,
  FaAddressBook,
  FaAirbnb,
  FaAngleRight,
  FaAdn,
  FaAdversal,
  FaAlgolia,
  FaAudioDescription,
  FaBatteryEmpty,
];
export const CategorySlide = () => {
  const { categories } = useHotelView();
  const { getHotels } = useHotel();

  const getIcon = (category: string) => {
    const Icon = Icons[(Math.random() * Icons.length) | 0];
    return <Icon />;
  };

  const handleClick = (category: string) => {
    if (category === "Todos") {
      getHotels();
      return;
    }
    getHotels({ category });
  };
  return (
    <section className="flex gap-4 w-full px-12 h-10">
      <Swiper
        className="w-full"
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        a11y={{ enabled: true }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          912: {
            slidesPerView: 4,
          },
        }}
        navigation
      >
        <SwiperSlide key={nanoid()}>
          <div
            className="flex gap-1 text-center flex-col items-center text-gray-700 hover:text-black cursor-pointer text-ellipsis h-1"
            onClick={() => handleClick("Todos")}
          >
            <span>{getIcon("All")}</span>
            <span>{"Todos"}</span>
          </div>
        </SwiperSlide>
        {categories.map((category) => (
          <SwiperSlide key={nanoid()}>
            <div
              className="flex gap-1 text-center flex-col items-center text-gray-700 hover:text-black cursor-pointer text-ellipsis h-1"
              onClick={() => handleClick(category)}
            >
              <span>{getIcon(category)}</span>
              <span>{category}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

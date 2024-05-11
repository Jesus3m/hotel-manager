import React from "react";
import { nanoid } from "nanoid";
import {
  FaAnchor,
  FaAddressBook,
  FaAirbnb,
  FaAdn,
  FaAdversal,
  FaAlgolia,
  FaAudioDescription,
  FaBatteryEmpty,
} from "react-icons/fa";
import * as IconsGallery from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import { useHotel } from "@/shared/context/hotel/hotel.context";

const Icons = Object.entries(IconsGallery)
  .slice(0, 100)
  .map((x) => x[1]);

const getIcon = (i: number) => {
  const Icon = Icons[i];
  return <Icon />;
};

export const CategorySlide = () => {
  const { getHotels, categories } = useHotel();

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
            <span>{getIcon(1)}</span>
            <span>{"Todos"}</span>
          </div>
        </SwiperSlide>
        {categories?.map((category, i) => (
          <SwiperSlide key={nanoid()}>
            <div
              className="flex gap-1 text-center flex-col items-center text-gray-700 hover:text-black cursor-pointer text-ellipsis h-1"
              onClick={() => handleClick(category)}
            >
              <span>{getIcon(i)}</span>
              <span>{category._id}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

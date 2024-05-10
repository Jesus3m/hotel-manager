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
import { Navigation } from "swiper/modules";
import { useHotelView } from "../../hotel.hook";

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

  const getIcon = (category: string) => {
    const Icon = Icons[(Math.random() * Icons.length) | 0];
    return <Icon />;
  };
  return (
    <section className="flex gap-4 w-full px-12 h-10">
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
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
        {categories.map((category) => (
          <SwiperSlide key={nanoid()}>
            <div className="flex gap-1 text-center flex-col items-center text-gray-700 hover:text-black cursor-pointer text-ellipsis h-1">
              <span>{getIcon(category)}</span>
              <span>{category}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

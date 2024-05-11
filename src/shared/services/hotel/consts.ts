import { Hotel } from "@/core/hotels/hotel.interfaces";

export const hotels: Hotel[] = [
  {
    name: "Hotel 1",
    _id: "1",
    image: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyMzIwMTE1Njc3Njg0MTIzOQ%3D%3D/original/fb9dcb8d-7fa5-402f-91ae-fa2a26e9f097.png?im_w=1440&im_q=highq",
      "https://static.gettyimages.com/display-sets/creative-landing/images/GettyImages-1448734171.jpg",
    ],
    location: {
      city: "Bogota",
      state: "Bogota",
      country: "Colombia",
      street: "Calle 1",
    },
    rooms: [
      {
        name: "Premium",
        type: "Premiun",
        location: "11V",
        cost: 2000,
        taxes: 2.0,
        _id: "2312",
        allowedGuests: 10,
      },
    ],
    category: ["Iconico", "Cabaña", "5 Estrellas"],
  },
  {
    name: "Hotel 2",
    _id: "2",
    image: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjI0NzUwMDUwMTg2Mzg5MA%3D%3D/original/99417998-fa44-4c75-ae77-287c1468977b.jpeg?im_w=1440&im_q=highq",
    ],
    location: {
      city: "Medellin",
      state: "Antioquia",
      country: "Colombia",
      street: "Calle 2",
    },
    rooms: [
      {
        name: "Premium",
        type: "Premiun",
        location: "11V",
        cost: 2000,
        taxes: 2.0,
        _id: "2312",
        allowedGuests: 8,
      },
    ],
    category: ["Playa", "Piscina", "Cabaña"],
  },
  {
    name: "Hotel 3",
    _id: "3",
    image: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NzY0ODgzNzUzNjQzNw%3D%3D/original/cda19e4c-ae11-47b1-831b-a29f94ab76dc.png?im_w=1440&im_q=highq",
    ],
    location: {
      city: "Cali",
      state: "Valle del Cauca",
      country: "Colombia",
      street: "Calle 3",
    },
    rooms: [
      {
        name: "Premium",
        type: "Premiun",
        location: "11V",
        cost: 2000,
        taxes: 2.0,
        _id: "2312",
        allowedGuests: 5,
      },
    ],
    category: ["5 Estrellas"],
  },
  {
    name: "Hotel 4",
    _id: "4",
    image: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4MzUyMzk5Mjc3MDU5Nw%3D%3D/original/d62c78db-3c98-46e7-8566-d685d5c689f3.png?im_w=1440&im_q=highq",
    ],

    location: {
      city: "Cartagena",
      state: "Bolivar",
      country: "Colombia",
      street: "Calle 4",
    },
    category: ["Minicasas"],
  },
  {
    name: "Hotel 5",
    _id: "5",
    image: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/e6b26733-2c15-47d9-b097-6968b39bb697.jpeg?im_w=1440&im_q=highq",
    ],

    location: {
      city: "Manizales",
      state: "Caldas",
      country: "Colombia",
      street: "Calle 5",
    },
    category: ["Campo", "Finca"],
  },
  {
    name: "Hotel 6",
    _id: "6",
    image: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NjI3OTI1MjIxNDQyOA%3D%3D/original/bc989f2d-eca8-4bcf-a9b0-b70b8e685a64.jpeg?im_w=1440&im_q=highq",
    ],
    category: ["5 Estrellas"],
    location: {
      city: "Barranquilla",
      state: "Atlantico",
      country: "Colombia",
      street: "Calle 6",
    },
  },
  {
    name: "Hotel 7",
    _id: "7",
    image: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NjI3OTI1MjIxNDQyOA%3D%3D/original/bc989f2d-eca8-4bcf-a9b0-b70b8e685a64.jpeg?im_w=1440&im_q=highq",
    ],
    category: ["5 Estrellas"],
    location: {
      city: "Barranquilla",
      state: "Atlantico",
      country: "Colombia",
      street: "Calle 6",
    },
  },
  {
    name: "Hotel 8",
    _id: "8",
    image: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4MzUyMzk5Mjc3MDU5Nw%3D%3D/original/d62c78db-3c98-46e7-8566-d685d5c689f3.png?im_w=1440&im_q=highq",
    ],

    location: {
      city: "Cartagena",
      state: "Bolivar",
      country: "Colombia",
      street: "Calle 4",
    },
    category: ["Playa"],
  },
];

"use client";
import { useGlobal } from "@/shared/context/global.context";
import { Button } from "@/shared/ui/atoms/button";
import Dropdown from "@/shared/ui/molecules/dropdown";
import Link from "next/link";
import React from "react";

const routes = [
  {
    path: "/",
    name: "Hoteles",
  },
  {
    path: "/booking",
    name: "Reservas",
  },
];

export const Navigation = () => {
  const { isAuth, logout } = useGlobal();
  return (
    <nav className="flex justify-between bg-white p-4 gap-2 border-b-2 mb-4">
      <div>
        <Link href={"/"} className="font-bold" style={{ color: "#de1262" }}>
          Hotel Manager
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2">
          {isAuth?.role === "admin" &&
            routes.map((route) => (
              <Link
                className="hover:bg-slate-100 hover:text-slate-950 py-2 px-5 rounded"
                href={route.path}
                key={route.path}
              >
                {route.name}
              </Link>
            ))}
        </div>
        {isAuth ? (
          <Dropdown
            options={[
              {
                label: `${isAuth?.user?.name} ${isAuth?.user?.lastName}`,
              },
              {
                label: "Cerrar sesion",
                onClick: () => {
                  logout();
                },
              },
            ]}
            position={"bottom end"}
          >
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </Dropdown>
        ) : (
          <Link href={"/auth/login"}>
            <Button>Iniciar sesion</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

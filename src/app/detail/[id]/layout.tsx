"use client";
import { useGlobal } from "@/shared/context/global.context";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id: _id } = useParams();
  const { isAuth } = useGlobal();
  return (
    <div>
      {isAuth?.role === "admin" && (
        <div className="grid grid-cols-3 gap-4 w-3/4 m-auto border-b-2 pb-4 text-center">
          <Link href={`/detail/${_id}`}>Detalles</Link>
          <Link href={`/detail/${_id}/booking`}>Reservas</Link>
          <Link href={`/detail/${_id}/rooms`}>Habitaciones</Link>
        </div>
      )}
      {children}
    </div>
  );
}

"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 w-3/4 m-auto border-b-2 pb-4 text-center">
        <Link href={`/detail/${id}`}>Detalles</Link>
        <Link href={`/detail/${id}/booking`}>Reservas</Link>
        <Link href={`/detail/${id}/rooms`}>Habitaciones</Link>
      </div>
      {children}
    </div>
  );
}

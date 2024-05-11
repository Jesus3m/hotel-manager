"use client";
import { HotelView } from "@/core/hotels/hotel.view";
import { useGlobal } from "@/shared/context/global.context";
import { Button } from "@/shared/ui/atoms/button";
import { Input } from "@/shared/ui/atoms/input";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register: registerUser } = useGlobal();
  const { handleSubmit, register } = useForm();
  return (
    <section className=" dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-5rem)] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crea una cuenta!
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(registerUser)}
            >
              <div className="grid grid-cols-2 gap-1">
                <Input
                  type="text"
                  label="Tu nombre"
                  placeholder="John"
                  {...register("name")}
                />
                <Input
                  type="text"
                  label="Tu apellido"
                  placeholder="Doe"
                  {...register("lastName")}
                />
              </div>
              <div>
                <Input
                  type="email"
                  id="email"
                  label="Tu email"
                  placeholder="name@company.com"
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  type="password"
                  label="Tu contraseña"
                  id="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  label="Confirma tu contraseña"
                  id="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...register("terms")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Acepto los{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      terminos y condiciones
                    </a>
                  </label>
                </div>
              </div>
              <Button className="w-full" type="submit">
                Iniciar!
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Inicia Sesión aca!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useGlobal } from "@/shared/context/global.context";
import { Button } from "@/shared/ui/atoms/button";
import { Input } from "@/shared/ui/atoms/input";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Login() {
  const { login } = useGlobal();
  const { handleSubmit, register } = useForm();
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-5rem)] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Inicia Sesion!
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(login)}
            >
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

              <Button className="w-full" type="submit">
                Iniciar!
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                No tienes una cuenta?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Crear una aca
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

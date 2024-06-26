"use client";
import { useGlobal } from "@/shared/context/global.context";
import { Button } from "@/shared/ui/atoms/button";
import { Input } from "@/shared/ui/atoms/input";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    role: yup.string().required("El role es requerido"),
    lastName: yup.string().required("El apellido es requerido"),
    email: yup.string().required("El email es requerido"),
    password: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida")
      .required("La contraseña es requerida"),
    terms: yup.bool().oneOf([true], "Debes aceptar los términos y condiciones"),
  })
  .required();
export default function Register() {
  const { register: registerUser } = useGlobal();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-5rem)] lg:py-0">
        <div className="w-fullbg-white rounded-lg shadow  md:mt-0 sm:max-w-lg xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Crea una cuenta!
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(registerUser)}
            >
              <div className="grid grid-cols-1 gap-1">
                <Input
                  type="select"
                  label="Como quieres registrarte?"
                  placeholder="Huesped"
                  options={[
                    {
                      label: "Huesped",
                      value: "guest",
                    },
                    {
                      label: "Manager",
                      value: "admin",
                    },
                  ]}
                  error={errors.name?.message}
                  {...register("role")}
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Input
                  type="text"
                  label="Tu nombre"
                  placeholder="John"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <Input
                  type="text"
                  label="Tu apellido"
                  placeholder="Doe"
                  error={errors.lastName?.message}
                  {...register("lastName")}
                />
              </div>
              <div>
                <Input
                  type="email"
                  id="email"
                  label="Tu email"
                  placeholder="name@company.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  type="password"
                  label="Tu contraseña"
                  id="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
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
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300dark:focus:ring-primary-60"
                    {...register("terms")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    Acepto los{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline"
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
              <p className="text-sm font-light text-gray-500 ">
                Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary-600 hover:underline"
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

"use client";
import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import userService from "../services/user/user.service";
import { useRouter } from "next/navigation";
interface GlobalContext {
  isAuth: Record<string, any> | null;
  register: (data: any) => void;
  login: (data: any) => void;
  logout: () => void;
}

export const globalContext = React.createContext<GlobalContext>({
  isAuth: null,
  register: () => {},
  login: () => {},
  logout: () => {},
});
export const useGlobal = () => {
  return useContext(globalContext);
};

export const GlobalProvider: FC<Readonly<{ children: ReactNode }>> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<Record<string, string> | null>(null);
  const router = useRouter();
  const { mutate: register } = useMutation(userService.create);
  const { mutate: login } = useMutation(userService.login, {
    onSuccess: (data: Record<string, any>) => {
      setIsAuth(data.data);
      router.push("/");
    },
  });

  const logout = () => {
    setIsAuth(null);
  };

  return (
    <globalContext.Provider
      value={{
        isAuth,
        register,
        login,
        logout,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

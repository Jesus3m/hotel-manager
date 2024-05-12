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
  const { mutate: register } = useMutation(userService.create, {
    onSuccess: () => {
      router.push("/auth/login");
    },
  });
  const { mutate: refresh, data: userAuth } = useMutation(
    userService.getUserAuth
  );
  const { mutate: login } = useMutation(userService.login, {
    onSuccess: (data: Record<string, any>) => {
      setIsAuth(data.data);
      localStorage.setItem("token", data.data.token);
      if (data.data.user.role === "admin") {
        router.push("/");
      } else {
        router.push("/booking");
      }
    },
  });

  const logout = () => {
    localStorage.clear();
    setIsAuth(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refresh({ token });
    }
  }, []);

  useEffect(() => {
    if (userAuth?.data) {
      setIsAuth(userAuth?.data);
    }
  }, [userAuth]);

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

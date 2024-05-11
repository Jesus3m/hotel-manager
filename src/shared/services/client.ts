import axios from "axios";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

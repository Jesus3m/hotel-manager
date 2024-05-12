import { Hotel } from "@/core/hotels/hotel.interfaces";
import Service from "../_generic/generic.services";
import { AxiosClient } from "../client";
import { Result } from "../_generic/generic.types";

export class UserService extends Service<any> {
  async create(data: any, params?: any): Promise<Result<any>> {
    const response = await AxiosClient.post("/user", data);
    await AxiosClient.post("/auth/invite", {
      user: data.email,
      password: data.password,
      role: data.role,
    });
    return response.data;
  }
  async login(data: any, params?: any): Promise<Result<any>> {
    const response = await AxiosClient.post("/auth/signin", {
      user: data.email,
      password: data.password,
    });

    return response.data;
  }

  async getUserAuth(data: any, params?: any): Promise<Result<any>> {
    const response = await AxiosClient.get(`/auth/logged?token=${data.token}`);

    return response.data;
  }
}

export default new UserService("/auth");

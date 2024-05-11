import { AxiosClient } from "../client";
import { Result, ResultWithPagination } from "./generic.types";

class Service<T> {
  public service: string;

  constructor(service: string) {
    this.service = service;
    this.get = this.get.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findByParams = this.findByParams.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async get(_id?: string) {
    if (!_id) return;

    const res = await AxiosClient.get<Result<T>>(`${this.service}/${_id}`);
    return res.data;
  }

  async getBy(params?: any) {
    const res = await AxiosClient.get<Result<T>>(`${this.service}/by`, {
      params,
    });
    return res.data;
  }

  async findAll(params?: any) {
    const res = await AxiosClient.get<ResultWithPagination<T[]>>(this.service, {
      params,
    });
    return res.data;
  }

  async findByParams(params?: any) {
    const res = await AxiosClient.get<Result<T[]>>(`${this.service}/by?`, {
      params,
    });
    return res.data;
  }

  async create(data: any, params?: any) {
    const res = await AxiosClient.post<Result<T>>(this.service, data, {
      params,
    });
    return res.data;
  }

  async update(_id?: string, data?: any, params?: any) {
    delete data._id;
    const res = await AxiosClient.put<Result<T>>(
      `${this.service}/${_id}`,
      data,
      {
        params: { ...params, _id: undefined },
      }
    );
    return res.data;
  }

  async remove(_id?: string) {
    const res = await AxiosClient.delete<Result<T>>(`${this.service}/${_id}`);
    return res.data;
  }
}

export default Service;

import axios from "@/lib/axios";
import {
  IService,
  IAuthResponse,
  ILoginCredentials,
  IRegisterData,
} from "@/types";
import { AxiosResponse } from "axios";

export const serviceApi = {
  getAllServices: (): Promise<AxiosResponse<IService[]>> =>
    axios.get("/services"),

  getServiceById: (id: string): Promise<AxiosResponse<IService>> =>
    axios.get(`/services/${id}`),

  createService: (
    serviceData: Omit<IService, "_id" | "createdAt" | "updatedAt">
  ): Promise<AxiosResponse<IService>> => axios.post("/services", serviceData),

  updateService: (
    id: string,
    serviceData: Partial<IService>
  ): Promise<AxiosResponse<IService>> =>
    axios.put(`/services/${id}`, serviceData),

  deleteService: (id: string): Promise<AxiosResponse<{ message: string }>> =>
    axios.delete(`/services/${id}`),

  getServicesByCategory: (
    category: IService["category"]
  ): Promise<AxiosResponse<IService[]>> =>
    axios.get(`/services/category/${category}`),
};

export const authApi = {
  login: (
    credentials: ILoginCredentials
  ): Promise<AxiosResponse<IAuthResponse>> =>
    axios.post("/users/login", credentials),

  register: (userData: IRegisterData): Promise<AxiosResponse<IAuthResponse>> =>
    axios.post("/users", userData),
};

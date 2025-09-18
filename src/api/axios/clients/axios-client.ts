import { handleApiError } from "@/src/api/axios/utils/handle-api-error";
import type { IApiClient } from "@/src/core/interfaces/api-client";
import { ApiResponse } from "@/src/core/responses"; 
import axios, { type AxiosInstance } from "axios";

export class ApiClient implements IApiClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 15000,
    });

    this.axiosInstance.interceptors.request.use((config) => {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );
      return config;
    });
  }

  public setHeader(key: string, value: string): void {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  public async get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, { params });
      return new ApiResponse({
        body: response.data,
        statusCode: response.status,
      });
    } catch (error: any) { 
      return handleApiError(error, error.response?.status ?? 0, ApiResponse); 
    }
  }

  public async post<T>(url: string, body: object): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, body);
      return new ApiResponse({
        body: response.data,
        statusCode: response.status,
      });
    } catch (error: any) {
      return handleApiError(error, error.response?.status ?? 0, ApiResponse);
    }
  }

  public async patch<T>(url: string, body: object): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, body);
      return new ApiResponse({
        body: response.data,
        statusCode: response.status,
      });
    } catch (error: any) {
      return handleApiError(error, error.response?.status ?? 0, ApiResponse);
    }
  }

  public async put<T>(url: string, body: object): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, body);
      return new ApiResponse({
        body: response.data,
        statusCode: response.status,
      });
    } catch (error: any) {
      return handleApiError(error, error.response?.status ?? 0, ApiResponse);
    }
  }

  public async delete<T>(url: string, body?: object): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, { data: body });
      return new ApiResponse({
        body: response.data,
        statusCode: response.status,
      });
    } catch (error: any) {
      return handleApiError(error, error.response?.status ?? 0, ApiResponse);
    }
  }
}

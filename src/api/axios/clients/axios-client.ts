import type { IApiClient } from "@/src/core/interfaces/api-client";
import { ApiError, ApiResponse } from "@/src/core/responses";
import axios, { type AxiosInstance, isAxiosError } from "axios";

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
		} catch (error) {
			this.handleApiError(error);
		}
	}

	public async post<T>(url: string, body: object): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.post<T>(url, body);
			return new ApiResponse({
				body: response.data,
				statusCode: response.status,
			});
		} catch (error) {
			this.handleApiError(error);
		}
	}

	public async patch<T>(url: string, body: object): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.patch<T>(url, body);
			return new ApiResponse({
				body: response.data,
				statusCode: response.status,
			});
		} catch (error) {
			this.handleApiError(error);
		}
	}

	public async put<T>(url: string, body: object): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.put<T>(url, body);
			return new ApiResponse({
				body: response.data,
				statusCode: response.status,
			});
		} catch (error) {
			this.handleApiError(error);
		}
	}

	public async delete<T>(url: string, body?: object): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.delete<T>(url, { data: body });
			return new ApiResponse({
				body: response.data,
				statusCode: response.status,
			});
		} catch (error) {
			this.handleApiError(error);
		}
	}

	private handleApiError(error: unknown): never {
		if (isAxiosError(error)) {
			const statusCode = error.response?.status || 500;
			const message =
				error.response?.data?.message || "An unexpected API error occurred.";
			const data = error.response?.data;
			throw new ApiError(message, data, statusCode);
		}
		throw new ApiError("An unexpected network error occurred.", null, 500);
	}
}

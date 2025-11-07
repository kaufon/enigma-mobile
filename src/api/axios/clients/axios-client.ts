import { handleApiError } from "@/src/api/axios/utils/handle-api-error";
import type { IApiClient } from "@/src/core/interfaces/api-client";
import { ApiResponse } from "@/src/core/responses";
import axios, { AxiosError, type AxiosInstance } from "axios";

export class ApiClient implements IApiClient {
	private readonly axiosInstance: AxiosInstance;
	private onSignOut: () => void;

	constructor(baseURL: string) {
		this.onSignOut = () => console.error("onSignOut não foi configurado!");

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

		this.axiosInstance.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				const { config, response } = error;
				if (response?.status === 401 && config?.headers?.Authorization) {
					console.log("Erro 401 - Token inválido ou expirado. Deslogando...");
					this.onSignOut();
				}
				return Promise.reject(error);
			},
		);
	}

	public setSignOutCallback(callback: () => void) {
		this.onSignOut = callback;
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

	public async post<T>(url: string, body: any): Promise<ApiResponse<T>> {
		if (body && typeof body === "object" && body._parts) {
			console.log("[API Client] Detectado FormData. A usar XHR nativo.");
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				const fullUrl = this.axiosInstance.defaults.baseURL + url;
				xhr.open("POST", fullUrl);
				const headers = this.axiosInstance.defaults.headers.common;
				for (const key in headers) {
					if (key.toLowerCase() !== "content-type") {
						xhr.setRequestHeader(key, headers[key] as string);
					}
				}
				xhr.onload = () => {
					let responseBody: any = null;
					try {
						responseBody = JSON.parse(xhr.responseText);
					} catch (e) {}
					if (xhr.status >= 200 && xhr.status < 300) {
						resolve(
							new ApiResponse({
								body: responseBody as T,
								statusCode: xhr.status,
							}),
						);
					} else {
						console.error(
							`[API Client] Erro XHR ${xhr.status}:`,
							xhr.responseText,
						);
						reject({
							message: `XHR Error ${xhr.status}`,
							response: { status: xhr.status, data: responseBody },
						});
					}
				};

				xhr.onerror = () => {
					console.error("[API Client] Erro de rede XHR.");
					reject({
						message: "Network Error (XHR)",
						response: { status: 0 }, 
					});
				};

				xhr.send(body);
			});
		} else {
			try {
				console.log("[API Client] Request JSON. A usar AXIOS.");
				const response = await this.axiosInstance.post<T>(url, body);
				return new ApiResponse({
					body: response.data,
					statusCode: response.status,
				});
			} catch (error: any) {
				return handleApiError(error, error.response?.status ?? 0, ApiResponse);
			}
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

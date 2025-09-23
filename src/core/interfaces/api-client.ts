import type { ApiResponse } from "@/src/core/responses";

export interface IApiClient {
	setHeader(key: string, value: string): void;
	get<T>(url: string, params?: object): Promise<ApiResponse<T>>;
	post<T>(url: string, body: object): Promise<ApiResponse<T>>;
	patch<T>(url: string, body: object): Promise<ApiResponse<T>>;
	delete<T>(url: string, body?: object): Promise<ApiResponse<T>>;
	put<T>(url: string, body: object): Promise<ApiResponse<T>>;
}

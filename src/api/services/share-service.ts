import type { CreateShareDto } from "@/src/core/dtos/create-share";
import type { CreateShareResponse } from "@/src/core/dtos/create-share-response";
import type { ShareItemDto } from "@/src/core/dtos/share-item";
import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { IShareService } from "@/src/core/interfaces/share-service";
import type { ApiResponse } from "@/src/core/responses";

export const ShareService = (apiClient: IApiClient): IShareService => {
	return {
		async create(
			data: CreateShareDto,
		): Promise<ApiResponse<CreateShareResponse>> {
			return await apiClient.post<CreateShareResponse>("/share/create", data);
		},
		async list(): Promise<ApiResponse<ShareItemDto[]>> {
			return await apiClient.get<ShareItemDto[]>("/share");
		},
		async delete(id: string): Promise<ApiResponse<void>> {
			return await apiClient.delete<void>(`/share/${id}`);
		},
		async getSharedItem(
			id: string,
		): Promise<ApiResponse<{ iv: string; content: string }>> {
			return await apiClient.get<{
				iv: string;
				content: string;
			}>(`/share/${id}`);
		},
	};
};

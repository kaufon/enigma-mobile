import { FolderDto } from "@/src/core/dtos/folder";
import type { IApiClient } from "@/src/core/interfaces/api-client";
import { IFolderService } from "@/src/core/interfaces/folder-service";
import type { ApiResponse } from "@/src/core/responses";
export const FoldersService = (apiClient: IApiClient): IFolderService => {
	return {
		async findMany(): Promise<ApiResponse<FolderDto[]>> {
			const response = await apiClient.get<FolderDto[]>(`/category/list`);
			return response;
		},
		async create(data: FolderDto): Promise<ApiResponse<FolderDto>> {
			const response = await apiClient.post<FolderDto>(
				"/category/create",
				data,
			);
			return response;
		},
		async delete(id: string): Promise<ApiResponse<void>> {
			const response = await apiClient.delete<void>(`/category/delete/${id}`);
			return response;
		},
		async getById(id: string): Promise<ApiResponse<FolderDto>> {
			const response = await apiClient.get<FolderDto>(
				`/category/details/${id}`,
			);
			return response;
		},
		async update(
			id: string,
			data: Partial<FolderDto>,
		): Promise<ApiResponse<FolderDto>> {
			const response = await apiClient.put<FolderDto>(
				`/category/edit/${id}`,
				data,
			);
			return response;
		},
	};
};

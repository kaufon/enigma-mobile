import type { SafeNoteDto } from "@/src/core/dtos/safe-note";
import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { ISafeNoteService } from "@/src/core/interfaces/safe-note-service";
import type { ApiResponse } from "@/src/core/responses";

export const SafeNoteService = (apiClient: IApiClient): ISafeNoteService => {
	return {
		async findMany(categoryId?: string): Promise<ApiResponse<SafeNoteDto[]>> {
			let url = "/safe-note/list";
			if (categoryId) {
				url += `?categoryId=${categoryId}`;
			}
			const response = await apiClient.get<SafeNoteDto[]>(url);
			return response;
		},
		async create(data: SafeNoteDto): Promise<ApiResponse<SafeNoteDto>> {
			const response = await apiClient.post<SafeNoteDto>(
				"/safe-note/create",
				data,
			);
			return response;
		},
		async delete(id: string): Promise<ApiResponse<void>> {
			const response = await apiClient.delete<void>(`/safe-note/delete/${id}`);
			return response;
		},
		async getById(id: string): Promise<ApiResponse<SafeNoteDto>> {
			const response = await apiClient.get<SafeNoteDto>(
				`/safe-note/details/${id}`,
			);
			return response;
		},
		async update(
			id: string,
			data: Partial<SafeNoteDto>,
		): Promise<ApiResponse<SafeNoteDto>> {
			const response = await apiClient.put<SafeNoteDto>(
				`/safe-note/edit/${id}`,
				data,
			);
			return response;
		},
	};
};

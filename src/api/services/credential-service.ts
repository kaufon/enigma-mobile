import type { CredentialDto } from "@/src/core/dtos/credentials";
import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { ICredentialsService } from "@/src/core/interfaces/credential-service";
import type { ApiResponse } from "@/src/core/responses";
export const CredentialsService = (
	apiClient: IApiClient,
): ICredentialsService => {
	return {
		async findMany(categoryId?: string): Promise<ApiResponse<CredentialDto[]>> {
			let url = "/credentials/list";
			if (categoryId) {
				url += `?categoryId=${categoryId}`;
			}

			const response = await apiClient.get<CredentialDto[]>(url);
			console.log(response);

			return response;
		},
		async create(data: CredentialDto): Promise<ApiResponse<CredentialDto>> {
			const response = await apiClient.post<CredentialDto>(
				"/credentials/create",
				data,
			);
			return response;
		},
		async delete(id: string): Promise<ApiResponse<void>> {
			const response = await apiClient.delete<void>(`/credentials/delete/${id}`);
			return response;
		},
		async getById(id: string): Promise<ApiResponse<CredentialDto>> {
			const response = await apiClient.get<CredentialDto>(`/credentials/details/${id}`);
			return response;
		},

		async update(
			id: string,
			data: Partial<CredentialDto>,
		): Promise<ApiResponse<CredentialDto>> {
			const response = await apiClient.put<CredentialDto>(
				`/credentials/edit/${id}`,
				data,
			);
			return response;
		},
	};
};

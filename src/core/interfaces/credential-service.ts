import type { CredentialDto } from "../dtos/credentials";
import type { ApiResponse } from "../responses";

export interface ICredentialsService {
	findMany(categoryId?: string): Promise<ApiResponse<CredentialDto[]>>;
	create(data: CredentialDto): Promise<ApiResponse<CredentialDto>>;
	delete(id: string): Promise<ApiResponse<void>>;
	getById(id: string): Promise<ApiResponse<CredentialDto>>;
	update(
		id: string,
		data: Partial<CredentialDto>,
	): Promise<ApiResponse<CredentialDto>>;
}

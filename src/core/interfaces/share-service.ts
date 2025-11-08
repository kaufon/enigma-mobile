import type { CreateShareDto } from "@/src/core/dtos/create-share";
import type { CreateShareResponse } from "@/src/core/dtos/create-share-response";
import type { ShareItemDto } from "@/src/core/dtos/share-item";
import type { ApiResponse } from "@/src/core/responses";

export interface IShareService {
	create(data: CreateShareDto): Promise<ApiResponse<CreateShareResponse>>;
	list(): Promise<ApiResponse<ShareItemDto[]>>;
	getSharedItem(
		id: string,
	): Promise<ApiResponse<{ iv: string; content: string }>>;
	delete(id: string): Promise<ApiResponse<void>>;
}

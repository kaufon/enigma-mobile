import type { SafeNoteDto } from "@/src/core/dtos/safe-note";
import type { ApiResponse } from "../responses";

export interface ISafeNoteService {
	findMany(categoryId?: string): Promise<ApiResponse<SafeNoteDto[]>>;
	create(data: SafeNoteDto): Promise<ApiResponse<SafeNoteDto>>;
	delete(id: string): Promise<ApiResponse<void>>;
	getById(id: string): Promise<ApiResponse<SafeNoteDto>>;
	update(
		id: string,
		data: Partial<SafeNoteDto>,
	): Promise<ApiResponse<SafeNoteDto>>;
}

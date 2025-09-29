import { FolderDto } from "@/src/core/dtos/folder";
import type { ApiResponse } from "../responses";

export interface IFolderService {
	findMany(): Promise<ApiResponse<FolderDto[]>>;
	create(data: FolderDto): Promise<ApiResponse<FolderDto>>;
	delete(id: string): Promise<ApiResponse<void>>;
	getById(id: string): Promise<ApiResponse<FolderDto>>;
	update(id: string, data: Partial<FolderDto>): Promise<ApiResponse<FolderDto>>;
}

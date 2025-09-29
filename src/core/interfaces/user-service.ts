import { UserDto } from "@/src/core/dtos/user";
import type { ApiResponse } from "@/src/core/responses";

export interface IUserService {
	getProfile(): Promise<ApiResponse<UserDto>>;
	updateEmail(email: string, password: string): Promise<ApiResponse<void>>;
	deleteAccount(email: string, password: string): Promise<ApiResponse<void>>;
}

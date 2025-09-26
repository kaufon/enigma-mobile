import type { UserDto } from "@/src/core/dtos/user";
import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { IUserService } from "@/src/core/interfaces/user-service";
import type { ApiResponse } from "@/src/core/responses";

export const UserService = (apiClient: IApiClient): IUserService => {
	return {
    async getProfile(): Promise<ApiResponse<UserDto>> {
        const response = await apiClient.get<UserDto>("/users/me");
        return response;
    },
    async updateEmail(
        email: string,
        password: string
    ): Promise<ApiResponse<void>> {
        const response = await apiClient.put<void>("/users/update/", {
            email,
            password,
        });
        return response;
    },
    async deleteAccount (email: string, password: string): Promise<ApiResponse<void>> {
        const response = await apiClient.delete<void>("/users/delete", {
            email,
            password,
        });
        return response;
    }
};
};

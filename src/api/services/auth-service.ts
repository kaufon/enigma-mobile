import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { IAuthService } from "@/src/core/interfaces/auth-service";
import type { ApiResponse } from "@/src/core/responses";

export const AuthService = (apiClient: IApiClient): IAuthService => {
	return {
		async signIn(
			email: string,
			password: string,
		): Promise<ApiResponse<{ accessToken: string }>> {
			const response = await apiClient.post<{
				accessToken: string;
			}>("/auth/sign-in", {
				email,
				password,
			});
			return response;
		},
		async signUp(email: string, password: string): Promise<ApiResponse<void>> {
			throw new Error("Function not implemented.");
		},
		async signOut(): Promise<void> {
			throw new Error("Function not implemented.");
		},
	};
};

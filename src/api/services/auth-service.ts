import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { IAuthService } from "@/src/core/interfaces/auth-service";
import type { ApiResponse } from "@/src/core/responses";
import type { RequestPasswordResetResponse } from "@/src/core/types/request-password-reset-response";

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
			const response = await apiClient.post<void>("/auth/sign-up", {
				email,
				password,
			});
			return response;
		},
		async signOut(): Promise<void> {
			throw new Error("Function not implemented.");
		},
		async requestPasswordReset(email) {
			const response = await apiClient.post<RequestPasswordResetResponse>(
				"/auth/forgot-password",
				{
					email,
				},
			);
			return response;
		},
		async resetPasswordWithToken(token, newPassword) {
			const response = await apiClient.post<void>(
				"/auth/reset-password/verify-token",
				{
					token,
					newPassword,
				},
			);
			return response;
		},
		async resetPasswordWithPassphrase(passphrase, newPassword, email) {
			const response = await apiClient.post<void>(
				"/auth/reset-password/passphrase",
				{
					passphrase,
					newPassword,
					email,
				},
			);
			return response;
		},
	};
};

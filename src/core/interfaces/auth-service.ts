import type { ApiResponse } from "@/src/core/responses";
import type { RequestPasswordResetResponse } from "@/src/core/types/request-password-reset-response";

export interface IAuthService {
	signIn(
		email: string,
		password: string,
	): Promise<ApiResponse<{ accessToken: string }>>;
	signUp(email: string, password: string): Promise<ApiResponse<void>>;
	signOut(): Promise<void>;
	requestPasswordReset(
		email: string,
	): Promise<ApiResponse<RequestPasswordResetResponse>>;
	resetPasswordWithToken(
		token: string,
		newPassword: string,
	): Promise<ApiResponse<void>>;
	resetPasswordWithPassphrase(
		passphrase: string,
		newPassword: string,
		email: string,
	): Promise<ApiResponse<void>>;
}

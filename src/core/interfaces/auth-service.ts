import type { ApiResponse } from "@/src/core/responses";

export interface IAuthService {
	signIn(
		email: string,
		password: string,
	): Promise<ApiResponse<{ accessToken: string }>>;
	signUp(
		email: string,
		password: string,
	): Promise<ApiResponse<void>>;
  signOut(): Promise<void>;
}

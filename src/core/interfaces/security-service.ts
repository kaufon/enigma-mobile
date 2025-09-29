import type { ApiResponse } from "@/src/core/responses";

export interface ISecurityService {
	setRecoveryPhrase(
		phrase: string,
		passwordConfirmation: string,
	): Promise<ApiResponse<void>>;
	setAutotimeLock(minutes: number): Promise<ApiResponse<void>>;
}

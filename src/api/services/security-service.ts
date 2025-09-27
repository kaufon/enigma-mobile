import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { ISecurityService } from "@/src/core/interfaces/security-service";
import type { ApiResponse } from "@/src/core/responses";

export const SecurityService = (apiClient: IApiClient): ISecurityService => {
	return {
		async setRecoveryPhrase(
			phrase: string,
			passwordConfirmation: string,
		): Promise<ApiResponse<void>> {
			const response = await apiClient.post<void>(
				"/security/setup-emergency-passphrase",
				{
					passphrase: phrase,
					password: passwordConfirmation,
				},
			);
			return response;
		},
		async setAutotimeLock(minutes: number): Promise<ApiResponse<void>> {
			const response = await apiClient.post<void>(
				"/security/set-autolock-timeout",
				{
					autoLockTimeoutMinutes: minutes,
				},
			);
      return response
		},
	};
};

import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { ApiResponse } from "@/src/core/responses";
import type { IEmergencyVaultService } from "@/src/core/interfaces/emergency-vault-service";
import type { EmergencyVaultListResponse } from "@/src/core/types/emergency-vault-list-response";

export const EmergencyVaultService = (
	apiClient: IApiClient,
): IEmergencyVaultService => ({
	async list(password: string): Promise<ApiResponse<EmergencyVaultListResponse>> {
		console.log("Fetching emergency vault items with password:", {
			emergencyVaultPassword: password,
		});
		return await apiClient.post<EmergencyVaultListResponse>("/emergency-vault/list", {
			emergencyVaultPassword: password
		});
	},
});

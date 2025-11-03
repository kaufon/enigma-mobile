import type { ApiResponse } from "@/src/core/responses";
import type { EmergencyVaultListResponse } from "@/src/core/types/emergency-vault-list-response";

export interface IEmergencyVaultService {
  list(password: string): Promise<ApiResponse<EmergencyVaultListResponse>>;
}

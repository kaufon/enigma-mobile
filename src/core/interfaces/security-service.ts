import type { ApiResponse } from "@/src/core/responses";
import { ReportSchedule } from "@/src/core/types/report-schedule";

export interface ISecurityService {
	setRecoveryPhrase(
		phrase: string,
		passwordConfirmation: string,
	): Promise<ApiResponse<void>>;
	setAutotimeLock(minutes: number): Promise<ApiResponse<void>>;
	exportVault(
		password: string,
		format: "csv" | "json",
	): Promise<ApiResponse<string>>;
	setEmergencyVaultPassword(
		emergencyVaultPassword: string,
		password: string,
	): Promise<ApiResponse<void>>;
	importVault(formData: FormData): Promise<ApiResponse<void>>;
	setupReport(data: {
		masterPassword: string;
		reportNotificationEnabled: boolean;
		reportNotificationSchedule: ReportSchedule;
	}): Promise<ApiResponse<void>>;
}

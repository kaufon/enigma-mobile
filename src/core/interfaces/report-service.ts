import type { ApiResponse } from "@/src/core/responses";

export interface IReportService {
	generateVaultHealthReport(): Promise<
		ApiResponse<{
			fileData: string; 
			fileName: string;
		}>
	>;
}

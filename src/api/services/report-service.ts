import axios from "axios";
import type { IApiClient } from "@/src/core/interfaces/api-client";
import type { IReportService } from "@/src/core/interfaces/report-service";
import type { ApiResponse } from "@/src/core/responses";
const blobToBase64 = (blob: Blob): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onload = () => {
			const data = reader.result as string;
			resolve(data.split(",")[1]);
		};
		reader.readAsDataURL(blob);
	});
};

const getFilenameFromHeader = (header: string): string => {
	const match = header.match(/filename="(.+?)"/);
	const baseFilename = match ? match[1] : "Relatorio.pdf";

	const timestamp = new Date()
		.toISOString()
		.slice(0, 19) 
		.replace("T", "_")
		.replace(/:/g, "-"); 

	const lastDot = baseFilename.lastIndexOf(".");
	if (lastDot === -1) {
		return `${baseFilename}_${timestamp}`;
	}

	const basename = baseFilename.slice(0, lastDot); 
	const extension = baseFilename.slice(lastDot); 

	return `${basename}_${timestamp}${extension}`;
};

export const ReportService = (apiClient: IApiClient): IReportService => ({
	async generateVaultHealthReport(): Promise<
		ApiResponse<{ fileData: string; fileName: string }>
	> {
		try {
			const baseURL = (apiClient as any).axiosInstance.defaults.baseURL;
			const token = (apiClient as any).axiosInstance.defaults.headers.common[
				"Authorization"
			];
			const response = await axios.get("/report/vault-health/pdf", {
				baseURL: baseURL,
				headers: { Authorization: token },
				responseType: "blob",
			});
			const fileDataBlob: Blob = response.data;
			const fileData = await blobToBase64(fileDataBlob);
			const fileName = getFilenameFromHeader(
				response.headers["content-disposition"],
			);
			return {
				isSuccess: true,
				body: { fileData, fileName },
				statusCode: response.status,
			};
		} catch (e: any) {
			return {
				isSuccess: false,
				errorMessage: e.message || "Falha ao baixar o relatório",
				statusCode: e.response?.status || 0,
			};
		}
	},
});

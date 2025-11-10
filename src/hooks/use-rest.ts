import { ApiClient } from "@/src/api/axios/clients/axios-client";
import { AuthService, SafeNoteService, ShareService } from "@/src/api/services";
import { CredentialsService } from "@/src/api/services/credential-service";
import { EmergencyVaultService } from "@/src/api/services/emergency-vault-service";
import { FoldersService } from "@/src/api/services/folder-service";
import { ReportService } from "@/src/api/services/report-service";
import { SecurityService } from "@/src/api/services/security-service";
import { UserService } from "@/src/api/services/user-service";
import { useMemo } from "react";

const baseURL = "https://protonic-larae-inexpressively.ngrok-free.dev";
export const restClient = new ApiClient(baseURL);

export function useRest() {
	const services = useMemo(() => {
		return {
			baseURL: baseURL,
			authService: AuthService(restClient),
			folderService: FoldersService(restClient),
			credentialService: CredentialsService(restClient),
			userService: UserService(restClient),
			securityService: SecurityService(restClient),
			safeNoteService: SafeNoteService(restClient),
			emergencyVaultService: EmergencyVaultService(restClient),
			shareService: ShareService(restClient),
			reportService: ReportService(restClient), 
		};
	}, []);

	return services;
}

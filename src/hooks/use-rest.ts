import { ApiClient } from "@/src/api/axios/clients/axios-client";
import { AuthService } from "@/src/api/services";
import { CredentialsService } from "@/src/api/services/credential-service";
import { FoldersService } from "@/src/api/services/folder-service";
import { SecurityService } from "@/src/api/services/security-service";
import { UserService } from "@/src/api/services/user-service";
import {  useMemo } from "react";

const baseURL = "http://3333";
export const restClient = new ApiClient(baseURL);

export function useRest() {
	const services = useMemo(() => {
		return {
			authService: AuthService(restClient),
			folderService: FoldersService(restClient),
			credentialService: CredentialsService(restClient),
			userService: UserService(restClient),
			securityService: SecurityService(restClient),
		};
	}, []);

	return services;
}

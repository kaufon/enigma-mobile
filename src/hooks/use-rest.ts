import { ApiClient } from "@/src/api/axios/clients/axios-client";
import { AuthService } from "@/src/api/services";
import { CredentialsService } from "@/src/api/services/credential-service";
import { FoldersService } from "@/src/api/services/folder-service";
import { UserService } from "@/src/api/services/user-service";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";
import { useEffect, useMemo } from "react";

const baseURL = "http://192.168.0.14:3333";
export const restClient = new ApiClient(baseURL);

export function useRest() {
	const { accessToken } = useAuthContext();

	useEffect(() => {
		if (accessToken) {
			restClient.setHeader("Authorization", `Bearer ${accessToken}`);
		} else {
			restClient.setHeader("Authorization", "");
		}
	}, [accessToken]);

	const services = useMemo(() => {
		return {
			authService: AuthService(restClient),
			foldersService: FoldersService(restClient),
			credentialService: CredentialsService(restClient),
			userService: UserService(restClient),
		};
	}, []);

	return services;
}

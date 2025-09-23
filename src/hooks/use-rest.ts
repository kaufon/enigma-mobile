import { ApiClient } from "@/src/api/axios/clients/axios-client";
import { AuthService } from "@/src/api/services";
import { CredentialsService } from "@/src/api/services/credential-service";
import { useAuthContext, useSecureStore } from "@/src/ui/widgets/global/hooks";
import { useEffect, useMemo } from "react";

const baseURL = "http://192.168.0.36:3333";
export const restClient = new ApiClient(baseURL);

export function useRest() {
	const { accessToken } = useAuthContext();

	// A chamada setHeader é um efeito colateral e deve estar em um useEffect
	useEffect(() => {
		if (accessToken) {
			restClient.setHeader("Authorization", `Bearer ${accessToken}`);
		} else {
			// Limpa o header no logout
			restClient.setHeader("Authorization", "");
		}
	}, [accessToken]);

	// Use useMemo para garantir que os serviços só sejam criados uma vez
	const services = useMemo(() => {
		return {
			authService: AuthService(restClient),
			credentialService: CredentialsService(restClient),
		};
	}, []); // O array de dependências vazio `[]` garante que isso rode apenas uma vez

	return services;
}

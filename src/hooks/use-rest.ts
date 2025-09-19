import { ApiClient } from "@/src/api/axios/clients/axios-client";
import { AuthService } from "@/src/api/services";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";

const baseURL = "http://192.168.50.39:3333";
export const restClient = new ApiClient(baseURL);

export function useRest() {
	const { accessToken } = useAuthContext();
	if (accessToken) {
		restClient.setHeader("Authorization", `Bearer ${accessToken}`);
	}
	return {
		authService: AuthService(restClient),
	};
}

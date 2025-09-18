import { useRest } from "@/src/hooks";
import { useNavigation } from "@/src/ui/widgets/global/hooks";
import { useSecureStore } from "@/src/ui/widgets/global/hooks";
import { useEffect, useState } from "react";
import { restClient as apiClient } from "@/src/hooks/use-rest";
import { useToast } from "@/src/hooks/use-toast";

type AuthState = {
	accessToken: string | null;
	refreshToken: string | null;
	authenticated: boolean;
	isLoading: boolean;
};

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
	authenticated: false,
	isLoading: true,
};

export function useAuthContextProvider() {
	const secureStore = useSecureStore();
	const navigation = useNavigation();
	const [authState, setAuthState] = useState<AuthState>(initialState);
	const { authService } = useRest();
	const { show } = useToast();
	useEffect(() => {
		const loadSession = async () => {
			try {
				const accessToken = await secureStore.getItem("accessToken");
				const refreshToken = await secureStore.getItem("refreshToken");
				if (accessToken && refreshToken) {
					apiClient.setHeader("Authorization", `Bearer ${accessToken}`);
					setAuthState({
						accessToken,
						refreshToken,
						authenticated: true,
						isLoading: false,
					});
				} else {
					setAuthState((s) => ({ ...s, isLoading: false }));
				}
			} catch (e) {
				setAuthState((s) => ({ ...s, isLoading: false }));
			}
		};
		loadSession();
	}, [secureStore]);
	const signIn = async (email: string, password: string) => {
		try {
			const response = await authService.signIn(email, password);
			if (response.isSuccess) {
				const { accessToken } = response.body;
				const refreshToken = "123-teste";
				await secureStore.setItem("accessToken", accessToken);
				await secureStore.setItem("refreshToken", refreshToken);
				apiClient.setHeader("Authorization", `Bearer ${accessToken}`);
				setAuthState({
					accessToken,
					refreshToken,
					authenticated: true,
					isLoading: false,
				});
			}
			if (response.isFailure) {
				show("Credenciais inválidas", "error");
			}
		} catch (error) {
			show("Ocorreu um erro inesperado. Tente novamente mais tarde.", "error");
		}
	};
	const signOut = async () => {
		await secureStore.deleteItem("accessToken");
		await secureStore.deleteItem("refreshToken");

		apiClient.setHeader("Authorization", "");

		setAuthState({
			accessToken: null,
			refreshToken: null,
			authenticated: false,
			isLoading: false,
		});
	};
	return {
		...authState,
		signIn,
		signOut,
	};
}

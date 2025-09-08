import { useNavigation } from "@/src/ui/widgets/global/hooks";
import { useSecureStore } from "@/src/ui/widgets/global/hooks";
import type { AuthContextValue } from "./auth-context-value";
import { useEffect, useState } from "react";
import { apiClient } from "@/src/api/axios/client";

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
	useEffect(() => {
		const loadSession = async () => {
			try {
				const accessToken = await secureStore.getItem("acessToken");
				const refreshToken = await secureStore.getItem("refreshToken");
				if (accessToken && refreshToken) {
					apiClient.defaults.headers.common["Authorization"] =
						`Bearer ${accessToken}`;
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
			const response = await apiClient.post("/auth/sign-in", {
				email,
				password,
			});
			const { accessToken, refreshToken } = response.data;

			await secureStore.setItem("accessToken", accessToken);
			await secureStore.setItem("refreshToken", refreshToken);
			apiClient.defaults.headers.common["Authorization"] =
				`Bearer ${accessToken}`;
			setAuthState({
				accessToken,
				refreshToken,
				authenticated: true,
				isLoading: false,
			});
		} catch (e) {
			throw new Error("Invalid email or password.");
		}
	};
	const signOut = async () => {
		await secureStore.deleteItem("accessToken");
		await secureStore.deleteItem("refreshToken");

		apiClient.defaults.headers.common["Authorization"] = "";

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

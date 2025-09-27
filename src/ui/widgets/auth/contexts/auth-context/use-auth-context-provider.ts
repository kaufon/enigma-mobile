import { useSecureStore } from "@/src/ui/widgets/global/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { restClient as apiClient } from "@/src/hooks/use-rest";
import { useToast } from "@/src/hooks/use-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UserDto } from "@/src/core/dtos/user";
import { AuthService } from "@/src/api/services";
import { UserService } from "@/src/api/services/user-service";
import { AppState } from "react-native";

type AuthState = {
	accessToken: string | null;
	refreshToken: string | null;
	authenticated: boolean;
	isLoading: boolean;
	user: UserDto | null;
};

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
	authenticated: false,
	isLoading: true,
	user: null,
};

export function useAuthContextProvider() {
	const secureStore = useSecureStore();
	const [authState, setAuthState] = useState<AuthState>(initialState);
	const appState = useRef(AppState.currentState);
	const authService = useMemo(() => AuthService(apiClient), []);
	const userService = useMemo(() => UserService(apiClient), []);

	const { show } = useToast();

	const signOut = useCallback(async () => {
		await secureStore.deleteItem("accessToken");
		await secureStore.deleteItem("refreshToken");
		apiClient.setHeader("Authorization", "");
		setAuthState({ ...initialState, isLoading: false });
	}, [secureStore]);

	useEffect(() => {
		apiClient.setSignOutCallback(signOut);
	}, [signOut]);

	useEffect(() => {
		const loadSession = async () => {
			try {
				const accessToken = await secureStore.getItem("accessToken");
				const refreshToken = await secureStore.getItem("refreshToken");

				if (accessToken && refreshToken) {
					apiClient.setHeader("Authorization", `Bearer ${accessToken}`);
					const response = await userService.getProfile();

					if (response.isSuccess && response.body) {
						setAuthState({
							accessToken,
							refreshToken,
							authenticated: true,
							isLoading: false,
							user: response.body,
						});
					} else {
						throw new Error("Invalid token");
					}
				} else {
					setAuthState((s) => ({ ...s, isLoading: false }));
				}
			} catch (error) {
				await secureStore.deleteItem("accessToken");
				await secureStore.deleteItem("refreshToken");
				apiClient.setHeader("Authorization", "");
				setAuthState({ ...initialState, isLoading: false });
			}
		};

		loadSession();
	}, []);

	const refreshUser = useCallback(async () => {
		try {
			const response = await userService.getProfile();

			if (response.isSuccess && response.body) {
				setAuthState((currentState) => ({
					...currentState,
					user: response.body,
				}));
			} else {
				await signOut();
			}
		} catch (error) {
			await signOut();
		}
	}, [userService, signOut]); // As dependências são estáveis

	const signIn = async (email: string, password: string) => {
		try {
			const response = await authService.signIn(email, password);
			if (response.isSuccess && response.body) {
				const { accessToken } = response.body;
				const refreshToken = "123-teste";

				await secureStore.setItem("accessToken", accessToken);
				await secureStore.setItem("refreshToken", refreshToken);

				apiClient.setHeader("Authorization", `Bearer ${accessToken}`);

				const profileResponse = await userService.getProfile();
				if (profileResponse.isSuccess && profileResponse.body) {
					setAuthState({
						accessToken,
						refreshToken,
						authenticated: true,
						isLoading: false,
						user: profileResponse.body,
					});
				} else {
					await signOut();
				}
			} else {
				show("Credenciais inválidas", "error");
			}
		} catch (error) {
			show("Ocorreu um erro inesperado. Tente novamente mais tarde.", "error");
		}
	};
	useEffect(() => {
		const subscription = AppState.addEventListener(
			"change",
			async (nextAppState) => {
				const timeoutMinutes = authState.user?.autoLockTimeout;

				if (
					appState.current.match(/active/) &&
					nextAppState.match(/inactive|background/)
				) {
					if (authState.authenticated && timeoutMinutes) {
						console.log("App inativo, salvando timestamp...");
						await AsyncStorage.setItem(
							"inactive_timestamp",
							Date.now().toString(),
						);
					}
				}

				if (
					appState.current.match(/inactive|background/) &&
					nextAppState === "active"
				) {
					if (authState.authenticated && timeoutMinutes) {
						console.log("App ativo, verificando timestamp...");
						const inactiveTimeStr =
							await AsyncStorage.getItem("inactive_timestamp");

						if (inactiveTimeStr) {
							const inactiveTime = parseInt(inactiveTimeStr, 10);
							const now = Date.now();
							const elapsedSeconds = (now - inactiveTime) / 1000;
							const timeoutSeconds = timeoutMinutes * 60;

							console.log(
								`Tempo inativo: ${elapsedSeconds}s. Limite: ${timeoutSeconds}s.`,
							);

							if (elapsedSeconds > timeoutSeconds) {
								console.log("Tempo excedido, deslogando...");
								signOut();
							}
							await AsyncStorage.removeItem("inactive_timestamp");
						}
					}
				}

				appState.current = nextAppState;
			},
		);

		return () => {
			subscription.remove();
		};
	}, [authState.authenticated, authState.user, signOut]);
	return {
		...authState,
		signIn,
		signOut,
		refreshUser,
	};
}

import { createContext, useEffect, type PropsWithChildren } from "react";

import { useAuthContextProvider } from "./use-auth-context-provider";
import type { AuthContextValue } from "./auth-context-value";
import { restClient as apiClient } from "@/src/hooks/use-rest";
export const AuthContext = createContext({} as AuthContextValue);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const value = useAuthContextProvider();
	useEffect(() => {
		if (value.signOut) {
			apiClient.setSignOutCallback(value.signOut);
		}
	}, [value.signOut]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

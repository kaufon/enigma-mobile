import { createContext, type PropsWithChildren } from "react";

import { useAuthContextProvider } from "./use-auth-context-provider";
import type { AuthContextValue } from "./auth-context-value";

export const AuthContext = createContext({} as AuthContextValue);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const value = useAuthContextProvider();

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

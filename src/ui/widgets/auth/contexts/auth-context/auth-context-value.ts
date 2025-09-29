import { UserDto } from "@/src/core/dtos/user";

export type AuthContextValue = {
	isLoading: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	authenticated: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	user: UserDto | null;
	refreshUser: () => Promise<void>;
};

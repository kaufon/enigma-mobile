export type AuthContextValue = {
  isLoading: boolean;
  accessToken: string | null; 
  refreshToken: string | null; 
  authenticated: boolean;
  signIn: (email:string, password:string) => Promise<void>;
  signOut: () => Promise<void>;
};

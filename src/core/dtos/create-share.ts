export type CreateShareDto = {
  credentialId: string;
  masterPassword: string;
  expiresIn: "1h" | "24h" | "7d";
  deleteOnRead: boolean;
};

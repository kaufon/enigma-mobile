export type RequestPasswordResetResponse = {
	recoveryType: "EMAIL_LINK" | "PASS_PHRASE";
	nessage: string;
};

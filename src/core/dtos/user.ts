export type UserDto = {
	id: string;
	email: string;
	danger: true;
	dangerReason?: string;
	autoLockTimeout?: number;
};

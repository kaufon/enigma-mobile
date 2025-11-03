export type SafeNoteDto = {
	id?: string;
	title: string;
	content: string;
	categoryId?: string;
	createdAt?: Date;
	updateAt?: Date;
  isEmergency?: boolean;
};

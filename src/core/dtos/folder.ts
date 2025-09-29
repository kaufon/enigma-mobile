export type FolderDto = {
	id?: string;
	name: string;
	credentials?: Array<{
		id: string;
		title: string;
	}>;
};

import type { SafeNoteDto } from "@/src/core/dtos/safe-note";
import { SafeNoteDetailsView } from "@/src/ui/widgets/vault/screens/safe-notes/safe-note-details/safe-note-details-view";
import { useSafeNoteDetailsView } from "@/src/ui/widgets/vault/screens/safe-notes/safe-note-details/use-safe-note-details-view-mode";

type Props = {
	id: string;
};

export const SafeNoteDetailsScreen = ({ id }: Props) => {
	const { isLoading, safeNote, folder } = useSafeNoteDetailsView(id);
	return (
		<SafeNoteDetailsView
			isLoading={isLoading}
			folderName={folder?.name || ""}
			note={safeNote as SafeNoteDto}
			handleDelete={() => {}}
			handleEdit={() => {}}
		/>
	);
};

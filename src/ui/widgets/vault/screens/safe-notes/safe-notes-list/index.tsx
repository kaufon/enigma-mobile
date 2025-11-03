import { SafeNoteListView } from "@/src/ui/widgets/vault/screens/safe-notes/safe-notes-list/safe-notes-list-view";
import { useSafeNoteListView } from "@/src/ui/widgets/vault/screens/safe-notes/safe-notes-list/use-safe-note-list";

export const SafeNoteList = () => {
	const {
		safeNotes,
		loadCredentials,
		isLoading,
		handleEditCredential,
		handleDeleteCredential,
		handleSelectCredential,
	} = useSafeNoteListView();
	return (
		<SafeNoteListView
			safeNotes={safeNotes}
			isLoading={isLoading}
			onSucess={loadCredentials}
			onSelectCredential={handleSelectCredential}
			onDeleteCredential={handleDeleteCredential}
			onEditCredential={handleEditCredential}
		/>
	);
};

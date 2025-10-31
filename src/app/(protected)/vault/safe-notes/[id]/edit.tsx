import { EditSafeNoteForm } from "@/src/ui/widgets/vault/screens/safe-notes/edit-safe-note-form";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
	const { id } = useLocalSearchParams<{ id: string }>();
	return <EditSafeNoteForm id={id} />;
}

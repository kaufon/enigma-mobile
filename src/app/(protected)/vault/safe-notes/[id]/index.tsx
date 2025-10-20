import { Text } from "@/src/ui/widgets/global/components/Themed";
import { SafeNoteDetailsScreen } from "@/src/ui/widgets/vault/screens/safe-notes/safe-note-details";
import { useLocalSearchParams } from "expo-router";

export default function SafeNoteDetail(){
	const { id } = useLocalSearchParams<{ id: string }>();
	if (!id) return <Text>ID não encontrado.</Text>;
	return <SafeNoteDetailsScreen id={id} />;
}

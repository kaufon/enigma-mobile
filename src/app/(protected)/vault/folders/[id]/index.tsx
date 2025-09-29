import { Text } from "@/src/ui/widgets/global/components/Themed";
import { FolderDetails } from "@/src/ui/widgets/vault/screens/folders/folder-details/";
import { useLocalSearchParams } from "expo-router";

export default function FolderDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	if (!id) return <Text>ID não encontrado.</Text>;
	return <FolderDetails id={id} />;
}

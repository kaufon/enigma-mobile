import { Text } from "@/src/ui/widgets/global/components/Themed";
import { SharedItemScreen } from "@/src/ui/widgets/share/shared-item";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	if (!id) return <Text>ID do item não encontrado.</Text>;
	return <SharedItemScreen id={id}/>;
}

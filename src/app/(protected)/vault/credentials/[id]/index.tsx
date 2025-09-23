import { Text } from "@/src/ui/widgets/global/components/Themed";
import { CredentialDetails } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/credential-details";
import { useLocalSearchParams } from "expo-router";

export default function CredentialDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	if (!id) return <Text>ID não encontrado.</Text>;
	return <CredentialDetails id={id} />;
}

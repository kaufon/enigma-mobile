import { View } from "react-native";
import { Stack } from "expo-router";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";

export default function ConfigurationScreenView() {
	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen options={{ title: "Configurações" }} />

			<View className="px-4 mt-8">
				<View className="bg-surface-500 rounded-lg mx-4">
					<VaultListItem
						label="Segurança da conta"
						iconName="lock"
						href="/configuration/security"
						hasBottomBorder={false}
					/>
				</View>
			</View>
		</View>
	);
}

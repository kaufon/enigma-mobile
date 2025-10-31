import { View } from "@/src/ui/widgets/global/components/Themed";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";
import { Stack } from "expo-router";

export const ConfigurationVaultScreenView = () => {
	return (
		<View className="flex-1 bg-background-500 pt-4">
			<Stack.Screen options={{ title: "Importar e Exportar" }} />
			<View className="bg-surface-500 rounded-lg mx-4">
				<VaultListItem
					label="Exportar Cofre"
					iconName="upload"
					href="/configuration/vault/export"
          hasBottomBorder={false}
				/>
				<VaultListItem
					label="Importar Cofre"
					iconName="download"
					href="/configuration/vault/import"
          hasBottomBorder={false}
				/>
			</View>
		</View>
	);
};

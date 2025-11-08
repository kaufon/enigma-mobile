import { ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";
import { VaultSectionHeader } from "@/src/ui/widgets/vault/components/vault-section-header";

export const ConfigurationScreenView = () => {
	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen options={{ title: "Configurações" }} />
			<ScrollView>
				<VaultSectionHeader title="Conta" count={1} />
				<View className="bg-surface-500 rounded-lg mx-4">
					<VaultListItem
						label="Segurança da Conta"
						iconName="shield-user"
						href="/configuration/security"
					/>
				</View>

				<VaultSectionHeader title="Cofre" count={1} />
				<View className="bg-surface-500 rounded-lg mx-4">
					<VaultListItem
						label="Importar e Exportar"
						iconName="database"
						href="/configuration/vault"
					/>
					<VaultListItem
						label="Relatórios"
						iconName="pie-chart"
						href="/configuration/reports"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

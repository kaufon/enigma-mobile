import { View } from "react-native";
import { Stack } from "expo-router";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";
import { VaultSectionHeader } from "@/src/ui/widgets/vault/components/vault-section-header";
export const ReportsScreenView = () => {
	return (
		<View className="flex-1 bg-background-500 pt-4">
			<Stack.Screen options={{ title: "Relatórios" }} />
			<VaultSectionHeader title="Tipos" count={1} />

			<View className="bg-surface-500 rounded-lg mx-4">
				<VaultListItem
					label="Saúde do Cofre"
					iconName="heart-pulse"
					href="/configuration/reports/vault-health"
          hasBottomBorder={false}
				/>
			</View>

			<VaultSectionHeader title="Configurações" count={1} />

			<View className="bg-surface-500 rounded-lg mx-4">
				<VaultListItem
					label="Notificações"
					iconName="heart-pulse"
					href="/configuration/reports/vault-health"
          hasBottomBorder={false}
				/>
			</View>
		</View>
	);
};

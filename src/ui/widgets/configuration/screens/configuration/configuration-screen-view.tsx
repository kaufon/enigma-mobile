import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";
import { VaultSectionHeader } from "@/src/ui/widgets/vault/components/vault-section-header";
import { useUpdateChecker } from "@/src/ui/widgets/global/hooks/use-update-checker";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Text } from "@/src/ui/widgets/global/components/Themed";

export const ConfigurationScreenView = () => {
	const { isChecking, checkAndReload } = useUpdateChecker();
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
            hasBottomBorder={false}
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
            hasBottomBorder={false}
					/>
				</View>
				<VaultSectionHeader title="Aplicativo" count={2} />
				<View className="bg-surface-500 rounded-lg mx-4">
					<Pressable
						onPress={checkAndReload}
						disabled={isChecking}
						className="bg-surface-500 flex-row rounded-lg m-1 items-center justify-between p-4 border-b border-neutral-500/20"
					>
			<View className="flex-row items-center space-x-4 gap-3 py-3 flex-1">
							<Icon name="cloud-download" size={20} color="neutral" />
							<Text className="text-accent-500 font-bold">Verificar Atualizações</Text>
						</View>
						{isChecking && <ActivityIndicator size="small" />}
					</Pressable>
					<VaultListItem
						label="Informações do Aplicativo"
						iconName="info"
            hasBottomBorder={false}
						href="/configuration/app-info"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

import { View } from "react-native";
import { Stack } from "expo-router";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";

export default function SecurityScreenView() {
	return (
		<View className="flex-1 bg-background-500 pt-4">
			<Stack.Screen options={{ title: "Segurança da Conta" }} />

			<View className="bg-surface-500 rounded-lg mx-4">
				<VaultListItem
					label="E-mail"
					iconName="email"
					href="/configuration/security/change-email"
				/>
				<VaultListItem
					label="Frase de Segurança"
					iconName="shield-user"
					href="/configuration/security/register-phrase"
				/>
				<VaultListItem
					label="Auto-bloqueio"
					iconName="clock"
					href="/configuration/security/autolock-time"
				/>
				<VaultListItem
					label="Cofre de emergencia"
					iconName="safe"
					href="/configuration/security/emergency-vault"
				/>
				<VaultListItem
					label="Deletar conta"
					iconName="trash"
					href="/configuration/security/delete-account"
          hasBottomBorder={false}
				/>
			</View>
		</View>
	);
}

import { COLORS } from "@/src/constants";
import { EmergencyVaultProvider } from "@/src/ui/widgets/emergency-vault/contexts/emergency-vault-context";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function EmergencyLayout() {
	const { colorScheme } = useColorScheme();
	const theme = COLORS[colorScheme || "light"];
	return (
		<EmergencyVaultProvider>
			<Stack
				screenOptions={{
					headerStyle: { backgroundColor: theme.surface },
					headerTintColor: theme.accent,
				}}
			>
				<Stack.Screen name="index" options={{ title: "Cofre de Emergência" }} />
				<Stack.Screen
					name="create-credential"
					options={{ title: "Nova Credencial de Emergência" }}
				/>
				<Stack.Screen
					name="create-note"
					options={{ title: "Nova Nota de Emergência" }}
				/>
			</Stack>
		</EmergencyVaultProvider>
	);
}

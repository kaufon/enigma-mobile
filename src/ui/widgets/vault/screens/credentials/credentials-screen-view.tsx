import { View } from "react-native";
import { Stack } from "expo-router";
import { CredentialsList } from "@/src/ui/widgets/vault/screens/credentials/credetials-list";

export const CredentialsScreenView = () => {

	return (
		<View className="flex-1 ">
			<Stack.Screen options={{ title: "Credenciais" }} />
			<CredentialsList />
		</View>
	);
};

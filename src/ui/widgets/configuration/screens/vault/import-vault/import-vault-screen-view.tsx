import { Stack } from "expo-router";
import { View, Text } from "react-native";
export const ImportScreenView = () => {
	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Importar Cofre" }} />
			<Text className="text-accent-500">Tela de importação em breve.</Text>
		</View>
	);
};

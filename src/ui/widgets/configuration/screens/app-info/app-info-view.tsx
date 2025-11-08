import { View, Platform, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import Constants from "expo-constants";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Pressable } from "react-native";
import { useUpdateChecker } from "@/src/ui/widgets/global/hooks/use-update-checker";

export const AppInfoScreenView = () => {
	const { isChecking, checkAndReload } = useUpdateChecker();
	const appName = Constants.expoConfig?.name ?? "Enigma";
	const appVersion = Constants.expoConfig?.version ?? "N/A";

	const buildNumber = Platform.select({
		android: Constants.expoConfig?.android?.versionCode?.toString(),
		ios: Constants.expoConfig?.ios?.buildNumber,
		default: "N/A",
	});

	return (
		<View className="flex-1 bg-background-500 p-4 items-center">
			<Stack.Screen options={{ title: "Sobre o Enigma" }} />

			<Icon name="shield-check" size={80} color="primary" />

			<Text className="text-3xl font-bold text-accent-500">{appName}</Text>

			<Text className="text-base text-neutral-500 mt-2">
				Versão {appVersion} (Build {buildNumber})
			</Text>

			<Text className="text-center text-neutral-500 mt-10">
				© 2025 {appName}. Todos os direitos reservados.
			</Text>
		</View>
	);
};

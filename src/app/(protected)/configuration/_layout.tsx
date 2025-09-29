import { COLORS } from "@/src/constants";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function ConfigurationLayout() {
	const { colorScheme } = useColorScheme();
	const theme = COLORS[colorScheme || "light"];
	return (
		<Stack
			screenOptions={{
				title: "Configurações",
				headerStyle: { backgroundColor: theme.surface },
				headerTintColor: theme.accent,
				headerShadowVisible: false,
			}}
		/>
	);
}

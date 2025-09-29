import { COLORS } from "@/src/constants";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function VaultLayou() {
	const { colorScheme } = useColorScheme();
	const theme = COLORS[colorScheme || "light"];
	return (
		<Stack
			screenOptions={{
				title: "Meu cofre",
				headerStyle: { backgroundColor: theme.surface },
				headerTintColor: theme.accent,
				headerShadowVisible: false,
			}}
		/>
	);
}

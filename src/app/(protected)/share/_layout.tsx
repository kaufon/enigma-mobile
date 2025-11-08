import { COLORS } from "@/src/constants";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function Layout() {
	const { colorScheme } = useColorScheme();
	const theme = COLORS[colorScheme || "light"];
	return (
		<Stack
			screenOptions={{
				title: "Compartilhar",
				headerStyle: { backgroundColor: theme.surface },
				headerTintColor: theme.accent,
				headerShadowVisible: false,
			}}
		/>
	);
}

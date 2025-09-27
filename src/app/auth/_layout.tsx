import { COLORS } from "@/src/constants";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

const Layout = () => {
	const { colorScheme } = useColorScheme();
	const theme = COLORS[colorScheme || "light"];
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				headerStyle: { backgroundColor: theme.surface },
			}}
		/>
	);
};

export default Layout;

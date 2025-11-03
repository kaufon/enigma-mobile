import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { COLORS } from "@/src/constants";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
	const { authenticated } = useAuthContext();
	const { colorScheme } = useColorScheme();
	if (!authenticated) {
		return <Redirect href="/auth/sign-in" />;
	}
	const theme = COLORS[colorScheme || "light"];
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: theme.primary,
					headerShown: false,
					tabBarStyle: {
						backgroundColor: theme.surface,
						borderTopWidth: 0,
						elevation: 0,
					},
				}}
			>
				<Tabs.Screen
					name="vault"
					options={{
						title: "Meu cofre",
						tabBarIcon: ({ focused }) => (
							<Icon
								name="shield-user"
								color={focused ? "primary" : "neutral"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="generator"
					options={{
						title: "Gerador",
						tabBarIcon: ({ focused }) => (
							<Icon name="generator" color={focused ? "primary" : "neutral"} />
						),
					}}
				/>
				<Tabs.Screen
					name="emergency"
					options={{
						title: "Emergência",
						tabBarIcon: ({ focused }) => (
							<Icon name="safe" color={focused ? "primary" : "neutral"} />
						),
					}}
				/>
				<Tabs.Screen
					name="configuration"
					options={{
						title: "Configuração",
						tabBarIcon: ({ focused }) => (
							<Icon
								name="configuration"
								color={focused ? "primary" : "neutral"}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
}

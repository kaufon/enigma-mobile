import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";
import { Icon } from "@/src/ui/widgets/global/components/icon";


export default function TabLayout() {
	const { authenticated } = useAuthContext();

	if (!authenticated) {
		return <Redirect href="/auth/sign-in" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: `#599BFF`, 
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="vault"
				options={{
					title: "Meu cofre",
					tabBarIcon: ({ focused }) => (
						<Icon name="shield-user" color={focused ? "primary" : "neutral"} />
					),
				}}
			/>
			<Tabs.Screen
				name="password-generator"
				options={{
					title: "Gerador",
					tabBarIcon: ({ focused }) => (
						<Icon name="generator" color={focused ? "primary" : "neutral"} />
					),
				}}
			/>
			<Tabs.Screen
				name="configuration"
				options={{
					title: "Configuração",
					// 👇 E para o último também
					tabBarIcon: ({ focused }) => (
						<Icon
							name="configuration"
							color={focused ? "primary" : "neutral"}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

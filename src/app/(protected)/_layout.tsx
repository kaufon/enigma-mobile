import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
export default function TabLayout() {
	const { authenticated } = useAuthContext();

	if (!authenticated) {
		return <Redirect href="/auth/sign-in" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "blue",
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="vault"
				options={{
					title: "Meu cofre",
					tabBarIcon: ({ color }) => <TabBarIcon name="key" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="password-generator" 
				options={{
					title: "Gerador",
					tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="configuration" 
				options={{
					title: "Configuração",
					tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
				}}
			/>
		</Tabs>
	);
}

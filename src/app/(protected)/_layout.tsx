import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { COLORS } from "@/src/constants";
import { Icon as GlueIcon } from "@/src/ui/gluestack/icon";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable } from "@/src/ui/widgets/global/components/pressable";
import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetItem,
	ActionsheetItemText,
} from "@/src/ui/gluestack/actionsheet";

export default function TabLayout() {
	const { authenticated, signOut } = useAuthContext();
	const { colorScheme } = useColorScheme();
	const [isMenuOpen, setMenuOpen] = useState(false); // 👈 2. Estado para controlar o menu
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

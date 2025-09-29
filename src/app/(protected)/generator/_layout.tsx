import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useColorScheme } from "nativewind";
import { COLORS } from "@/src/constants";
import PasswordScreen from "./password";
import PassphraseScreen from "./passphrase";
import UsernameGeneratorScreen from "./username";
import { Text, View } from "@/src/ui/widgets/global/components/Themed";
import { TouchableOpacity } from "react-native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

const TopTabs = createMaterialTopTabNavigator();

export function CustomTabBar({
	state,
	descriptors,
	navigation,
}: MaterialTopTabBarProps) {
	const { colorScheme } = useColorScheme();
	const theme = COLORS[colorScheme || "light"];

	return (
		<View className="mt-4 mx-4 p-1 rounded-full bg-surface-500 flex-row">
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label = options.title !== undefined ? options.title : route.name;
				const isFocused = state.index === index;
				const isFirst = index === 0;
				const isLast = index === state.routes.length - 1;
				const isMiddle = !isFirst && !isLast;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				return (
					<TouchableOpacity
						key={route.key}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						className={`flex-1 items-center p-2 ${isFirst ? "rounded-l-full" : "rounded-l-none"}  ${isLast ? "rounded-r-full" : "rounded-r-none"}  justify-center`}
						style={{
							backgroundColor: isFocused ? theme.primary : theme.surface,
						}}
					>
						<Text
							className="font-bold text-center capitalize"
							style={{
								color: isFocused ? theme.accent : theme.neutral,
								fontSize: 14,
							}}
						>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default function GeneratorLayout() {
	return (
		<View className="flex-1 bg-background-500">
			<View className="pt-14 pb-4 px-4 bg-surface-500">
				<Text className="text-3xl text-accent-500 font-bold">Gerador</Text>
			</View>

			<TopTabs.Navigator
				initialRouteName="password"
				tabBar={(props) => <CustomTabBar {...props} />}
			>
				<TopTabs.Screen
					name="password"
					component={PasswordScreen}
					options={{ title: "Senha" }}
				/>
				<TopTabs.Screen
					name="passphrase"
					component={PassphraseScreen}
					options={{ title: "Frase Secreta" }}
				/>
				<TopTabs.Screen
					name="username"
					component={UsernameGeneratorScreen}
					options={{ title: "Nome de usuario" }}
				/>
			</TopTabs.Navigator>
		</View>
	);
}

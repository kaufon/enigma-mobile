import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GluestackUIProvider } from "@/src/ui/gluestack/gluestack-ui-provider";
import { useColorScheme } from "react-native";
import { Slot } from "expo-router";

import "../ui/styles/global.css";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	const [styleLoaded, setStyleLoaded] = useState(false);
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
			<ThemeProvider value={DarkTheme}>
				<Slot />
			</ThemeProvider>
		</GluestackUIProvider>
	);
}

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Slot } from "expo-router";

import "../ui/styles/global.css";
import { AuthContextProvider } from "@/src/ui/widgets/auth/contexts/auth-context";
import { UiProvider } from "@/src/ui/gluestack/ui-provider";
import { ToastProvider } from "@/src/ui/widgets/global/components/toast/toast-provider";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
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
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ToastProvider>
				<UiProvider>
					<ThemeProvider value={DarkTheme}>
						<AuthContextProvider>
							<Slot />
						</AuthContextProvider>
					</ThemeProvider>
				</UiProvider>
			</ToastProvider>
		</GestureHandlerRootView>
	);
}

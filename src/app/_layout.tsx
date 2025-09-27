import FontAwesome from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Garanta que este import exista
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Slot } from "expo-router";

import "../ui/styles/global.css";
import { AuthContextProvider } from "@/src/ui/widgets/auth/contexts/auth-context";
import { UiProvider } from "@/src/ui/gluestack/ui-provider";
import { toastConfig } from "@/src/ui/styles/toast.config";

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

//@TODO: antes de buildar, configurar o toast
function RootLayoutNav() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<UiProvider>
				<ThemeProvider value={DarkTheme}>
					<AuthContextProvider>
						<Slot />
					</AuthContextProvider>
				</ThemeProvider>
			</UiProvider>
		</GestureHandlerRootView>
	);
}

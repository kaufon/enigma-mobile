import { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLORS } from "@/src/constants";

export const toastConfig = {
	success: (props) => (
		<BaseToast
			{...props}
			style={{
				borderLeftColor: COLORS.dark.primary,
				backgroundColor: COLORS.dark.surface,
			}}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 16,
				fontWeight: "bold",
				color: COLORS.dark.accent,
			}}
			text2Style={{ fontSize: 14, color: COLORS.dark.neutral }}
		/>
	),
	error: (props) => (
		<ErrorToast
			{...props}
			style={{
				borderLeftColor: COLORS.dark.danger,
				backgroundColor: COLORS.dark.surface,
			}}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 16,
				fontWeight: "bold",
				color: COLORS.dark.accent,
			}}
			text2Style={{ fontSize: 14, color: COLORS.dark.neutral }}
		/>
	),
};

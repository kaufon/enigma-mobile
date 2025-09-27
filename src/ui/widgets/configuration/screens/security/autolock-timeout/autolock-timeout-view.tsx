import { View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Pressable } from "@/src/ui/widgets/global/components/pressable";
import { Icon } from "@/src/ui/widgets/global/components/icon";

const TIMEOUT_OPTIONS = [
	{ label: "1 Minuto", value: 1 },
	{ label: "5 Minutos", value: 5 },
	{ label: "15 Minutos", value: 15 },
	{ label: "30 Minutos", value: 30 },
	{ label: "45 Minutos", value: 45 },
	{ label: "1 hora", value: 60 },
	{ label: "4 horas", value: 240 },
	{ label: "Nunca", value: 999999 },
];
type Props = {
	currentTimeout: number | undefined;
	handleUpdateTime: (minutes: number | null) => void;
};
export default function AutoLockScreenView({
	currentTimeout,
	handleUpdateTime,
}: Props) {
	return (
		<View className="flex-1 bg-background-500 pt-4">
			<Stack.Screen options={{ title: "Auto-Bloqueio" }} />

			<Text className="text-neutral-500 mb-2 px-4">
				Bloquear o aplicativo automaticamente após um período de inatividade.
			</Text>

			<View className="bg-surface-500 rounded-lg mx-4 mt-2">
				{TIMEOUT_OPTIONS.map((option, index) => (
					<Pressable
						key={option.label}
						onPress={() => handleUpdateTime(option.value)}
						className={`flex-row items-center justify-between p-4 ${
							index < TIMEOUT_OPTIONS.length - 1
								? "border-b border-background-500"
								: ""
						}`}
					>
						<Text className="text-accent-500 text-base">{option.label}</Text>

						<Icon
							name={currentTimeout === option.value ? "circle-check" : "circle"}
							size={22}
							color={
								currentTimeout === option.value ? 'primary' : 'neutral'
							}
						/>
					</Pressable>
				))}
			</View>
		</View>
	);
}

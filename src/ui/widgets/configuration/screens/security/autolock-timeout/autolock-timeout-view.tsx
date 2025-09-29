import { View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { AutoLockSelect } from "@/src/ui/widgets/configuration/componentes/autolock-select";

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
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Auto-Bloqueio" }} />

			<Text className="text-neutral-500 mb-2">
				Bloquear o aplicativo automaticamente após um período de inatividade.
			</Text>

			<AutoLockSelect
				label="Tempo para bloqueio"
				options={TIMEOUT_OPTIONS}
				currentValue={currentTimeout}
				onSelect={handleUpdateTime}
			/>
		</View>
	);
}

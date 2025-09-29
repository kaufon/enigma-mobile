import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Pressable, View } from "react-native";

export const SelectInputView = ({
	label,
	value,
}: { label: string; value: string }) => (
	<View className="my-2">
		<Text className="text-neutral-500 mb-2">{label}</Text>
		<Pressable className="bg-background-500 p-3 rounded-md flex-row justify-between items-center border border-neutral-500/20">
			<Text className="text-accent-500">{value}</Text>
			<Icon name="arrow-down" size={16} />
		</Pressable>
	</View>
);

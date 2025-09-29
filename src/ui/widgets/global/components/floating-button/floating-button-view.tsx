import { Pressable } from "react-native";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { IconName } from "@/src/ui/widgets/global/components/icon/types";

type Props = {
	onPress: () => any;
	iconName: IconName;
};

export const FloatingActionButtonView = ({ onPress, iconName }: Props) => {
	return (
		<Pressable
			className="absolute bottom-6 right-6 bg-primary-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
			onPress={onPress}
		>
			<Icon name={iconName} size={24} color="accent" />
		</Pressable>
	);
};

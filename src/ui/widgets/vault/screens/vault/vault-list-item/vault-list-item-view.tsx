import { Link, type Href } from "expo-router";
import { Pressable, View } from "react-native";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import type { IconName } from "@/src/ui/widgets/global/components/icon/types";

type Props = {
	label: string;
	iconName: IconName;
	count?: number;
	href: Href;
	hasBottomBorder?: boolean;
	onDelete?: VoidFunction
	showDelete?: boolean;
};

export const VaultListItemView = ({
	label,
	iconName,
	count,
	href,
	hasBottomBorder = true,
	onDelete,
	showDelete = false,
}: Props) => (
	<Link href={href} asChild>
		<Pressable
			className={`bg-surface-500 flex-row rounded-lg m-1 items-center justify-between p-4 ${hasBottomBorder ? "border-b border-neutral-500/20" : ""}`}
		>
			<View className="flex-row items-center space-x-4 gap-3 py-3 flex-1">
				<Icon name={iconName} size={20} color="accent" />
				<Text className="text-accent-500 font-bold">{label}</Text>
			</View>
			{showDelete && (
				<Pressable
					onPress={onDelete}
					className="p-2"
				>
					<Icon name="trash" size={20} color="danger" />
				</Pressable>
			)}
		</Pressable>
	</Link>
);

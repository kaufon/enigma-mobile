import { Pressable, View } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import type { CredentialDto } from "@/src/core/dtos/credentials";

type Props = {
	credential: CredentialDto;
	onPress: () => void;
	onEdit: () => void;
	onDelete: () => void;
	showEdit?: boolean;
	showDelete?: boolean;
};

export const CredentialListItemView = ({
	credential,
	onPress,
	onDelete,
	onEdit,
	showEdit = true,
	showDelete = true,
}: Props) => {
	return (
		<Pressable
			onPress={onPress}
			className="bg-surface-500 rounded-lg m-1 flex-row items-center"
		>
			<View className="flex-row items-center space-x-4 py-3 flex-1">
				<View className="p-3 rounded-full ml-2">
					<Icon name="globe" size={24} />
				</View>
				<View className="flex-1">
					<Text className="font-bold text-accent-500 text-base">
						{credential.title}
					</Text>
					<Text className="text-neutral-500 text-sm">
						{credential.username}
					</Text>
				</View>
			</View>

			<View className="flex-row items-center p-2">
				{showEdit && (
					<Pressable onPress={onEdit} className="p-2">
						<Icon name="pen" size={20} />
					</Pressable>
				)}
				{showDelete && (
					<Pressable onPress={onDelete} className="p-2">
						<Icon name="trash" size={20} />
					</Pressable>
				)}
			</View>
		</Pressable>
	);
};

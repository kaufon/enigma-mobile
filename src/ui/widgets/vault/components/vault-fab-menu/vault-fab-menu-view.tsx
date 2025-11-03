import { useState } from "react";
import { Pressable, View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import type { IconName } from "@/src/ui/widgets/global/components/icon/types";

const FabMenuItem = ({
	label,
	iconName,
	onPress,
}: {
	label: string;
	iconName: IconName;
	onPress: () => void;
}) => (
	<Pressable
		onPress={onPress}
		className="flex-row items-center justify-end my-2"
	>
		<View className="bg-surface-500 p-2 rounded-md shadow-md mr-4">
			<Text className="text-accent-500 font-semibold">{label}</Text>
		</View>
		<View className="bg-surface-500 w-12 h-12 rounded-full items-center justify-center shadow-lg">
			<Icon name={iconName} size={20} className="text-neutral-500" />
		</View>
	</Pressable>
);

type FabMenuItemProp = {
	label: string;
	iconName: IconName;
	href: Href<string>;
};

type Props = {
	items: FabMenuItemProp[];
};

export const VaultFabMenuView = ({ items }: Props) => {
	const [isOpen, setOpen] = useState(false);
	const router = useRouter();

	const toggleMenu = () => setOpen(!isOpen);

	const handleNavigate = (href: Href<string>) => {
		setOpen(false);
		router.push(href);
	};

	return (
		<View className="absolute bottom-6 right-6 items-end">
			{isOpen && (
				<Pressable
					className="absolute inset-0 bg-black/30"
					style={{ right: -24, bottom: -24, top: -1000, left: -1000 }}
					onPress={toggleMenu}
				/>
			)}

			{isOpen && (
				<View className="mb-4">
					{items.map((item) => (
						<FabMenuItem
							key={item.label}
							label={item.label}
							iconName={item.iconName}
							onPress={() => handleNavigate(item.href)}
						/>
					))}
				</View>
			)}

			<Pressable
				className="bg-primary-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
				onPress={toggleMenu}
			>
				<Icon name={isOpen ? "x" : "plus"} size={24} color="accent" />
			</Pressable>
		</View>
	);
};

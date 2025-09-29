import { useState } from "react";
import { Pressable, View, Modal, FlatList } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";

type Option = {
	label: string;
	value: number | null;
};

type Props = {
	label: string;
	options: Option[];
	currentValue: number | null | undefined;
	onSelect: (value: number | null) => void;
};

export const AutoLockSelectView = ({
	label,
	options,
	currentValue,
	onSelect,
}: Props) => {
	const [isModalVisible, setModalVisible] = useState(false);

	const selectedOptionLabel =
		options.find((o) => o.value === currentValue)?.label || "Nunca";

	const handleSelect = (value: number | null) => {
		onSelect(value);
		setModalVisible(false);
	};

	return (
		<>
			<View className="my-2">
				<Text className="text-neutral-500 mb-2">{label}</Text>
				<Pressable
					onPress={() => setModalVisible(true)}
					className="bg-background-500 p-3 h-16 rounded-md flex-row justify-between items-center border border-neutral-500/20"
				>
					<Text className="text-accent-500 text-base">
						{selectedOptionLabel}
					</Text>
					<Icon name="arrow-down" size={16} color="neutral" />
				</Pressable>
			</View>

			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<Pressable
					className="flex-1 bg-black/60 justify-center items-center"
					onPress={() => setModalVisible(false)}
				>
					<View className="bg-surface-500 rounded-2xl max-h-[60%] w-[90%]">
						<View className="p-4 border-b border-neutral-500/20 items-center">
							<Text className="text-lg font-bold text-accent-500">
								Selecionar Tempo
							</Text>
						</View>
						<FlatList
							data={options}
							keyExtractor={(item) => item.label}
							renderItem={({ item }) => (
								<Pressable
									onPress={() => handleSelect(item.value)}
									className="flex-row items-center justify-between p-4 border-b border-neutral-500/10"
								>
									<Text className="text-accent-500 text-base">
										{item.label}
									</Text>
									{currentValue === item.value && (
										<Icon name="check" size={20} color="primary" />
									)}
								</Pressable>
							)}
						/>
					</View>
				</Pressable>
			</Modal>
		</>
	);
};

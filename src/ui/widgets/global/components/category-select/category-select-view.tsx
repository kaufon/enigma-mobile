import { useState } from "react";
import { useController } from "react-hook-form";
import { Pressable, View, Modal, FlatList } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import type { FolderDto } from "@/src/core/dtos/folder";

type Props = {
	control: any;
	name: string;
	label: string;
	folders: FolderDto[];
};

export const CategorySelect = ({ control, name, label, folders }: Props) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const { field } = useController({ control, name });

	const selectedFolderName =
		folders.find((f) => f.id === field.value)?.name || "Nenhuma pasta";

	const handleSelect = (folderId: string | undefined) => {
		field.onChange(folderId ? folderId : null);
		setModalVisible(false);
	};

	return (
		<>
			<View className="my-2">
				<Text className="text-neutral-500 mb-2">{label}</Text>
				<Pressable
					onPress={() => setModalVisible(true)}
					className="bg-background-500-500 p-3 h-16 rounded-md flex-row justify-between items-center border border-neutral-500/20"
				>
					<Text className="text-accent-500 text-base">
						{selectedFolderName}
					</Text>
					<Icon name="arrow-down" size={16} color="accent" />
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
					<View className="bg-surface-500 rounded-t-2xl max-h-[50%] w-[90%]">
						<View className="p-4 border-b border-neutral-500/20 items-center">
							<Text className="text-lg font-bold text-accent-500">
								Selecionar Pasta
							</Text>
						</View>
						<FlatList
							data={[{ id: undefined, name: "Nenhuma pasta" }, ...folders]}
							keyExtractor={(item) => item.id || "none"}
							renderItem={({ item }) => (
								<Pressable
									onPress={() => handleSelect(item.id)}
									className="flex-row items-center justify-between p-4 border-b border-neutral-500/10"
								>
									<View className="flex-row items-center space-x-3 gap-4">
										<Icon name={item.id ? "folder" : "tag"} size={20} />
										<Text className="text-accent-500 text-base">
											{item.name}
										</Text>
									</View>
									{field.value === item.id && (
										<Icon name="circle-check" size={20} color="primary" />
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

import { useState } from "react";
import { useController } from "react-hook-form";
import { Pressable, View } from "react-native";
import {
	ActionsheetItem,
	ActionsheetItemText,
} from "@/src/ui/gluestack/actionsheet";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Sheet } from "@/src/ui/widgets/global/components/action-sheet";
import type { FolderDto } from "@/src/core/dtos/folder";
import { Box } from "@/src/ui/gluestack/box"; // 👈 Importe o Box para layout

type Props = {
	control: any;
	name: string;
	label: string;
	folders: FolderDto[];
};

export const CategorySelect = ({ control, name, label, folders }: Props) => {
	const [isSheetOpen, setSheetOpen] = useState(false);

	const { field } = useController({ control, name });

	const selectedFolderName =
		folders.find((f) => f.id === field.value)?.name || "Nenhuma pasta";

	return (
		<>
			<View className="my-2">
				<Text className="text-neutral-500 mb-2">{label}</Text>
				<Pressable
					onPress={() => setSheetOpen(true)}
					className="bg-background-500 p-3 h-16 justify-center rounded-md flex-row items-center border border-neutral-500/20"
				>
					<View className="flex-row items-center justify-between  w-full">
						<Text className="text-accent-500 text-lg">
							{selectedFolderName}
						</Text>
						<Icon name="arrow-down" size={16} />{" "}
					</View>
				</Pressable>
			</View>

			<Sheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)}>
				<Box className="border border-t border-primary-500 rounded-lg rounded-t-2xl max-h-96 w-full mt-20">
					<ActionsheetItem
						onPress={() => {
							field.onChange(undefined);
							setSheetOpen(false);
						}}
						className="bg-surface-500 flex-row items-center p-4 border-b border-primary-500/20"
					>
						<Box className="flex-row items-center space-x-4 gap-4">
							<Icon name="note" size={20} />
							<ActionsheetItemText className="text-accent-500">
								Nenhuma pasta
							</ActionsheetItemText>
						</Box>
					</ActionsheetItem>

					{folders.map((folder) => (
						<ActionsheetItem
							key={folder.id}
							onPress={() => {
								field.onChange(folder.id);
								setSheetOpen(false);
							}}
							className="bg-surface-500 flex-row items-center p-4 border-b border-primary-500/20"
						>
							<Box className="flex-row items-center space-x-4 gap-4">
								<Icon name="folder" size={20} />
								<ActionsheetItemText className="text-accent-500">
									{folder.name}
								</ActionsheetItemText>
							</Box>
						</ActionsheetItem>
					))}
				</Box>
			</Sheet>
		</>
	);
};

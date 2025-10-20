import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import * as Clipboard from "expo-clipboard";
import { useToast } from "@/src/hooks/use-toast";
import type { SafeNoteDto } from "@/src/core/dtos/safe-note"; 
import { useState } from "react";

type Props = {
	note: SafeNoteDto;
	isLoading: boolean;
	handleDelete: VoidFunction;
	handleEdit: VoidFunction;
	folderName?: string;
};

export const SafeNoteDetailsView = ({
	note,
	isLoading,
	handleEdit,
	handleDelete,
}: Props) => {
	const { show } = useToast();
	const [isVisible, setIsVisible] = useState(false); 

	const copyContentToClipboard = async () => {
		if (!note?.content) return;
		await Clipboard.setStringAsync(note.content);
		show("Conteúdo copiado!", "success");
	};

	if (isLoading) {
		return (
			<ActivityIndicator size="large" className="flex-1 bg-background-500" />
		);
	}

	if (!note) {
		return (
			<Text className="text-center mt-8 text-neutral-500">
				Nota não encontrada.
			</Text>
		);
	}
	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};
	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen
				options={{
					title: note.title,
				}}
			/>

			<ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
				<View className="px-4 pt-4 mb-4">
					<Text className="text-2xl font-bold text-accent-500 mb-1">
						{note.title}
					</Text>
				</View>

				<View className="mx-4 bg-surface-500 rounded-xl p-4">
					<Text
						selectable={true}
						className="text-base text-accent-500 leading-6"
					>
						{isVisible ? note.content : "•••••••••••••••••••••••••"}
					</Text>
				</View>

				<View className="mt-6 mx-4 flex-col gap-4 justify-center space-x-4">
					<Pressable
						onPress={toggleVisibility}
						className="bg-neutral-500/10 p-3 rounded-lg gap-4 flex-1 items-center justify-center flex-row space-x-2"
					>
						<Icon
							name={isVisible ? "eye-close" : "eye-open"}
							size={18}
							color="neutral"
						/>
						<Text className="text-neutral-500 font-bold">
							{isVisible ? "Ocultar" : "Mostrar"}
						</Text>
					</Pressable>

					<Pressable
						onPress={copyContentToClipboard}
						className="bg-primary-500/10 p-3 rounded-lg flex-1 gap-4 items-center justify-center flex-row space-x-2"
					>
						<Icon name="copy" size={18} color="primary" />
						<Text className="text-primary-500 font-bold">Copiar</Text>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
};

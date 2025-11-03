import { ActivityIndicator, FlatList, View } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { FloatingActionButton } from "@/src/ui/widgets/global/components/floating-button";
import { useNavigation } from "@/src/ui/widgets/global/hooks";
import type { SafeNoteDto } from "@/src/core/dtos/safe-note";
import { SafeNoteListItem } from "@/src/ui/widgets/vault/screens/safe-notes/safe-notes-list/safe-note-list-item";

type Props = {
	safeNotes: SafeNoteDto[];
	isLoading: boolean;
	onSelectCredential: (id: string) => void;
	onDeleteCredential: (id: string) => void;
	onEditCredential: (id: string) => void;
	onSucess: VoidFunction;
	showEdit?: boolean;
	showDelete?: boolean;
	showFab?: boolean;
};

const ListSeparator = () => <View className="h-px bg-surface-500" />;

export const SafeNoteListView = ({
	safeNotes: credentials,
	isLoading,
	onSelectCredential,
	onDeleteCredential,
	onEditCredential,
	showEdit = true,
	showDelete = true,
	showFab = true,
}: Props) => {
	const { navigate } = useNavigation();

	if (isLoading) {
		return <ActivityIndicator size="large" className="flex-1" />;
	}

	return (
		<View className="flex-1 bg-background-500">
			<FlatList
				data={credentials}
				keyExtractor={(item) => item.id as string}
				renderItem={({ item }) => (
					<SafeNoteListItem
						showEdit={showEdit}
						showDelete={showDelete}
						safeNote={item}
						onPress={() => onSelectCredential(item.id as string)}
						onDelete={() => onDeleteCredential(item.id as string)}
						onEdit={() => onEditCredential(item.id as string)}
					/>
				)}
				ItemSeparatorComponent={ListSeparator}
				ListEmptyComponent={
					<Text className="text-center mt-8 text-neutral-500">
						Nenhuma nota segura encontrada.
					</Text>
				}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
			/>

			{showFab && (
				<FloatingActionButton
					onPress={() => navigate("/vault/safe-notes/create")}
					iconName="plus"
				/>
			)}
		</View>
	);
};

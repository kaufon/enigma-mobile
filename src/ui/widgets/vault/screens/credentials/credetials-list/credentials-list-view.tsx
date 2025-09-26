import { ActivityIndicator, FlatList, View } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { CredentialListItem } from "./credential-list-item";
import type { CredentialDto } from "@/src/core/dtos/credentials";
import { useState } from "react"; // Use o hook de estado do React
import { FloatingActionButton } from "@/src/ui/widgets/global/components/floating-button";
import { RegisterCredentialForm } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/register-credential-form";
import { useNavigation } from "@/src/ui/widgets/global/hooks";

type Props = {
	credentials: CredentialDto[];
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

export const CredentialsListView = ({
	credentials,
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
					<CredentialListItem
						showEdit={showEdit}
						showDelete={showDelete}
						credential={item}
						onPress={() => onSelectCredential(item.id as string)}
						onDelete={() => onDeleteCredential(item.id as string)}
						onEdit={() => onEditCredential(item.id as string)}
					/>
				)}
				ItemSeparatorComponent={ListSeparator}
				ListEmptyComponent={
					<Text className="text-center mt-8 text-neutral-500">
						Nenhuma credencial encontrada.
					</Text>
				}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
			/>

			{showFab && (
				<FloatingActionButton
					onPress={() => navigate("/vault/credentials/create")}
					iconName="plus"
				/>
			)}
		</View>
	);
};

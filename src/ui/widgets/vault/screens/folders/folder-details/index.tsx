import { Pressable } from "@/src/ui/gluestack/pressable";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { View } from "@/src/ui/widgets/global/components/Themed";
import { CredentialsListView } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/credentials-list-view";
import { useFolderDetailsViewModel } from "@/src/ui/widgets/vault/screens/folders/folder-details/use-folder-details";
import { View as ReactNativeView } from "react-native";
import { Link } from "expo-router";
import { Stack } from "expo-router";
import { useCallback } from "react";

type Props = {
	id: string;
};

export const FolderDetails = ({ id }: Props) => {
	const {
		isLoading,
		folder,
		credentials,
		handleSelectCredential,
		handleDeleteFolder,
	} = useFolderDetailsViewModel(id);
	const handleEmptyAction = useCallback(() => {}, []);
	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen
				options={{
					title: folder?.name || "Detalhes da pasta",
					headerRight: () => (
						<ReactNativeView className="flex-row items-center space-x-2 pr-2">
							<Link href={`/vault/folders/${id}/edit`} asChild>
								<Pressable className="p-2">
									<Icon name="pen" size={22} color="accent" />
								</Pressable>
							</Link>
							<Pressable onPress={handleDeleteFolder} className="p-2">
								<Icon name="trash" size={22} color="danger" />
							</Pressable>
						</ReactNativeView>
					),
				}}
			/>
			<CredentialsListView
				isLoading={isLoading}
				showFab={false}
				credentials={credentials}
				onSelectCredential={handleSelectCredential}
				onDeleteCredential={handleEmptyAction}
				onEditCredential={handleEmptyAction}
				onSucess={handleEmptyAction}
				showEdit={false}
				showDelete={false}
			/>
		</View>
	);
};

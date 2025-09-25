import { ActivityIndicator, ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import { FloatingActionButton } from "@/src/ui/widgets/global/components/floating-button";
import { VaultSectionHeader } from "@/src/ui/widgets/vault/components/vault-section-header";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";
import type { FolderDto } from "@/src/core/dtos/folder";
import { VaultFabMenu } from "@/src/ui/widgets/vault/components/vault-fab-menu";

type Props = {
	folders: FolderDto[];
	isLoading: boolean;
};

export const VaultScreenView = ({ folders, isLoading }: Props) => {
	if (isLoading) {
		return <ActivityIndicator size="large" className="flex-1" />;
	}

	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen options={{ title: "Meu Cofre" }} />

			<ScrollView>
				<VaultSectionHeader title="Tipos" count={2} />
				<View className="bg-surface-500 rounded-lg mx-4">
					<VaultListItem
						label="Login"
						iconName="globe"
						count={5}
						href="/vault/credentials"
					/>
				</View>

				<VaultSectionHeader title="Pastas" count={folders.length} />
				<View className="bg-surface-500 rounded-lg mx-4">
					{folders.map((folder) => (
						<VaultListItem
							key={folder.id}
							label={folder.name}
							iconName="folder"
							count={1}
							href={`/(protected)/vault/folders/${folder.id}`}
						/>
					))}
				</View>
			</ScrollView>

			<VaultFabMenu />
		</View>
	);
};

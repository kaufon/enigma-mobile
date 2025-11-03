import { ActivityIndicator, ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import { VaultSectionHeader } from "@/src/ui/widgets/vault/components/vault-section-header";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";
import type { FolderDto } from "@/src/core/dtos/folder";
import { VaultFabMenu } from "@/src/ui/widgets/vault/components/vault-fab-menu";
import { Menu } from "@/src/ui/widgets/global/components/menu/menu-view";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";

type Props = {
	folders: FolderDto[];
	isLoading: boolean;
};
const vaultMenuItems = [
  { label: "Nova Pasta", iconName: "folder", href: "/vault/folders/create" },
  { label: "Nova Credencial", iconName: "password", href: "/vault/credentials/create" },
  { label: "Nova Nota Segura", iconName: "safe-note", href: "/vault/safe-notes/create" }
];
export const VaultScreenView = ({ folders, isLoading }: Props) => {
	if (isLoading) {
		return <ActivityIndicator size="large" className="flex-1" />;
	}
	const { signOut } = useAuthContext();

	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen
				options={{
					title: "Meu Cofre",
					headerRight: () => (
						<Menu>
							<Menu.Trigger>
								<View className="pr-4">
									<Icon name="three-dots-vertical" size={22} color="accent" />
								</View>
							</Menu.Trigger>
							<Menu.Content>
								<Menu.Item onPress={signOut} iconName="lock" color="danger">
									Bloquear
								</Menu.Item>
							</Menu.Content>
						</Menu>
					),
				}}
			/>

			<ScrollView>
				<VaultSectionHeader title="Tipos" count={2} />
				<View className="bg-surface-500 rounded-lg mx-4">
					<VaultListItem
						label="Login"
						iconName="globe"
						count={5}
						href="/vault/credentials"
					/>
					<VaultListItem
						label="Nota segura"
						iconName="safe-note"
						count={5}
						href="/vault/safe-notes"
            hasBottomBorder={false}
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

			<VaultFabMenu items={vaultMenuItems} />
		</View>
	);
};

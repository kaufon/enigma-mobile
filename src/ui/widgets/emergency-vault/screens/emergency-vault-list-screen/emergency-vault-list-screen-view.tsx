import type { CredentialDto } from "@/src/core/dtos/credentials";
import type { SafeNoteDto } from "@/src/core/dtos/safe-note";
import { useEmergencyVault } from "@/src/ui/widgets/emergency-vault/contexts/emergency-vault-context";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { VaultFabMenu } from "@/src/ui/widgets/vault/components/vault-fab-menu";
import { VaultListItem } from "@/src/ui/widgets/vault/screens/vault/vault-list-item";
import { View, FlatList } from "react-native";

const isCredential = (
	item: CredentialDto | SafeNoteDto,
): item is CredentialDto => {
	return (item as CredentialDto).username !== undefined;
};

const vaultMenuItems = [
	{
		label: "Nova Credencial Emergencial",
		iconName: "password",
		href: "/emergency/create-credential",
	},
	{
		label: "Nova Nota Segura Emergencial",
		iconName: "safe-note",
		href: "/emergency/create-note",
	},
];
export const EmergencyListView = () => {
	const { items, handleDeleteItem } = useEmergencyVault();

	return (
		<View className="flex-1 bg-background-500">
			<FlatList
				data={items}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<VaultListItem
						label={item.title}
						iconName={isCredential(item) ? "globe" : "safe-note"}
						href={
							isCredential(item)
								? `/vault/credentials/${item.id}`
								: `/vault/safe-notes/${item.id}`
						}
						onDelete={() => handleDeleteItem(item)}
						showDelete={true}
					/>
				)}
				ListEmptyComponent={
					<Text className="text-center mt-8 text-neutral-500">
						Nenhum item de emergência encontrado.
					</Text>
				}
				contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
			/>

			<VaultFabMenu items={vaultMenuItems} />
		</View>
	);
};

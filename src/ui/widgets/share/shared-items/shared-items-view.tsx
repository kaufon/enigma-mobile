import { View, FlatList, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { ButtonText } from "@/src/ui/gluestack/button";
import type { ShareItemDto } from "@/src/core/dtos/share-item";
import { Button } from "@/src/ui/widgets/global/components/button";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { Pressable } from "react-native";

type Props = {
	shares: ShareItemDto[];
	isLoading: boolean;
	handleRevokeShare: (id: string, title: string) => void;
	handleCopyshareLink: (id: string, hash: string) => void;
	handleViewSharedItem: (id: string, hash: string) => void;
};

export const SharedItemsScreenView = ({
	shares,
	isLoading,
	handleRevokeShare,
	handleCopyshareLink,
  handleViewSharedItem
}: Props) => {
	if (isLoading) return <ActivityIndicator />;

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		};
		const date = new Date(dateString);
		return date.toLocaleDateString("pt-BR", options);
	};

	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen options={{ title: "Itens Compartilhados" }} />
			<FlatList
				data={shares}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={
					<Text className="text-center mt-8 text-neutral-500">
						Você não compartilhou nenhum item.
					</Text>
				}
				renderItem={({ item }) => (
					<Pressable onPress={() => handleViewSharedItem(item.id, item.hash)}>
						<View className="bg-surface-500 p-4 m-2 rounded-lg flex-row items-center justify-between gap-2">
							<View className="mr-2">
								<Text className="text-accent-500 font-bold" numberOfLines={1}>
									{item.title}
								</Text>
								<Text className="text-neutral-500 text-xs">
									{item.deleteOnRead
										? "Expira após 1 visualização"
										: `Expira em: ${item.expiresAt ? formatDate(item.expiresAt) : "Nunca"}`}
								</Text>
							</View>

							<View className="flex-row w-36 gap-2">
								<Button
									variant="outline"
									className="border-primary-500 bg-primary-500 w-12 h-12 items-center justify-center p-0"
									onPress={() => handleCopyshareLink(item.id, item.hash)}
								>
									<View className="w-full justify-end items-end">
										<Icon name="copy" size={18} color="accent" />
									</View>
								</Button>

								<Button
									variant="outline"
									className="border-danger-500 bg-danger-500 w-12 h-12 items-center justify-center"
									onPress={() => handleRevokeShare(item.id, item.title)}
								>
									<View className="w-full justify-end items-end">
										<Icon name="trash" size={18} color="accent" />
									</View>
								</Button>
							</View>
						</View>
					</Pressable>
				)}
			/>
		</View>
	);
};

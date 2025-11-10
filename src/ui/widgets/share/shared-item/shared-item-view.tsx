import { ActivityIndicator, Pressable, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import * as Clipboard from "expo-clipboard";
import { useToast } from "@/src/hooks/use-toast";
import { useState } from "react";
import { CredentialDto } from "@/src/core/dtos/credentials";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";

const DetailField = ({
	label,
	value,
	isSecret = false,
}: { label: string; value?: string; isSecret?: boolean }) => {
	const { show } = useToast();
	const [isVisible, setIsVisible] = useState(false);

	const copyToClipboard = async () => {
		if (!value) return;
		await Clipboard.setString(value);
		show(`${label} copiado!`, "success");
	};

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	if (!value) return null;

	return (
		<View className="my-3">
			<Text className="text-xs uppercase text-neutral-500">{label}</Text>
			<View className="flex-row items-center justify-between">
				<Text className="text-lg text-accent-500">
					{isSecret && !isVisible ? "••••••••••••" : value}
				</Text>

				<View className="flex-row items-center space-x-2">
					{isSecret && (
						<Pressable onPress={toggleVisibility} className="p-2">
							<Icon name={isVisible ? "eye-open" : "eye-close"} size={20} />
						</Pressable>
					)}
					<Pressable onPress={copyToClipboard} className="p-2">
						<Icon name="copy" size={20} />
					</Pressable>
				</View>
			</View>
		</View>
	);
};
type Props = {
	isLoading: boolean;
	credential: Partial<CredentialDto> | null;
	error: string | null;
  isOwner: boolean;
};
export const SharedItemScreenView = ({
	isLoading,
	credential,
	error,
  isOwner,
}: Props) => {
	const router = useRouter();

	const goBackToVault = () => {
		router.replace("/(protected)/share");
	};

	if (isLoading) {
		return (
			<ActivityIndicator size="large" className="flex-1 bg-background-500" />
		);
	}

	if (error) {
		return (
			<View className="flex-1 bg-background-500 p-4 items-center justify-center">
				<Icon name="danger" size={40} color="danger" />
				<Text className="text-lg font-bold text-accent-500">
					Erro ao carregar item
				</Text>
				<Text className="text-neutral-500 text-center mt-2">{error}</Text>
			</View>
		);
	}

	if (!credential) {
		return <Text>Item não encontrado.</Text>;
	}

	return (
		<View className="flex-1 bg-background-500 p-4">
			<Text className="text-2xl font-bold text-accent-500 mb-4">
				{credential.title}
			</Text>
			<Stack.Screen
				options={{
					title: "Item Compartilhado",
					headerRight: () =>
						!isOwner && (
							<Pressable onPress={goBackToVault} className="pr-4">
								<Text className="text-primary-500 text-base font-bold">
									Fechar
								</Text>
							</Pressable>
						),
					headerLeft: () => null,
				}}
			/>
			<DetailField label="Nome de usuário" value={credential.username} />
			<DetailField label="Senha" value={credential.password} isSecret />

			<Text className="text-neutral-500 mt-6 text-center">
				Este é um item compartilhado. Para sua segurança, copie os dados e feche
				esta tela.
			</Text>
		</View>
	);
};

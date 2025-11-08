import { ActivityIndicator, Clipboard, Pressable, View } from "react-native";
import { Link, Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { useToast } from "@/src/hooks/use-toast";
import type { CredentialDto } from "@/src/core/dtos/credentials";
import { useState } from "react";
import { CreateShareForm } from "@/src/ui/widgets/share/create-share-form";

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
	id: string;
	isLoading: boolean;
	credential: CredentialDto;
	folderName?: string;
};

export const CredentialDetailsView = ({
	id,
	isLoading,
	credential,
	folderName,
}: Props) => {
	const [isShareModalOpen, setShareModalOpen] = useState(false); // 👈 Novo estado
	if (isLoading) {
		return <ActivityIndicator size="large" className="flex-1" />;
	}

	if (!credential) {
		return <Text>Credencial não encontrada.</Text>;
	}

	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen
				options={{
					title: credential.title,
					headerRight: () => (
						<View className="flex-row items-center space-x-2 pr-2">
							<Pressable
								onPress={() => setShareModalOpen(true)}
								className="p-2"
							>
								<Icon name="share" size={22} color="primary" />
							</Pressable>
						</View>
					),
				}}
			/>

			<DetailField label="Nome de usuário" value={credential.username} />
			<DetailField label="Senha" value={credential.password} isSecret />
			<DetailField label="URL" value={credential.url} />
			<DetailField label="Pasta" value={folderName} />

			<Link href={`/vault/credentials/${id}/edit`} asChild>
				<Pressable className="mt-6 bg-primary-500 p-3 rounded-md gap-2 flex-row items-center justify-center">
					<Icon name="pen" size={16} color="accent" />
					<Text className="text-white font-bold">Editar</Text>
				</Pressable>
			</Link>
			<CreateShareForm
				isOpen={isShareModalOpen}
				onClose={() => setShareModalOpen(false)}
				credentialId={id}
			/>
		</View>
	);
};

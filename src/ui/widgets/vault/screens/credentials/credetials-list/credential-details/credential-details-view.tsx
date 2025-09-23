import { ActivityIndicator, Clipboard, Pressable, View } from "react-native";
import { Link, Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { useToast } from "@/src/hooks/use-toast";
import { CredentialDto } from "@/src/core/dtos/credentials";

const DetailField = ({
	label,
	value,
	isSecret = false,
}: { label: string; value?: string; isSecret?: boolean }) => {
	const { show } = useToast();

	const copyToClipboard = async () => {
		if (!value) return;
		await Clipboard.setString(value);
		show(`${label} copiado!`, "success");
	};

	if (!value) return null;

	return (
		<View className="my-3">
			<Text className="text-xs uppercase text-neutral-500">{label}</Text>
			<View className="flex-row items-center justify-between">
				<Text className="text-lg text-accent-500">
					{isSecret ? "••••••••••••" : value}
				</Text>
				<Pressable onPress={copyToClipboard} className="p-2">
					<Icon name="copy" size={20} />
				</Pressable>
			</View>
		</View>
	);
};

type Props = {
	id: string;
	isLoading: boolean;
	credential: CredentialDto;
};

export const CredentialDetailsView = ({
	id,
	isLoading,
	credential,
}: Props) => {
	if (isLoading) {
		return <ActivityIndicator size="large" className="flex-1" />;
	}

	if (!credential) {
		return <Text>Credencial não encontrada.</Text>;
	}

	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: credential.title }} />

			<DetailField label="Nome de usuário" value={credential.username} />
			<DetailField label="Senha" value={credential.password} isSecret />
			<DetailField label="URL" value={credential.url} />

			<Link href={`/vault/credentials/${id}/edit`} asChild>
				<Pressable className="mt-6 bg-primary-500 p-3 rounded-md flex-row items-center justify-center">
					<Icon name="note" size={16} className="text-white mr-2" />
					<Text className="text-white font-bold">Editar</Text>
				</Pressable>
			</Link>
		</View>
	);
};

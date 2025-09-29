import { ActivityIndicator, View } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { ButtonText } from "@/src/ui/gluestack/button";
import { Pressable } from "@/src/ui/gluestack/pressable";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { FormInputView } from "@/src/ui/widgets/global/components/form-input/form-input-view"; 
import { Button } from "@/src/ui/widgets/global/components/button";

type Props = {
	isLoading: boolean;
	baseEmail: string;
	setBaseEmail: (email: string) => void;
	generatedUsername: string;
	generateUsername: () => void;
	copyToClipboard: () => void;
};

export default function UsernameGeneratorScreenView({
	isLoading,
	baseEmail,
	setBaseEmail,
	generateUsername,
	generatedUsername,
	copyToClipboard,
}: Props) {
	if (isLoading) {
		return (
			<ActivityIndicator size="large" className="flex-1 bg-background-500" />
		);
	}

	return (
		<View className="flex-1 bg-background-500 p-4">
			<View className="flex flex-col gap-8">
				<View className="">
					<View className="bg-surface-500 p-4 rounded-lg flex-row items-center justify-between min-h-[60px]">
						<Text
							className="text-accent-500 text-lg font-mono flex-1"
							numberOfLines={2}
						>
							{generatedUsername}
						</Text>
						<Pressable onPress={generateUsername} className="p-2 ml-2">
							<Icon name="generator" size={20} color="primary" />
						</Pressable>
					</View>
					<Button
						onPress={copyToClipboard}
						hasFlex={false}
						className="mt-4 bg-primary-500 rounded-full"
					>
						<ButtonText className="text-accent-500">Copiar</ButtonText>
					</Button>
				</View>

				<FormInputView
					label="E-mail(Obrigatório)"
					value={baseEmail}
					onChangeText={setBaseEmail}
					placeholder="seu@email.com"
				/>
			</View>
		</View>
	);
}

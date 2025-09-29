import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Stack } from "expo-router";
import {  ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";

type Props = {
	control: any;
	handleSubmit: any;
	isSubmitting: boolean;
	isValid: boolean;
};

export default function RecoveryPhraseScreenView({
	control,
	handleSubmit,
	isValid,
	isSubmitting,
}: Props) {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View className="flex-1 bg-background-500 p-4">
				<Stack.Screen options={{ title: "Frase de Segurança" }} />

				<Text className="text-neutral-500 mb-4">
					Crie ou redefina sua frase de segurança. Esta frase é a única maneira
					de recuperar sua conta se você esquecer sua senha mestra. Guarde-a em
					um local seguro e offline.
				</Text>

				<ControlledInput
					name="passphrase"
					control={control}
					label="Nova Frase de Segurança"
					placeholder="Ex: meu-gato-amarelo-adora-caixas"
				/>

				<ControlledPasswordInput
					name="passwordConfirmation"
					control={control}
					label="Confirme com sua Senha Mestra"
				/>

				<Button
					onPress={handleSubmit}
					isDisabled={!isValid || isSubmitting}
					className="mt-6 bg-primary-500"
				>
					{isSubmitting && <ButtonSpinner mr="$2" />}
					<ButtonText className="text-accent-500">Salvar Frase de Segurança</ButtonText>
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
}

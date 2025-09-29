import { View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Requirements } from "@/src/ui/widgets/auth/screens/sign-up/password-requirements/password-requirements-view";
import { PasswordRequirements } from "@/src/ui/widgets/auth/screens/sign-up/password-requirements";

type Props = {
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
	passwordRequirements: Requirements;
};

export default function ResetPasswordWithPhraseScreenView({
	control,
	handleSubmit,
	isValid,
	isSubmitting,
  passwordRequirements
}: Props) {
	return (
		<View className="flex-1 bg-background-500 p-4 justify-start pt-20">
			<Stack.Screen options={{ title: "Recuperar com Frase" }} />
			<Text className="text-2xl font-bold text-accent-500 mb-6">
				Redefina com sua Frase de Segurança
			</Text>

			<View className="gap-4">
				<ControlledInput
					name="passphrase"
					control={control}
					label="Frase de Segurança"
				/>
				<ControlledPasswordInput
					name="newPassword"
					control={control}
					label="Nova Senha"
					hasStrength
				/>
				<ControlledPasswordInput
					name="confirmPassword"
					control={control}
					label="Confirme a Nova Senha"
				/>

				<PasswordRequirements requirements={passwordRequirements} />
			</View>

			<Button
				onPress={handleSubmit}
				isDisabled={!isValid || isSubmitting}
				className="mt-6 bg-primary-500"
				hasFlex={false}
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">Salvar Nova Senha</ButtonText>
			</Button>
		</View>
	);
}

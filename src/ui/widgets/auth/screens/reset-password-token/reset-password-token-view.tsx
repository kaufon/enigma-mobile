import { View } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
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
  passwordRequirements: Requirements
};

export const ResetPasswordScreenView = ({
	control,
	handleSubmit,
	isSubmitting,
	isValid,
  passwordRequirements
}: Props) => {
	return (
		<View className="flex-1 bg-background-500 p-4 gap-7 justify-start pt-20">
			<Text className="text-2xl font-bold text-accent-500 text-center mb-6">
				Crie sua nova senha
			</Text>

			<ControlledPasswordInput
				name="newPassword"
				control={control}
				label="Nova Senha"
        hasStrength
			/>
			<ControlledPasswordInput
				name="confirmPassword"
				control={control}
        hasStrength
				label="Confirme a Nova Senha"
			/>
      <PasswordRequirements requirements={passwordRequirements} />
			<Button
				hasFlex={false}
				onPress={handleSubmit}
				isDisabled={!isValid || isSubmitting}
				className="mt-6 bg-primary-500"
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">Salvar Nova Senha</ButtonText>
			</Button>
		</View>
	);
};

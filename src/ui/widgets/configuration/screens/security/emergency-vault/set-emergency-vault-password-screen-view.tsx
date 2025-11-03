import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";

type Props = {
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
};

export const SetEmergencyPasswordScreenView = ({
	control,
	handleSubmit,
	isValid,
	isSubmitting,
}: Props) => {
	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Cofre de Emergência" }} />
			<ScrollView>
				<Text className="text-neutral-500 mb-4">
					A senha de emergência dá acesso a um cofre separado. Esta senha **não
					pode ser alterada** após ser definida. Confirme com sua senha mestra.
				</Text>

				<FormSection title="Nova Senha de Emergência" />
				<ControlledPasswordInput
					name="newEmergencyPassword"
					control={control}
					label="Senha do Cofre Emergência"
					hasStrength
				/>
				<ControlledPasswordInput
					name="confirmEmergencyPassword"
					control={control}
					label="Confirme a senha"
				/>

				<FormSection title="Confirmação" />
				<ControlledPasswordInput
					name="masterPasswordConfirmation"
					control={control}
					label="Sua Senha Atual"
				/>

				<Button
					onPress={handleSubmit}
					isDisabled={!isValid || isSubmitting}
					className="mt-6 bg-primary-500"
				>
					{isSubmitting && <ButtonSpinner mr="$2" />}
					<ButtonText className="text-accent-500">
						Definir Senha do Cofre de Emergência
					</ButtonText>
				</Button>
			</ScrollView>
		</View>
	);
};

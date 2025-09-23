import { View, ScrollView } from "react-native";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Sheet } from "@/src/ui/widgets/global/components/action-sheet";
import { Button, ButtonText, ButtonSpinner } from "@/src/ui/gluestack/button";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";

type Props = {
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
	control: any;
};

export const RegisterCredentialFormView = ({
	handleSubmit,
	isSubmitting,
	isValid,
	control,
}: Props) => {
	return (
			<View className="w-full px-4 pb-8 flex-1">
				<View className="w-full items-center border-b border-surface-500 pb-4 mb-4 pt-5">
					<Text className="text-2xl font-bold text-accent-500 mb-2">
						Nova Credencial
					</Text>
				</View>

				<ScrollView showsVerticalScrollIndicator={false}>
					<FormSection title="Informações do Item" />
					<ControlledInput name="title" control={control} label="Nome" />

					<FormSection title="Credenciais de acesso" />
					<ControlledInput
						name="username"
						control={control}
						label="Nome de usuário"
					/>
					<ControlledPasswordInput
						hasStrength
						name="password"
						control={control}
						label="Senha"
					/>
					<ControlledInput
						name="url"
						control={control}
						label="URL do site (Opcional)"
					/>
				</ScrollView>

				<Button
					onPress={handleSubmit}
					disabled={!isValid || isSubmitting}
					className="mt-6 bg-primary-500"
				>
					{isSubmitting && <ButtonSpinner mr="$2" />}
					<ButtonText>Salvar</ButtonText>
				</Button>
			</View>
	);
};

import { View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Button } from "@/src/ui/widgets/global/components/button";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Link } from "expo-router";

type Props = {
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
};

export default function ForgotPasswordScreenView({
	control,
	handleSubmit,
	isSubmitting,
}: Props) {
	return (
		<View className="flex-1 bg-background-500 p-4 justify-start pt-20 gap-4">
			<Text className="text-2xl font-bold text-accent-500 mb-2">
				Esqueceu sua senha?
			</Text>
			<ControlledInput name="email" control={control} label="Email" />
			<Button
				hasFlex={false}
				onPress={handleSubmit}
				isDisabled={isSubmitting}
				className="mt-6 bg-primary-500"
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">
					Enviar pedido de Recuperação
				</ButtonText>
			</Button>
			<Link href="/auth/sign-in" asChild>
				<Text className="text-md font-bold text-accent-500 underline mt-4">
					Voltar para o login
				</Text>
			</Link>
		</View>
	);
}

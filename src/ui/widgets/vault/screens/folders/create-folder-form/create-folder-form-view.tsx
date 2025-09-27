import { View } from "react-native";
import { Stack } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";

type Props = {
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
};
export default function CreateFolderFormView({
	control,
	handleSubmit,
	isSubmitting,
	isValid,
}: Props) {
	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Nova Pasta" }} />

			<ControlledInput
				name="name"
				control={control}
				label="Nome da Pasta"
				placeholder="Ex: Trabalho"
			/>

			<Button
				onPress={handleSubmit}
				isDisabled={!isValid || isSubmitting}
				hasFlex={false}
				className="mt-6 bg-primary-500"
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">Salvar Pasta</ButtonText>
			</Button>
		</View>
	);
}

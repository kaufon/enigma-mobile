import { ActivityIndicator, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";

type Props = {
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
	isLoadingData: boolean;
};

export default function EditFolderScreenView({
	control,
	handleSubmit,
	isValid,
	isSubmitting,
	isLoadingData,
}: Props) {
	if (isLoadingData) {
		return <ActivityIndicator size="large" className="flex-1" />;
	}

	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Editar Pasta" }} />

			<ControlledInput
				name="name"
				control={control}
				label="Nome da Pasta"
				placeholder="Ex: Trabalho"
			/>

			<Button
				onPress={handleSubmit}
				isDisabled={!isValid || isSubmitting}
				className="mt-6 bg-primary-500"
				hasFlex={false}
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">Salvar Alterações</ButtonText>
			</Button>
		</View>
	);
}

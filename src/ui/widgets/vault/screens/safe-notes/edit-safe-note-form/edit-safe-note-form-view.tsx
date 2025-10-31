import { View, ScrollView, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import {  ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { ControlledTextArea } from "@/src/ui/widgets/global/components/controlled-text-area";
import { Button } from "@/src/ui/widgets/global/components/button";

type Props = {
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
	isLoadingData: boolean;
};

export const EditSafeNoteFormView = ({
	control,
	handleSubmit,
	isValid,
	isSubmitting,
	isLoadingData,
}: Props) => {
	if (isLoadingData) {
		return (
			<ActivityIndicator size="large" className="flex-1 bg-background-500" />
		);
	}

	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Editar Nota Segura" }} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<FormSection title="Detalhes da Nota" />
				<ControlledInput name="title" control={control} label="Título" />

				<ControlledTextArea
					name="content"
					control={control}
					label="Conteúdo da Nota"
				/>
			</ScrollView>

			<Button
				onPress={handleSubmit}
				isDisabled={!isValid || isSubmitting}
				className="mt-6 bg-primary-500"
			>
				{isSubmitting && <ButtonSpinner mr="$2" />}
				<ButtonText className="text-accent-500">Salvar Alterações</ButtonText>
			</Button>
		</View>
	);
};

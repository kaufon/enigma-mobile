import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { ControlledTextArea } from "@/src/ui/widgets/global/components/controlled-text-area";
import { Button } from "@/src/ui/widgets/global/components/button";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";

type Props = {
	control: any;
	handleSubmit: () => void;
	isSubmitting: boolean;
	isValid: boolean;
};

export default function CreateSafeNoteFormView({
	control,
	handleSubmit,
	isValid,
	isSubmitting,
}: Props) {
	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Nova Nota Segura" }} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<FormSection title="Detalhes da Nota" />
				<ControlledInput
					name="title"
					control={control}
					label="Título"
					placeholder="Ex: Chaves de API do Projeto"
				/>

				<ControlledTextArea
					name="content"
					control={control}
					label="Conteúdo da Nota"
					placeholder="Cole ou digite sua nota segura aqui..."
				/>
			</ScrollView>

			<Button
				onPress={handleSubmit}
				isDisabled={!isValid || isSubmitting}
				className="mt-6 bg-primary-500"
			>
				{isSubmitting && <ButtonSpinner />}
				<ButtonText className="text-accent-500 font-bold">
					Salvar Nota Segura
				</ButtonText>
			</Button>
		</View>
	);
}

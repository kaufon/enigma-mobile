import { ActivityIndicator, ScrollView, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { SelectInput } from "@/src/ui/widgets/global/components/select-input";
import { Button } from "@/src/ui/widgets/global/components/button";
import { useEditCredentialForm } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/edit-credential-form/use-edit-credential-form";

export default function EditCredentialScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();

	if (!id) {
		return <Text>ID da credencial não encontrado.</Text>;
	}

	const { control, handleSubmit, isSubmitting, isValid, isLoadingData } =
		useEditCredentialForm(id);

	if (isLoadingData) {
		return <ActivityIndicator size="large" className="flex-1" />;
	}

	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Editar Credencial" }} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<FormSection title="Informações do Item" />
				<ControlledInput name="title" control={control} label="Nome" />
				<SelectInput label="Pasta" value="Nenhuma pasta" />

				<FormSection title="Credenciais" />
				<ControlledInput
					name="username"
					control={control}
					label="Nome de usuário"
				/>
				<ControlledInput
					name="password"
					control={control}
					label="Senha"
					isPassword
				/>
				<ControlledInput
					name="url"
					control={control}
					label="URL do site (Opcional)"
				/>
			</ScrollView>

			<Button
				onPress={handleSubmit}
				isLoading={isSubmitting}
				isDisabled={!isValid || isSubmitting}
				className="mt-4 bg-primary-500"
			>
				Salvar Alterações
			</Button>
		</View>
	);
}

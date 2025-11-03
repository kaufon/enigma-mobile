import {
	ActivityIndicator,
	KeyboardAvoidingView,
	ScrollView,
	View,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { FormSection } from "@/src/ui/widgets/global/components/format-section";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";
import { useEditCredentialForm } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/edit-credential-form/use-edit-credential-form";
import { CategorySelect } from "@/src/ui/widgets/global/components/category-select/category-select-view";
import { ButtonText } from "@/src/ui/gluestack/button";
import { Platform } from "react-native";

export default function EditCredentialScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();

	if (!id) {
		return <Text>ID da credencial não encontrado.</Text>;
	}

	const {
		control,
		handleSubmit,
		isSubmitting,
		isValid,
		isLoadingData,
		folders,
	} = useEditCredentialForm(id);

	if (isLoadingData) {
		return <ActivityIndicator size="large" className="flex-1" />;
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
			keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
		>
			<View className="flex-1 bg-background-500 p-4">
				<Stack.Screen options={{ title: "Editar Credencial" }} />

				<ScrollView showsVerticalScrollIndicator={false}>
					<FormSection title="Informações do Item" />
					<ControlledInput name="title" control={control} label="Nome" />
					<CategorySelect
						name="categoryId"
						control={control}
						folders={folders}
						label="Pasta"
					/>

					<FormSection title="Credenciais de acesso" />
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
					<ButtonText className="text-accent-500">Salvar Alterações</ButtonText>
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
}

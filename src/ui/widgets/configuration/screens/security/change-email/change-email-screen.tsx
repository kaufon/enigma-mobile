import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	View,
} from "react-native";
import { Stack } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { Button } from "@/src/ui/widgets/global/components/button";
import { useState } from "react";
import { Pressable } from "react-native"; 
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";

type Props = {
	control: any;
	handleSubmit: () => Promise<boolean | void>; 
	isSubmitting: boolean;
	isValid: boolean;
	isLoadingData: boolean;
	reset: (values: { email: string; passwordConfirmation: string }) => void;
	initialEmail: string;
};

export default function ChangeEmailScreenView({
	control,
	isSubmitting,
	handleSubmit,
	isValid,
	isLoadingData,
	reset,
	initialEmail,
}: Props) {
	const [isEditing, setEditing] = useState(false);

	const handleCancel = () => {
		reset({ email: initialEmail, passwordConfirmation: "" }); // Restaura os valores
		setEditing(false);
	};

	const handleSave = async () => {
		const success = await handleSubmit();
		if (success) {
			setEditing(false);
		}
	};

	if (isLoadingData) {
		return (
			<ActivityIndicator size="large" className="flex-1 bg-background-500" />
		);
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View className="flex-1 bg-background-500 p-4">
				<Stack.Screen
					options={{
						title: "E-mail",
						headerRight: () =>
							isEditing ? (
								<Pressable onPress={handleCancel} className="p-2">
									<Text className="text-primary-500 font-bold">Cancelar</Text>
								</Pressable>
							) : (
								<Pressable onPress={() => setEditing(true)} className="p-2">
									<Icon name="pen" size={22} className="text-primary-500" />
								</Pressable>
							),
					}}
				/>

				<Text className="text-neutral-500 mb-4">
					{isEditing
						? "Para alterar seu e-mail, insira o novo endereço e confirme com sua senha mestra."
						: "Este é o seu endereço de e-mail atual."}
				</Text>

				<ControlledInput
					name="email"
					control={control}
					label="Endereço de e-mail"
					isReadOnly={!isEditing} 
				/>

				{isEditing && (
					<>
						<ControlledPasswordInput
							name="passwordConfirmation"
							control={control}
							label="Confirme com sua Senha"
						/>
						<Button
							onPress={handleSave}
							isDisabled={!isValid || isSubmitting}
							className="mt-6 bg-primary-500"
						>
							{isSubmitting && <ButtonSpinner mr="$2" />}
							<ButtonText className="text-accent-500">Salvar Alterações</ButtonText>
						</Button>
					</>
				)}
			</View>
		</KeyboardAvoidingView>
	);
}

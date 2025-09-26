import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from "react-native";
import { Stack } from "expo-router";
import { ButtonSpinner, ButtonText } from "@/src/ui/gluestack/button";
import { ControlledInput } from "@/src/ui/widgets/global/components/controlled-input/controlled-input-view";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";
import { useState } from "react";
import { Pressable } from "@/src/ui/widgets/global/components/pressable";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Icon } from "@/src/ui/widgets/global/components/icon";
import {
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
} from "@/src/ui/gluestack/alert-dialog";
import { Heading } from "@/src/ui/gluestack/heading";

type Props = {
	control: any;
	handleSubmit: () => Promise<boolean>;
	isSubmitting: boolean;
	isValid: boolean;
	isLoadingData: boolean;
	reset: any;
	initialEmail: string;
	isDeleteDialogOpen: boolean;
	setDeleteDialogOpen: (open: boolean) => void;
	deleteFormControl: any;
	isDeleteDisabled: boolean;
	isDeleteFormValid: boolean;
	countdown: number;
	handleDeleteSubmit: () => Promise<void>;
	initiateAccountDeletion: any;
};

export default function UserProfileScreenView({
	control,
	isSubmitting,
	handleSubmit,
	isValid,
	isLoadingData,
	reset,
	initialEmail,
	isDeleteDialogOpen,
	setDeleteDialogOpen,
	deleteFormControl,
	isDeleteDisabled,
	isDeleteFormValid,
	countdown,
	handleDeleteSubmit,
	initiateAccountDeletion,
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
			keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
		>
			<View className="flex-1 bg-background-500 p-4">
				<Stack.Screen
					options={{
						title: "Dados do Usuário",
						headerRight: () =>
							isEditing ? (
								<Pressable onPress={handleCancel} className="p-2">
									<Text className="text-primary-500">Cancelar</Text>
								</Pressable>
							) : (
								<Pressable onPress={() => setEditing(true)} className="p-2">
									<Icon name="pen" size={22} />
								</Pressable>
							),
					}}
				/>

				<ControlledInput
					name="email"
					control={control}
					label="Endereço de e-mail"
					placeholder="seu@email.com"
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
							<ButtonText>Salvar Alterações</ButtonText>
						</Button>
					</>
				)}

				<Button onPress={initiateAccountDeletion} className="bg-danger-500">
					<ButtonText>Excluir Conta</ButtonText>
				</Button>
				<ScrollView>
					<AlertDialog
						isOpen={isDeleteDialogOpen}
						onClose={() => setDeleteDialogOpen(false)}
					>
						<AlertDialogBackdrop />
						<AlertDialogContent className="bg-surface-500 gap-5">
							<AlertDialogHeader>
								<Heading className="text-accent-500 font-black text-xl">
									Confirmar Exclusão
								</Heading>
							</AlertDialogHeader>
							<AlertDialogBody className="bg-surface-500">
								<Text className="text-neutral-500 mb-4">
									Esta ação é permanente. Para confirmar, por favor, insira seu
									e-mail e senha atual.
								</Text>

								<ControlledInput
									name="email"
									control={deleteFormControl}
									label="Email"
									placeholder="Confirme seu e-mail"
								/>
								<ControlledPasswordInput
									name="passwordConfirmation"
									control={deleteFormControl}
									label="Senha Atual"
								/>
							</AlertDialogBody>
							<AlertDialogFooter>
								<Button
									className="bg-danger-500"
									onPress={handleDeleteSubmit}
									isDisabled={isDeleteDisabled || !isDeleteFormValid}
								>
									<ButtonText className="text-accent-500">
										{isDeleteDisabled ? `Excluir em (${countdown})` : "Excluir"}
									</ButtonText>
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
}

import { ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@/src/ui/widgets/global/components/Themed";
import { Switch } from "@/src/ui/gluestack/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBiometricsSettingsViewModel } from "@/src/ui/widgets/configuration/screens/security/biometrices/use-biometrics-settings";
import { ControlledPasswordInput } from "@/src/ui/widgets/global/components/controlled-password-input/controlled-password-input-view";
import { Button } from "@/src/ui/widgets/global/components/button";
import { ButtonText } from "@/src/ui/gluestack/button";
import { FormModal } from "@/src/ui/widgets/global/components/form-modal";

const passwordSchemaObject = z.object({
	password: z.string().min(1, "Senha é obrigatória"),
});
type PasswordSchema = z.infer<typeof passwordSchemaObject>;

export default function BiometricsScreen() {
	const {
		isLoading,
		isEnrolled,
		isModalVisible,
		isBiometricEnabled,
		isHardwareSupported,
		setModalVisible,
		handleToggleSwitch,
		handlePasswordConfirmation,
	} = useBiometricsSettingsViewModel();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		reset, // Obtenha o reset
	} = useForm<PasswordSchema>({
		resolver: zodResolver(passwordSchemaObject),
	});

	// Função que o formulário chama ao submeter
	const onConfirm = (data: PasswordSchema) => {
		handlePasswordConfirmation(data.password);
		reset({ password: "" }); // Limpa o campo de senha
	};

	const onModalClose = () => {
		setModalVisible(false);
		reset({ password: "" }); // Limpa o campo de senha
	};

	if (isLoading) {
		return (
			<ActivityIndicator size="large" className="flex-1 bg-background-500" />
		);
	}

	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Login com Biometria" }} />

			<View className="bg-surface-500 p-4 rounded-lg flex-row justify-between items-center">
				<Text className="text-accent-500 text-base">
					Habilitar Login com Biometria
				</Text>
				<Switch
					value={isBiometricEnabled}
					onValueChange={handleToggleSwitch}
					disabled={!isHardwareSupported || !isEnrolled}
				/>
			</View>
			{!isHardwareSupported && (
				<Text className="text-neutral-500 mt-2 mx-1">
					Seu dispositivo não possui hardware de biometria compatível.
				</Text>
			)}
			{!isEnrolled && isHardwareSupported && (
				<Text className="text-neutral-500 mt-2 mx-1">
					Nenhuma impressão digital ou rosto cadastrado. Por favor, configure a
					biometria nas configurações do seu dispositivo.
				</Text>
			)}
			<FormModal
				isOpen={isModalVisible}
				onClose={onModalClose}
				title="Confirmar Senha Mestra"
				description="Biometria confirmada! Agora, insira sua senha mestra para salvá-la com segurança."
				children={
					<ControlledPasswordInput
						name="password"
						control={control}
						label="Senha Mestra"
					/>
				}
				footer={
					<>
						<Button variant="outline" className="bg-danger-500" onPress={onModalClose}>
							<ButtonText className="text-accent-500">Cancelar</ButtonText>
						</Button>
						<Button
							className="bg-primary-500"
							onPress={handleSubmit(onConfirm)}
							isDisabled={!isValid || isSubmitting}
						>
							<ButtonText className="text-accent-500">Habilitar</ButtonText>
						</Button>
					</>
				}
			/>
		</View>
	);
}

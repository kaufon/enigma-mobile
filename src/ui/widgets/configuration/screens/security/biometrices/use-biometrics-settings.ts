import { useState, useEffect, useCallback } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSecureStore, useAuthContext } from "@/src/ui/widgets/global/hooks";
import { useRest } from "@/src/hooks";
import { useToast } from "@/src/hooks/use-toast";

export const useBiometricsSettingsViewModel = () => {
	const { show } = useToast();
	const secureStore = useSecureStore();
	const { user } = useAuthContext();
	const { authService } = useRest();

	const [isLoading, setIsLoading] = useState(true);
	const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
	const [isHardwareSupported, setIsHardwareSupported] = useState(false);
	const [isEnrolled, setIsEnrolled] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const hardware = await LocalAuthentication.hasHardwareAsync();
			const enrolled = await LocalAuthentication.isEnrolledAsync();
			const enabled = await AsyncStorage.getItem("biometric_enabled");

			setIsHardwareSupported(hardware);
			setIsEnrolled(enrolled);
			setIsBiometricEnabled(enabled === "true");
			setIsLoading(false);
		})();
	}, []);

	const disableBiometrics = async () => {
		await secureStore.deleteItem("biometric_master_password");
		await AsyncStorage.removeItem("biometric_enabled");
		await AsyncStorage.removeItem("biometric_user_email");
		setIsBiometricEnabled(false);
		show("Biometria desabilitada.", "info");
	};
	const handlePasswordConfirmation = async (masterPassword: string) => {
		if (!user?.email) return;

		// 1. Verifica se a senha mestra está correta
		const response = await authService.signIn(user.email, masterPassword);

		if (response.isSuccess) {
			// 2. Senha correta! Salva a senha e habilita a biometria
			await secureStore.setItem("biometric_master_password", masterPassword);
			await AsyncStorage.setItem("biometric_user_email", user.email);
			await AsyncStorage.setItem("biometric_enabled", "true");
			setIsBiometricEnabled(true);
			setModalVisible(false);
			show("Biometria habilitada com sucesso!", "success");
		} else {
			show("Senha mestra incorreta.", "error");
		}
	};
	const enableBiometrics = async (masterPassword: string) => {
		if (!user?.email) return;

		const response = await authService.signIn(user.email, masterPassword);

		if (response.isSuccess) {
			const result = await LocalAuthentication.authenticateAsync({
				promptMessage: "Confirme para habilitar a biometria",
			});

			if (result.success) {
				await secureStore.setItem("biometric_master_password", masterPassword);
				await AsyncStorage.setItem("biometric_user_email", user.email);
				await AsyncStorage.setItem("biometric_enabled", "true");
				setIsBiometricEnabled(true);
				setModalVisible(false);
				show("Biometria habilitada com sucesso!", "success");
			} else {
				show("Autenticação biométrica falhou.", "error");
			}
		} else {
			show("Senha mestra incorreta.", "error");
		}
	};

	const handleToggleSwitch = async (value: boolean) => {
		if (value === false) {
			// Se for para DESLIGAR, apenas desabilita
			disableBiometrics();
			return;
		}

		// Se for para LIGAR:
		try {
			// 1. Pede a biometria do dispositivo primeiro
			const result = await LocalAuthentication.authenticateAsync({
				promptMessage: "Confirme para habilitar a biometria",
			});

			// 2. Se a biometria for sucesso, ABRE o modal para pedir a senha mestra
			if (result.success) {
				setModalVisible(true);
			} else {
				show("Autenticação biométrica falhou.", "error");
			}
		} catch (e) {
			show("Não foi possível verificar a biometria.", "error");
		}
	};

	return {
		isLoading,
		isBiometricEnabled,
		isHardwareSupported,
		isEnrolled,
		isModalVisible,
		setModalVisible,
		handleToggleSwitch,
		enableBiometrics,
    handlePasswordConfirmation,
	};
};

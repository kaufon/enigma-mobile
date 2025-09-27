import { useCallback } from "react";
import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "warning" | "info";

const TITLES = {
	success: "Sucesso",
	error: "Erro",
	warning: "Aviso",
	info: "Informação",
};

export const useToast = () => {
	const show = useCallback((description: string, type: ToastType = "error") => {
		const visibilityTime = 3000; 

		Toast.show({
			type: type,
			text1: TITLES[type],
			text2: description,
			position: "top",
			visibilityTime: visibilityTime,
			autoHide: true,
		});

		setTimeout(() => {
			Toast.hide();
		}, visibilityTime);
	}, []);

	return {
		show,
	};
};

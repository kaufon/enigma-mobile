import { useRest } from "@/src/hooks";
import { useToast } from "@/src/hooks/use-toast";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";

export const useAutoLockSettings = () => {
	const { show } = useToast();
	const { securityService } = useRest();
	const { user, refreshUser } = useAuthContext();

	const handleUpdateTime = async (minutes: number | null) => {
		try {
			const response = await securityService.setAutotimeLock(minutes || 1);
			if (response.isSuccess) {
				show("Configuração salva!", "success");
				refreshUser();
			} else {
				show(response.errorMessage || "Falha ao salvar.", "error");
			}
		} catch (error) {
			show("Ocorreu um erro.", "error");
		}
	};

	return {
		currentTimeout: user?.autoLockTimeout,
		handleUpdateTime,
	};
};

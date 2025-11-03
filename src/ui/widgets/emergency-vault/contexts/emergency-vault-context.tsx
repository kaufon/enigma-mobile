import {
	createContext,
	useContext,
	useState,
	type PropsWithChildren,
	useCallback,
} from "react";
import { useRest } from "@/src/hooks";
import type { CredentialDto } from "@/src/core/dtos/credentials";
import type { SafeNoteDto } from "@/src/core/dtos/safe-note";
import { Alert } from "react-native";
import { useToast } from "@/src/hooks/use-toast";

export type EmergencyItem = CredentialDto | SafeNoteDto;

type EmergencyContextType = {
	isUnlocked: boolean;
	isLoading: boolean;
	items: EmergencyItem[];
	login: (password: string) => Promise<boolean>;
	logout: () => void;
	refreshItems: () => Promise<void>;
	handleDeleteItem: (item: EmergencyItem) => void; // 5. Adicione a nova função
};

const EmergencyVaultContext = createContext<EmergencyContextType | undefined>(
	undefined,
);
const isCredential = (item: EmergencyItem): item is CredentialDto => {
	return (item as CredentialDto).username !== undefined;
};
export const EmergencyVaultProvider = ({ children }: PropsWithChildren) => {
	const [isUnlocked, setUnlocked] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [items, setItems] = useState<EmergencyItem[]>([]);
	const [currentPassword, setCurrentPassword] = useState("");
	const { emergencyVaultService, credentialService, safeNoteService } =
		useRest();
	const { show } = useToast();

	const login = async (password: string) => {
		setLoading(true);
		try {
			const response = await emergencyVaultService.list(password);
			if (response.isSuccess && response.body) {
				const combinedItems = [
					...(response.body.credentials as EmergencyItem[]),
					...(response.body.safeNotes as EmergencyItem[]),
				];
				setItems(combinedItems);
				setUnlocked(true);
				setCurrentPassword(password);
				return true;
			}
			return false;
		} catch (e) {
			return false;
		} finally {
			setLoading(false);
		}
	};

	const logout = useCallback(() => {
		setUnlocked(false);
		setItems([]);
		setCurrentPassword("");
	}, []);

	const refreshItems = async () => {
		if (!currentPassword) return;

		try {
			const response = await emergencyVaultService.list(currentPassword);
			if (response.isSuccess && response.body) {
				const combinedItems = [
					...(response.body.credentials as EmergencyItem[]),
					...(response.body.safeNotes as EmergencyItem[]),
				];
				setItems(combinedItems);
			}
		} catch (e) {
			console.error("Falha ao recarregar o cofre de emergência:", e);
		}
	};
	const handleDeleteItem = async (item: EmergencyItem) => {
		Alert.alert(
			`Excluir ${isCredential(item) ? "Credencial" : "Nota"}`,
			`Tem certeza que deseja excluir "${item.title}"? Esta ação não pode ser desfeita.`,
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Excluir",
					style: "destructive",
					onPress: async () => {
						try {
							let response;
							if (isCredential(item)) {
								response = await credentialService.delete(item.id);
							} else {
								response = await safeNoteService.delete(item.id);
							}

							if (response.isSuccess) {
								show("Item excluído com sucesso!", "success");
								await refreshItems(); 
							} else {
								show(response.errorMessage || "Falha ao excluir o item.", "error");
							}
						} catch (error) {
							show("Ocorreu um erro inesperado.", "error");
						}
					},
				},
			],
		);
	};
	return (
		<EmergencyVaultContext.Provider
			value={{
				isUnlocked,
				isLoading,
				items,
				login,
				logout,
				refreshItems,
				handleDeleteItem,
			}}
		>
			{children}
		</EmergencyVaultContext.Provider>
	);
};
export const useEmergencyVault = () => {
	const context = useContext(EmergencyVaultContext);
	if (!context)
		throw new Error(
			"useEmergencyVault must be used within a EmergencyVaultProvider",
		);
	return context;
};

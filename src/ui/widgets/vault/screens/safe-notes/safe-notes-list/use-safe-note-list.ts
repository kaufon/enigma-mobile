import type { SafeNoteDto } from "@/src/core/dtos/safe-note";
import { useRest } from "@/src/hooks";
import { useNavigation } from "@/src/ui/widgets/global/hooks";
import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

export const useSafeNoteListView = (categoryId?: string) => {
	const [safeNotes, setSafeNotes] = useState<SafeNoteDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { safeNoteService } = useRest();
	const { navigate } = useNavigation();
	const handleDeleteCredential = async (id: string) => {
		Alert.alert(
			"Confirmar Exclusão",
			"Você tem certeza que deseja excluir esta nota segura? Esta ação não pode ser desfeita.",
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Excluir",
					style: "destructive",
					onPress: async () => {
						try {
							const response = await safeNoteService.delete(id);
							if (response.isSuccess) {
								loadCredentials();
							} else {
							}
						} catch (error) {}
					},
				},
			],
		);
	};
	const loadCredentials = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await safeNoteService.findMany(categoryId);
			if (response.isSuccess && response.body) {
				setSafeNotes(response.body);
			} else {
				setError(response.errorMessage || "Falha ao buscar credenciais.");
			}
		} catch (err: any) {
			console.error(err);
			setError(err.message || "Ocorreu um erro.");
		} finally {
			setIsLoading(false);
		}
	}, [categoryId, safeNoteService]);

	useEffect(() => {
		loadCredentials();
	}, [loadCredentials]);

	const handleSelectCredential = (id: string) => {
		navigate(`/vault/safe-notes/${id}`);
	};

	const handleEditCredential = (id: string) => {
		navigate(`/vault/safe-notes/${id}/edit`);
	};

	return {
		safeNotes,
		isLoading,
		error,
		handleSelectCredential,
		handleEditCredential,
		handleDeleteCredential,
		loadCredentials,
	};
};

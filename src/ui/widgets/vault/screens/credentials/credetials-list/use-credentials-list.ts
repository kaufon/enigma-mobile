import type { CredentialDto } from "@/src/core/dtos/credentials";
import { useRest } from "@/src/hooks";
import { useNavigation } from "@/src/ui/widgets/global/hooks";
import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

export const useCredentialsListViewModel = (categoryId?: string) => {
	const [credentials, setCredentials] = useState<CredentialDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { credentialService } = useRest();
  const {navigate} = useNavigation()
	const handleDeleteCredential = async (id: string) => {
		Alert.alert(
			"Confirmar Exclusão",
			"Você tem certeza que deseja excluir esta credencial? Esta ação não pode ser desfeita.",
			[
				// Botão de Cancelar
				{
					text: "Cancelar",
					style: "cancel",
				},
				// Botão de Excluir
				{
					text: "Excluir",
					style: "destructive",
					onPress: async () => {
						try {
							const response = await credentialService.delete(id);
							if (response.isSuccess) {
								loadCredentials(); // Atualiza a lista após a exclusão
							} else {
							}
						} catch (error) {
						}
					},
				},
			],
		);
	};
	const loadCredentials = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await credentialService.findMany(categoryId);
			if (response.isSuccess && response.body) {
				setCredentials(response.body);
			} else {
				setError(response.errorMessage || "Falha ao buscar credenciais.");
			}
		} catch (err: any) {
			console.error(err);
			setError(err.message || "Ocorreu um erro.");
		} finally {
			setIsLoading(false);
		}
	}, [categoryId, credentialService]);

	useEffect(() => {
		loadCredentials();
	}, [loadCredentials]);

  const handleSelectCredential = (id: string) => {
    navigate(`/vault/credentials/${id}`); 
  };

	const handleEditCredential = (id:string) => {
    navigate(`/vault/credentials/${id}/edit`); 
	};

	return {
		credentials,
		isLoading,
		error,
		handleSelectCredential,
		handleEditCredential,
    handleDeleteCredential, 
		loadCredentials,
	};
};

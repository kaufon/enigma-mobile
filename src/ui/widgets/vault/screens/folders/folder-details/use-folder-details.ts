import { useCallback, useEffect, useState } from "react";
import { useRest } from "@/src/hooks";
import { router, useFocusEffect } from "expo-router";
import type { FolderDto } from "@/src/core/dtos/folder";
import type { CredentialDto } from "@/src/core/dtos/credentials";
import { Alert } from "react-native";
import { useToast } from "@/src/hooks/use-toast";

export const useFolderDetailsViewModel = (folderId: string) => {
	const [folder, setFolder] = useState<FolderDto | null>(null);
	const [credentials, setCredentials] = useState<CredentialDto[]>([]);
	const { show } = useToast();
	const [isLoading, setLoading] = useState(true);
	const { foldersService } = useRest();

	const loadData = useCallback(async () => {
		if (!folder) setLoading(true);

		try {
			const response = await foldersService.getById(folderId);

			if (response.isSuccess && response.body) {
				const fetchedFolder = response.body;
				setFolder(fetchedFolder);

				if (fetchedFolder.credentials) {
					const credentialsForList: CredentialDto[] =
						fetchedFolder.credentials.map((c) => ({
							...c,
							username: "",
						}));
					setCredentials(credentialsForList);
				}
			}
		} finally {
			setLoading(false);
		}
	}, [folderId, foldersService, folder]);

	// 2. Substitua o useEffect por useFocusEffect
	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [loadData]),
	);

	const handleSelectCredential = (credentialId: string) => {
		router.push(`/vault/credentials/${credentialId}`);
	};
	const handleDeleteFolder = async () => {
		Alert.alert(
			"Excluir Pasta",
			"Tem certeza que deseja excluir esta pasta e todas as credenciais dentro dela? Esta ação não pode ser desfeita.",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Excluir",
					style: "destructive",
					onPress: async () => {
						try {
							const response = await foldersService.delete(folderId);
							if (response.isSuccess) {
								show("Pasta excluída com sucesso!", "success");
								router.back(); // Volta para a tela anterior (o cofre)
							} else {
								show(
									response.errorMessage || "Falha ao excluir a pasta.",
									"error",
								);
							}
						} catch (error) {
							show("Ocorreu um erro inesperado.", "error");
						}
					},
				},
			],
		);
	};
	return {
		isLoading,
		folder,
		credentials,
		handleSelectCredential,
		handleDeleteFolder,
	};
};

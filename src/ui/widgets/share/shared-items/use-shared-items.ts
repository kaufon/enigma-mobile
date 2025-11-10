import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { useRest } from "@/src/hooks";
import { Alert, Share } from "react-native";
import { useToast } from "@/src/hooks/use-toast";
import type { ShareItemDto } from "@/src/core/dtos/share-item";

export function useMySharesViewModel() {
	const [shares, setShares] = useState<ShareItemDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { shareService,baseURL } = useRest();
	const { show } = useToast();

	const loadShares = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await shareService.list();
			if (response.isSuccess && response.body) setShares(response.body);
		} finally {
			setIsLoading(false);
		}
	}, [shareService]);

	useFocusEffect(
		useCallback(() => {
			loadShares();
		}, [loadShares]),
	);

	const handleRevokeShare = (id: string, title: string) => {
		Alert.alert(
			"Revogar Acesso",
			`Tem certeza que deseja revogar o acesso ao link de "${title}"?`,
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Revogar",
					style: "destructive",
					onPress: () => confirmRevoke(id),
				},
			],
		);
	};

	const confirmRevoke = async (id: string) => {
		const response = await shareService.delete(id);
		if (response.isSuccess) {
			show("Link revogado com sucesso!", "success");
			loadShares();
		} else {
			show(response.errorMessage || "Falha ao revogar o link.", "error");
		}
	};
	const handleCopyshareLink = useCallback(
		async (id: string, hash: string) => {
			const deepLink = `enigma://share/${id}#${hash}`;

			const shareUrl = `${baseURL}/redirect/open?link=${encodeURIComponent(deepLink)}`;

			try {
				await Share.share({
					message: `Aqui está o link seguro para o item compartilhado:\n${shareUrl}`,
				});
			} catch (e) {
				show("Falha ao abrir o menu de compartilhamento.", "error");
			}
		},
		[show],
	);
	const handleViewSharedItem = useCallback(
		(id: string, hash: string) => {
			router.push({
				pathname: `/share/${id}`,
				params: {
					owner_key: hash,
				},
			});
		},
		[router],
	);
	return {
		shares,
		isLoading,
		handleRevokeShare,
		handleCopyshareLink,
		handleViewSharedItem,
	};
}

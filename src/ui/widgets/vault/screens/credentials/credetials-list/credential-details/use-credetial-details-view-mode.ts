import { useState, useCallback } from "react";
import { useRest } from "@/src/hooks";
import { useFocusEffect } from "expo-router";
import type { CredentialDto } from "@/src/core/dtos/credentials";
import type { FolderDto } from "@/src/core/dtos/folder";

export const useCredentialDetailsViewModel = (id: string) => {
	const [credential, setCredential] = useState<CredentialDto | null>(null);
	const [folder, setFolder] = useState<FolderDto | null>(null);
	const [isLoading, setLoading] = useState(true);
	const { credentialService, folderService } = useRest();

	const fetchDetails = useCallback(async () => {
		if (!credential) setLoading(true);

		try {
			const credentialResponse = await credentialService.getById(id);
			if (credentialResponse.isSuccess && credentialResponse.body) {
				const fetchedCredential = credentialResponse.body;
				setCredential(fetchedCredential);

				if (fetchedCredential.categoryId) {
					const folderResponse = await folderService.getById(
						fetchedCredential.categoryId,
					);
					if (folderResponse.isSuccess && folderResponse.body) {
						setFolder(folderResponse.body);
					}
				} else {
					setFolder(null);
				}
			}
		} finally {
			setLoading(false);
		}
	}, [id, credentialService, folderService]);

	useFocusEffect(
		useCallback(() => {
			fetchDetails();
		}, [fetchDetails]),
	);

	return { isLoading, credential, folder };
};

import { useEffect, useState } from "react";
import { useRest } from "@/src/hooks";
import type { CredentialDto } from "@/src/core/dtos/credentials";
import type { FolderDto } from "@/src/core/dtos/folder";

export const useCredentialDetailsViewModel = (id: string) => {
	const [credential, setCredential] = useState<CredentialDto | null>(null);
	const [folder, setFolder] = useState<FolderDto | null>(null); 
	const [isLoading, setLoading] = useState(true);
	const { credentialService, foldersService } = useRest(); 

	useEffect(() => {
		const fetchDetails = async () => {
			setLoading(true);
			setFolder(null); 
			try {
				const credentialResponse = await credentialService.getById(id);

				if (credentialResponse.isSuccess && credentialResponse.body) {
					const fetchedCredential = credentialResponse.body;
					setCredential(fetchedCredential);
					if (fetchedCredential.categoryId) {
						const folderResponse = await foldersService.getById(
							fetchedCredential.categoryId,
						);
						if (folderResponse.isSuccess && folderResponse.body) {
							setFolder(folderResponse.body);
						}
					}
				}
			} finally {
				setLoading(false);
			}
		};
		fetchDetails();
	}, [id, credentialService, foldersService]);

	return { isLoading, credential, folder };
};

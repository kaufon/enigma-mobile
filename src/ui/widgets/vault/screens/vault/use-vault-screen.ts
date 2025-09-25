import type { FolderDto } from "@/src/core/dtos/folder";
import { useRest } from "@/src/hooks";
import { useEffect, useState, useCallback } from "react";

export const useVaultScreenViewModel = () => {
	const [folders, setFolders] = useState<FolderDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { foldersService } = useRest();

	const loadFolders = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await foldersService.findMany();
			if (response.isSuccess && response.body) {
				setFolders(response.body);
			}
		} finally {
			setIsLoading(false);
		}
	}, [foldersService]);

	useEffect(() => {
		loadFolders();
	}, [loadFolders]);

	return { folders, isLoading };
};

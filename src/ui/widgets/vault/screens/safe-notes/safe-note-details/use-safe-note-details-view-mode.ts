import { useState, useCallback } from "react";
import { useRest } from "@/src/hooks";
import { useFocusEffect } from "expo-router";
import type { FolderDto } from "@/src/core/dtos/folder";
import type { SafeNoteDto } from "@/src/core/dtos/safe-note";

export const useSafeNoteDetailsView = (id: string) => {
	const [safeNote, setSafeNote] = useState<SafeNoteDto | null>(null);
	const [folder, setFolder] = useState<FolderDto | null>(null);
	const [isLoading, setLoading] = useState(true);
	const { safeNoteService, folderService } = useRest();

	const fetchDetails = useCallback(async () => {
		if (!safeNote) setLoading(true);

		try {
			const credentialResponse = await safeNoteService.getById(id);
			if (credentialResponse.isSuccess && credentialResponse.body) {
				const fetchedSafeNote = credentialResponse.body;
				setSafeNote(fetchedSafeNote);

				if (fetchedSafeNote.categoryId) {
					const folderResponse = await folderService.getById(
						fetchedSafeNote.categoryId,
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
	}, [id, safeNoteService, folderService]);

	useFocusEffect(
		useCallback(() => {
			fetchDetails();
		}, [fetchDetails]),
	);

	return { isLoading, safeNote, folder };
};

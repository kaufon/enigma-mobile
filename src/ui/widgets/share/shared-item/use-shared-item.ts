import { useState, useEffect } from "react";
import * as Linking from "expo-linking";
import { useRest } from "@/src/hooks";
import type { CredentialDto } from "@/src/core/dtos/credentials";
import { useEncryption } from "@/src/ui/widgets/global/hooks";
import { useLocalSearchParams } from "expo-router";

type DecryptedResponse = {
	id: string;
	password: string;
	title: string;
	username: string;
};

export const useSharedItemViewModel = (id: string) => {
	const [credential, setCredential] = useState<Partial<CredentialDto> | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { baseURL } = useRest();
	const { decrypt } = useEncryption();
	const { owner_key } = useLocalSearchParams<{ owner_key?: string }>();
	const { shareService } = useRest();
	useEffect(() => {
		const decryptAndSetData = async () => {
			try {
				let keyHex: string | undefined;
				if (owner_key) {
					keyHex = owner_key;
				} else {
					const url = await Linking.getInitialURL();
					if (url && url.includes("#")) {
						keyHex = url.split("#")[1];
					}
				}
				if (!keyHex) {
					throw new Error("Chave de descriptografia não encontrada no link.");
				}
				const response = await shareService.getSharedItem(id);
				if (!response.isSuccess || !response.body) {
					throw new Error("Item compartilhado não encontrado ou expirado.");
				}
				const encryptedBlob = response.body
				const sharedItem = await decrypt<DecryptedResponse>(
					{
						iv: encryptedBlob.iv,
						content: encryptedBlob.content,
					},
					keyHex,
				);
				const { title, username, password} = sharedItem;
				setCredential({ id, title, username, password });
			} catch (e: any) {
				setError(e.message || "Ocorreu um erro.");
			} finally {
				setIsLoading(false);
			}
		};

		decryptAndSetData();
	}, [id, baseURL]);

	return { isLoading, credential, error };
};

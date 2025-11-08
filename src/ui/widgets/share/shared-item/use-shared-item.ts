import { useState, useEffect, useCallback } from "react";
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
	const { dev_key } = useLocalSearchParams<{ dev_key?: string }>();
  const {shareService} = useRest()
  const {decrypt} = useEncryption()

	const processLink = useCallback(
		async (url: string | null) => {
			setIsLoading(true);
			setError(null);
			try {
				let keyHex: string | undefined;

				if (dev_key) {
					console.warn(
						"MODO DE TESTE (Expo Go): Usando chave do parâmetro dev_key",
					);
					keyHex = dev_key;
				}
				else if (url && url.includes("#")) {
					keyHex = url.split("#")[1];
				}
        console.log(url)

				if (!keyHex) {
					throw new Error("Chave de descriptografia não encontrada no link.");
				}
				const response = await shareService.getSharedItem(id);
				if (!response.isSuccess || !response.body) {
					throw new Error("Item compartilhado não encontrado ou expirado.");
				}
				const encryptedBlob = response.body;
				const sharedItem = await decrypt<DecryptedResponse>(
					{
						iv: encryptedBlob.iv,
						content: encryptedBlob.content,
					},
					keyHex,
				);
				const { title, username, password } = sharedItem;
				setCredential({ id, title, username, password });
			} catch (e: any) {
				setError(e.message || "Ocorreu um erro.");
			} finally {
				setIsLoading(false);
			}
		},
		[id, baseURL, dev_key],
	); 

	useEffect(() => {
		const subscription = Linking.addEventListener("url", (event) => {
			console.log("Link recebido (app aberto):", event.url);
			processLink(event.url);
		});

		const checkInitialUrl = async () => {
			if (dev_key) {
				processLink(null);
			} else {
				const url = await Linking.getInitialURL();
				if (url) {
					console.log("Link recebido (cold start):", url);
					processLink(url);
				} else {
					setIsLoading(false);
					if (!dev_key) {
						setError("Chave de descriptografia não encontrada.");
					}
				}
			}
		};

		checkInitialUrl();

		return () => {
			subscription.remove();
		};
	}, [processLink, dev_key]);

	return { isLoading, credential, error };
};

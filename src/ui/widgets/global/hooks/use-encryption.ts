import CryptoJS from "crypto-js";

type EncryptedData = {
	iv: string;
	content: string;
};

export function useEncryption() {
	const decrypt = async <T>(
		hash: EncryptedData,
		keyHex: string,
	): Promise<T> => {
		try {
			const key = CryptoJS.enc.Hex.parse(keyHex);
			const iv = CryptoJS.enc.Hex.parse(hash.iv);
			const encryptedContent = CryptoJS.enc.Hex.parse(hash.content);

			const encryptedData = {
				ciphertext: encryptedContent,
			};

			const decrypted = CryptoJS.AES.decrypt(encryptedData as any, key, {
				iv: iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
			});

			const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

			if (!decryptedText) {
				throw new Error(
					"A descriptografia resultou em uma string vazia. Chave incorreta?",
				);
			}

			const decryptedObject = JSON.parse(decryptedText);

			return decryptedObject as T;
		} catch (e) {
			console.error("Falha na descriptografia ou no parse do JSON:", e);
			throw new Error(
				"Não foi possível descriptografar os dados. Chave incorreta ou formato de dados inválido?",
			);
		}
	};

	return { decrypt };
}

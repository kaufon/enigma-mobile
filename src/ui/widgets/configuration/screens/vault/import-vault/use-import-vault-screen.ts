import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { useRest } from "@/src/hooks";
import { useToast } from "@/src/hooks/use-toast";
import { useEmergencyVault } from "@/src/ui/widgets/emergency-vault/contexts/emergency-vault-context";

const importSchema = z.object({
	file: z
		.any()
		.refine((val) => val !== null, "Você precisa selecionar um arquivo."),
	password: z.string().min(1, "A senha mestra é obrigatória."),
});
type ImportSchema = z.infer<typeof importSchema>;

export const useImportVaultForm = () => {
	const { show } = useToast();
	const { securityService } = useRest();
	const router = useRouter();
	const [fileName, setFileName] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		setValue,
		formState: { isSubmitting, isValid },
	} = useForm<ImportSchema>({
		resolver: zodResolver(importSchema),
		defaultValues: { file: null, password: "" },
	});

	let emergencyVault;
	try {
		emergencyVault = useEmergencyVault();
	} catch (e) {
		emergencyVault = null;
	}
	const handlePickDocument = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: [
					"application/json", 
					"text/csv", 
					"text/comma-separated-values", 
					"application/csv", 
					"text/plain", 
				],
				copyToCacheDirectory: true,
			});
			if (!result.canceled && result.assets && result.assets[0]) {
				const file = result.assets[0];
				setValue("file", file, { shouldValidate: true });
				setFileName(file.name);
			}
		} catch (e) {
			show("Não foi possível selecionar o arquivo.", "error");
		}
	};

	const handleFormSubmit = async (data: ImportSchema) => {
		const file = data.file as DocumentPicker.DocumentPickerAsset;
		const format = file.mimeType === "application/json" ? "json" : "csv";

		const formData = new FormData();

		formData.append("file", {
			uri: file.uri,
			name: file.name,
			type: file.mimeType,
		} as any);

		formData.append("password", data.password);
		formData.append("format", format);

		try {
			const response = await securityService.importVault(formData);

			if (response.isSuccess) {
				show("Cofre importado com sucesso!", "success");
				if (emergencyVault) {
					await emergencyVault.refreshItems();
				}
				router.back();
			} else {
				show(
					response.errorMessage ||
						"Falha na importação. Verifique o arquivo ou a senha.",
					"error",
				);
			}
		} catch (error) {
			show("Ocorreu um erro inesperado.", "error");
		}
	};

	return {
		control,
		handleSubmit: handleSubmit(handleFormSubmit),
		isSubmitting,
		isValid,
		fileName,
		handlePickDocument,
	};
};

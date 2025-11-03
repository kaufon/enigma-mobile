import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRest } from "@/src/hooks";

import { File, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { useToast } from "@/src/hooks/use-toast";
import { Platform } from "react-native";
import { Alert } from "react-native";

const exportSchema = z.object({
	format: z.enum(["json", "csv"], {
		message: "Por favor, selecione um formato.",
	}),
	password: z.string().min(1, "A senha mestra é obrigatória."),
});

type ExportSchema = z.infer<typeof exportSchema>;

export const useExportVaultScreen = () => {
	const { show } = useToast();
	const { securityService } = useRest();
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<ExportSchema>({
		resolver: zodResolver(exportSchema),
		mode: "onChange",
	});

	const handleFormSubmit = async (data: ExportSchema) => {
		try {
			const response = await securityService.exportVault(
				data.password,
				data.format,
			);

			if (response.isSuccess && response.body) {
				const date = new Date();
				const fileName = `enigma-export-${date.getDate()}-${date.getSeconds()}.${data.format}`;

				// 1. Preparar o conteúdo (como já tínhamos feito)
				let dataToWrite: string;
				if (typeof response.body === "string") {
					dataToWrite = response.body;
				} else {
					dataToWrite = JSON.stringify(response.body, null, 2);
				}

				const mimeType =
					data.format === "csv" ? "text/csv" : "application/json";

				// --- INÍCIO DA LÓGICA DE DOWNLOAD SEGURO ---

				if (Platform.OS === "android") {
					try {
						const permissions =
							await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

						if (!permissions.granted) {
							show("Permissão negada para guardar o ficheiro.", "error");
							return;
						}

						const fileUri =
							await FileSystem.StorageAccessFramework.createFileAsync(
								permissions.directoryUri, 
								fileName,
								mimeType,
							);

						await FileSystem.writeAsStringAsync(fileUri, dataToWrite, {
							encoding: FileSystem.EncodingType.UTF8,
						});

						show(
							"Cofre exportado com sucesso para a pasta selecionada!",
							"success",
						);
					} catch (safError) {
						console.error("SAF Error:", safError);
						show("Falha ao guardar o ficheiro no Android.", "error");
					}
				} else {
					try {
						const fileUri = FileSystem.documentDirectory + fileName;

						await FileSystem.writeAsStringAsync(fileUri, dataToWrite, {
							encoding: FileSystem.EncodingType.UTF8,
						});

						Alert.alert(
							"Exportação Concluída",
							"O seu cofre foi guardado com segurança.\n\nPara aceder, abra a app 'Ficheiros' e navegue para 'No Meu iPhone' > 'Enigma'.",
							[{ text: "OK" }],
						);
					} catch (iosError) {
						console.error("iOS Save Error:", iosError);
						show("Falha ao guardar o ficheiro no iOS.", "error");
					}
				}
			} else {
				show(
					response.errorMessage || "Falha ao exportar. Senha mestra incorreta?",
					"error",
				);
			}
		} catch (error) {
			console.error("Export Vault Error:", error);
			show("Ocorreu um erro inesperado.", "error");
		}
	};

	return {
		control,
		handleSubmit: handleSubmit(handleFormSubmit),
		isSubmitting,
		isValid,
	};
};

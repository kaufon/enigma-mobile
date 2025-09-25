import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useToast } from "@/src/hooks/use-toast";
import { useRest } from "@/src/hooks";
import { stringSchema } from "@/src/validation/schemas/zod";
import z from "zod";
import { FolderDto } from "@/src/core/dtos/folder";

const registerCredentialFormSchema = z.object({
	title: stringSchema.optional(),
	username: stringSchema.optional(),
	password: stringSchema.optional(),
	url: stringSchema.optional(),
	categoryId: stringSchema.optional(),
});

type RegisterCredentialFormSchema = z.infer<
	typeof registerCredentialFormSchema
>;
export const useEditCredentialForm = (id: string) => {
	const { show } = useToast();
	const [isLoadingData, setLoadingData] = useState(true); // Estado para o carregamento inicial
	const [folders, setFolders] = useState<FolderDto[]>([]); // 👈 Estado para as pastas
	const { credentialService, foldersService } = useRest();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		reset,
	} = useForm<RegisterCredentialFormSchema>({
		resolver: zodResolver(registerCredentialFormSchema),
		mode: "onChange",
	});

	useEffect(() => {
		const loadInitialData = async () => {
			setLoadingData(true);
			try {
				// Busca a credencial e a lista de pastas em paralelo
				const [credentialResponse, foldersResponse] = await Promise.all([
					credentialService.getById(id),
					foldersService.findMany(),
				]);

				if (credentialResponse.isSuccess && credentialResponse.body) {
					reset(credentialResponse.body); // Popula o formulário
				} else {
					show("Não foi possível carregar a credencial.", "error");
				}

				if (foldersResponse.isSuccess && foldersResponse.body) {
					setFolders(foldersResponse.body); // Salva a lista de pastas
				}
			} catch (error) {
				show("Erro ao carregar dados.", "error");
			} finally {
				setLoadingData(false);
			}
		};

		loadInitialData();
	}, [id, reset, show]);

	const handleFormSubmit = async (data: RegisterCredentialFormSchema) => {
		try {
			const response = await credentialService.update(id, data);
			if (response.isSuccess) {
				show("Credencial atualizada com sucesso!", "success");
				router.back(); // Volta para a lista
			} else {
				show(
					response.errorMessage || "Falha ao atualizar a credencial.",
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
		isLoadingData,
		folders,
	};
};

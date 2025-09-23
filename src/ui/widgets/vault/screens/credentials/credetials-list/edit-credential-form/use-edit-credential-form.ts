import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useToast } from "@/src/hooks/use-toast";
import { useRest } from "@/src/hooks";
import { stringSchema } from "@/src/validation/schemas/zod";
import z from "zod";

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
	const { credentialService } = useRest();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		reset, // Função do react-hook-form para popular o formulário
	} = useForm<RegisterCredentialFormSchema>({
		resolver: zodResolver(registerCredentialFormSchema),
		mode: "onChange",
	});

	// Efeito para buscar os dados da credencial quando o componente montar
	useEffect(() => {
		const fetchCredential = async () => {
			setLoadingData(true);
			try {
				const response = await credentialService.getById(id);
				if (response.isSuccess && response.body) {
					// Popula o formulário com os dados recebidos da API
					reset(response.body);
				} else {
					show("Não foi possível carregar a credencial.", "error");
				}
			} catch (error) {
				show("Erro ao carregar dados.", "error");
			} finally {
				setLoadingData(false);
			}
		};

		fetchCredential();
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
		isLoadingData, // Para mostrar um spinner enquanto os dados carregam
	};
};

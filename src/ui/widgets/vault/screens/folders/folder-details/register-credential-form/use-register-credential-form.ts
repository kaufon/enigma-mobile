import { FolderDto } from "@/src/core/dtos/folder";
import { useRest } from "@/src/hooks";
import { useToast } from "@/src/hooks/use-toast";
import { stringSchema } from "@/src/validation/schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const registerCredentialFormSchema = z.object({
	title: stringSchema,
	username: stringSchema,
	password: stringSchema,
	url: z.string().optional(),
	categoryId: z.string().optional(),
});

type RegisterCredentialFormSchema = z.infer<
	typeof registerCredentialFormSchema
>;
export const useRegisterCredentialForm = (onSuccess: () => void) => {
	const { show } = useToast();
	const { credentialService, foldersService } = useRest();
	const [folders, setFolders] = useState<FolderDto[]>([]);
	const [isLoadingFolders, setIsLoadingFolders] = useState(true);
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<RegisterCredentialFormSchema>({
		resolver: zodResolver(registerCredentialFormSchema),
		mode: "onChange",
		defaultValues: {
			title: "",
			username: "",
			password: "",
			url: "",
		},
	});
	useEffect(() => {
		const loadFolders = async () => {
			setIsLoadingFolders(true);
			try {
				const response = await foldersService.findMany();
				if (response.isSuccess && response.body) {
					setFolders(response.body);
				}
			} finally {
				setIsLoadingFolders(false);
			}
		};
		loadFolders();
	}, [foldersService]);
	const handleFormSubmit = async (data: RegisterCredentialFormSchema) => {
		try {
			const response = await credentialService.create(data);
			if (response.isSuccess) {
				show("Credencial salva com sucesso!", "success");
				onSuccess();
			} else {
				show(response.errorMessage || "Falha ao salvar a credencial.", "error");
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
		folders,
		isLoadingFolders,
	};
};

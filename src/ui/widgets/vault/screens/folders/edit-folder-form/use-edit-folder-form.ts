import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useToast } from "@/src/hooks/use-toast";
import z from "zod";

export const createFolderSchema = z.object({
	name: z.string().min(2, "O nome da pasta deve ter pelo menos 2 caracteres."),
});

export type CreateFolderSchema = z.infer<typeof createFolderSchema>;
export const useEditFolderForm = (folderId: string) => {
	const { show } = useToast();
	const { folderService: foldersService } = useRest();
	const router = useRouter();
	const [isLoadingData, setLoadingData] = useState(true);

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		reset,
	} = useForm<CreateFolderSchema>({
		resolver: zodResolver(createFolderSchema),
		mode: "onChange",
	});

	useEffect(() => {
		const loadFolder = async () => {
			setLoadingData(true);
			try {
				const response = await foldersService.getById(folderId);
				if (response.isSuccess && response.body) {
					reset({ name: response.body.name }); 
				}
			} finally {
				setLoadingData(false);
			}
		};
		loadFolder();
	}, [folderId, foldersService, reset]);

	const handleFormSubmit = async (data: CreateFolderSchema) => {
		try {
			const response = await foldersService.update(folderId, data);
			if (response.isSuccess) {
				show("Pasta atualizada com sucesso!", "success");
				router.back(); 
			} else {
				show(response.errorMessage || "Falha ao atualizar a pasta.", "error");
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
	};
};

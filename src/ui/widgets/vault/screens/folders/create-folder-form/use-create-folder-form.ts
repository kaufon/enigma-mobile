import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useRouter } from "expo-router";
import { useToast } from "@/src/hooks/use-toast";
import { z } from "zod";

export const createFolderSchema = z.object({
	name: z.string().min(2, "O nome da pasta deve ter pelo menos 2 caracteres."),
});

export type CreateFolderSchema = z.infer<typeof createFolderSchema>;
export const useCreateFolderForm = () => {
	const { show } = useToast();
	const { folderService: foldersService } = useRest();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<CreateFolderSchema>({
		resolver: zodResolver(createFolderSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
		},
	});

	const handleFormSubmit = async (data: CreateFolderSchema) => {
		try {
			const response = await foldersService.create(data);
			if (response.isSuccess) {
				show("Pasta criada com sucesso!", "success");
				router.back(); 
			} else {
				show(response.errorMessage || "Falha ao criar a pasta.", "error");
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
	};
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useToast } from "@/src/hooks/use-toast";
import { useRouter } from "expo-router";
import { stringSchema } from "@/src/validation/schemas/zod";
import z from "zod";
import { useEmergencyVault } from "@/src/ui/widgets/emergency-vault/contexts/emergency-vault-context";
export const createSecureNoteSchema = z.object({
	title: stringSchema.min(2, "O título é obrigatório."),
	content: z.string().optional(),
});

export type CreateSecureNoteSchema = z.infer<typeof createSecureNoteSchema>;

export const useCreateSecureNoteForm = ({
	onSuccess,
	isEmergency = false,
}: { onSuccess: VoidFunction; isEmergency?: boolean }) => {
	const { show } = useToast();
	const { safeNoteService } = useRest();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<CreateSecureNoteSchema>({
		resolver: zodResolver(createSecureNoteSchema),
		mode: "onChange",
		defaultValues: {
			title: "",
			content: "",
		},
	});

	let emergencyVault;
	try {
		emergencyVault = useEmergencyVault();
	} catch (e) {
		emergencyVault = null;
	}
	const handleFormSubmit = async (data: CreateSecureNoteSchema) => {
		try {
			const response = await safeNoteService.create({ ...data, isEmergency });
			if (response.isSuccess) {
				show("Nota Segura criada com sucesso!", "success");
				if (onSuccess) {
					if (isEmergency && emergencyVault) {
						await emergencyVault.refreshItems();
					}
					onSuccess();
				} else {
					router.back();
				}
			} else {
				show(response.errorMessage || "Falha ao criar a nota.", "error");
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

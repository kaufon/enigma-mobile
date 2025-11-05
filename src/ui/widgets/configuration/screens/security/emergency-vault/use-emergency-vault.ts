import { passwordSchema } from "@/src/validation/schemas/zod";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useRouter } from "expo-router";
import { useToast } from "@/src/hooks/use-toast";

export const setEmergencyPasswordSchema = z
	.object({
		newEmergencyPassword: passwordSchema,
		confirmEmergencyPassword: z.string(),
		masterPasswordConfirmation: z
			.string()
			.min(1, "Sua senha mestra é obrigatória."),
	})
	.refine(
		(data) => data.newEmergencyPassword === data.confirmEmergencyPassword,
		{
			message: "As senhas de emergência não coincidem.",
			path: ["confirmEmergencyPassword"],
		},
	);

export type SetEmergencyPasswordSchema = z.infer<
	typeof setEmergencyPasswordSchema
>;
export const useSetEmergencyPasswordForm = () => {
	const { show } = useToast();
	const { securityService } = useRest();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<SetEmergencyPasswordSchema>({
		resolver: zodResolver(setEmergencyPasswordSchema),
		mode: "onChange",
		defaultValues: {
			newEmergencyPassword: "",
			confirmEmergencyPassword: "",
			masterPasswordConfirmation: "",
		},
	});

	const handleFormSubmit = async (data: SetEmergencyPasswordSchema) => {
		try {
			const response = await securityService.setEmergencyVaultPassword(
				data.newEmergencyPassword,
				data.masterPasswordConfirmation,
			);

			if (response.isSuccess) {
				show("Senha do cofre emergência definida com sucesso!", "success");
				router.back();
			} else {
        console.log(response.errorMessage)
				show(
					response.errorMessage || "Falha ao definir. Senha mestra incorreta?",
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
	};
};

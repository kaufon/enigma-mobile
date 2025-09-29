import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useRouter } from "expo-router";
import z from "zod";
import { useToast } from "@/src/hooks/use-toast";

const setRecoveryPhraseSchema = z.object({
	passphrase: z.string().min(1, "A frase de segurança é obrigatória."),
	passwordConfirmation: z
		.string()
		.min(1, "A senha é obrigatória para confirmar a exclusão."),
});
type SetRecoveryPhraseSchema = z.infer<typeof setRecoveryPhraseSchema>;
export const useRecoveryPhraseForm = () => {
	const { show } = useToast();
	const { securityService } = useRest();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<SetRecoveryPhraseSchema>({
		resolver: zodResolver(setRecoveryPhraseSchema),
		mode: "onChange",
		defaultValues: { passphrase: "", passwordConfirmation: "" },
	});

	const handleFormSubmit = async (data: SetRecoveryPhraseSchema) => {
		try {
      console.log(data)
			const response = await securityService.setRecoveryPhrase(
				data.passphrase,
				data.passwordConfirmation,
			);
			if (response.isSuccess) {
				show("Frase de segurança definida com sucesso!", "success");
				router.back();
			} else {
				show(
					response.errorMessage || "Falha ao salvar. Senha incorreta?",
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

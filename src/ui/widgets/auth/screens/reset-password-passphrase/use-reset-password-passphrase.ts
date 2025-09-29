import { passwordSchema } from "@/src/validation/schemas/zod";
import z from "zod";

export const resetPasswordWithPhraseSchema = z
	.object({
		passphrase: z.string().min(1, "A frase de segurança é obrigatória."),
		newPassword: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});
export type ResetPasswordWithPhraseSchema = z.infer<
	typeof resetPasswordWithPhraseSchema
>;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/src/hooks/use-toast";
import { useRest } from "@/src/hooks";
import { useRouter } from "expo-router";
import { useMemo } from "react";

export const useResetWithPhraseForm = (email: string) => {
	const { show } = useToast();
	const { authService } = useRest();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		watch,
	} = useForm<ResetPasswordWithPhraseSchema>({
		resolver: zodResolver(resetPasswordWithPhraseSchema),
		mode: "onChange",
	});

	const password = watch("newPassword", "");
	const passwordRequirements = useMemo(() => {
		const hasLower = /[a-z]/.test(password);
		const hasUpper = /[A-Z]/.test(password);
		const hasDigit = /\d/.test(password);
		const hasSpecial = /[^A-Za-z0-9]/.test(password);
		const hasLength = password.length >= 12;
		return { hasLower, hasUpper, hasDigit, hasSpecial, hasLength };
	}, [password]);
	const handleFormSubmit = async (data: ResetPasswordWithPhraseSchema) => {
		try {
			const response = await authService.resetPasswordWithPassphrase(
				data.passphrase,
				data.newPassword,
				email,
			);
			if (response.isSuccess) {
				show(
					"Senha redefinida com sucesso! Por favor, faça o login.",
					"success",
				);
				router.replace("/auth/sign-in");
			} else {
				show(
					response.errorMessage || "Frase de segurança ou e-mail incorretos.",
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
		passwordRequirements,
	};
};

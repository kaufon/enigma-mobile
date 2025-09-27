import z from "zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useToast } from "@/src/hooks/use-toast";
import { useRest } from "@/src/hooks";
import { passwordSchema } from "@/src/validation/schemas/zod";
import { useMemo } from "react";

export const resetPasswordSchema = z
	.object({
		newPassword: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const useResetPasswordTokenForm = (token: string) => {
	const router = useRouter();
	const { show } = useToast();
	const { authService } = useRest();
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		watch,
	} = useForm<ResetPasswordSchema>({});

	const password = watch("newPassword", "");
	const passwordRequirements = useMemo(() => {
		const hasLower = /[a-z]/.test(password);
		const hasUpper = /[A-Z]/.test(password);
		const hasDigit = /\d/.test(password);
		const hasSpecial = /[^A-Za-z0-9]/.test(password);
		const hasLength = password.length >= 12;
		return { hasLower, hasUpper, hasDigit, hasSpecial, hasLength };
	}, [password]);
	const handleFormSubmit = async (data: ResetPasswordSchema) => {
		try {
			const response = await authService.resetPasswordWithToken(
				token,
				data.newPassword,
			);
			if (response.isSuccess) {
				show(
					"Senha redefinida com sucesso! Por favor, faça o login.",
					"success",
				);
				router.replace("/auth/sign-in");
			} else {
				show(response.errorMessage || "Token inválido ou expirado.", "error");
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

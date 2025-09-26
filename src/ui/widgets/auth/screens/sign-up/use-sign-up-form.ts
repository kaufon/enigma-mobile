import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useRouter } from "expo-router";
import z from "zod";
import { emailSchema, passwordSchema } from "@/src/validation/schemas/zod";
import { useToast } from "@/src/hooks/use-toast";
import { useMemo } from "react";

export const signUpSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export const useSignUpForm = () => {
	const { show } = useToast();
	const { authService } = useRest();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		watch,
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const password = watch("password", "");
	const passwordRequirements = useMemo(() => {
		const hasLower = /[a-z]/.test(password);
		const hasUpper = /[A-Z]/.test(password);
		const hasDigit = /\d/.test(password);
		const hasSpecial = /[^A-Za-z0-9]/.test(password);
		const hasLength = password.length >= 12;
		return { hasLower, hasUpper, hasDigit, hasSpecial, hasLength };
	}, [password]);
	const handleFormSubmit = async (data: SignUpSchema) => {
		try {
			const response = await authService.signUp(data.email, data.password);
			if (response.isSuccess) {
				show("Conta criada com sucesso! Por favor, faça o login.", "success");
				router.push("/auth/sign-in");
			} else {
				show(response.errorMessage || "Falha ao criar a conta.", "error");
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

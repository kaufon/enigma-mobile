import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useToast } from "@/src/hooks/use-toast";
import z from "zod";
import { useRouter } from "expo-router";
export const forgotPasswordSchema = z.object({
	email: z.string().email("Por favor, insira um email válido."),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export const useForgotPasswordForm = () => {
	const { show } = useToast();
	const router = useRouter();
	const { authService } = useRest();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onChange",
	});

	const handleFormSubmit = async (data: ForgotPasswordSchema) => {
		try {
			const response = await authService.requestPasswordReset(data.email);
			if (response.isSuccess && response.body) {
				if (response.body.recoveryType === "PASS_PHRASE") {
					router.push({
						pathname: "/auth/reset-password/passphrase",
						params: { email: data.email },
					});
				} else {
					show(
						"Se o e-mail estiver correto, você receberá um link para redefinir sua senha.",
						"success",
					);
				}
			} else {
				show(
					"Se o e-mail estiver correto, você receberá um link para redefinir sua senha.",
					"success",
				);
			}
		} catch (error) {
			show("Ocorreu um erro. Tente novamente.", "error");
		}
	};

	return {
		control,
		handleSubmit: handleSubmit(handleFormSubmit),
		isSubmitting,
	};
};

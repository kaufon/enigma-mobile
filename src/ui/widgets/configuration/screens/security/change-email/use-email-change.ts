import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useEffect, useState } from "react";
import { useToast } from "@/src/hooks/use-toast";
import { z } from "zod";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";

export const updateEmailSchema = z.object({
	email: z.email("Por favor, insira um email válido."),
	passwordConfirmation: z
		.string()
		.min(1, "A senha é obrigatória para confirmar a alteração."),
});

export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;
export const useEmailChange = () => {
	const { show } = useToast();
	const { signOut } = useAuthContext();
	const { userService } = useRest();
	const [isLoadingData, setLoadingData] = useState(true);
	const [initialEmail, setInitialEmail] = useState("");
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		reset,
	} = useForm<UpdateEmailSchema>({
		resolver: zodResolver(updateEmailSchema),
		mode: "onChange",
	});
	useEffect(() => {
		const loadProfile = async () => {
			setLoadingData(true);
			try {
				const response = await userService.getProfile();
				if (response.isSuccess && response.body) {
					setInitialEmail(response.body.email);
					reset({ email: response.body.email, passwordConfirmation: "" });
				}
			} finally {
				setLoadingData(false);
			}
		};
		loadProfile();
	}, [userService, reset]);

	const handleFormSubmit = async (data: UpdateEmailSchema) => {
		try {
			const response = await userService.updateEmail(
				data.email,
				data.passwordConfirmation,
			);
			if (response.isSuccess) {
				show("Email atualizado com sucesso!", "success");
				await signOut();
				return true;
			} else {
				show(response.errorMessage || "Falha ao atualizar o email.", "error");
				return false;
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
		reset,
		initialEmail,
	};
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRest } from "@/src/hooks";
import { useEffect, useState } from "react";
import { useToast } from "@/src/hooks/use-toast";
import { z } from "zod";
import { useNavigation } from "@/src/ui/widgets/global/hooks";
import { useAuthContextProvider } from "@/src/ui/widgets/auth/contexts/auth-context/use-auth-context-provider";

export const updateEmailSchema = z.object({
	email: z.email("Por favor, insira um email válido."),
	passwordConfirmation: z
		.string()
		.min(1, "A senha é obrigatória para confirmar a alteração."),
});
export const deleteAccountSchema = z.object({
	email: z.string().email("Por favor, insira um email válido para confirmar."),
	passwordConfirmation: z
		.string()
		.min(1, "A senha é obrigatória para confirmar a exclusão."),
});

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;
export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;
export const useUserProfileViewModel = () => {
	const { show } = useToast();
	const { signOut } = useAuthContextProvider();
	const { userService } = useRest();
	const [isLoadingData, setLoadingData] = useState(true);
	const [initialEmail, setInitialEmail] = useState("");
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [isDeleteDisabled, setDeleteDisabled] = useState(true);
	const deleteForm = useForm<DeleteAccountSchema>({
		resolver: zodResolver(deleteAccountSchema),
		mode: "onChange",
		defaultValues: { email: "", passwordConfirmation: "" },
	});
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
		reset,
	} = useForm<UpdateEmailSchema>({
		resolver: zodResolver(updateEmailSchema),
		mode: "onChange",
	});
	const initiateAccountDeletion = () => {
		setDeleteDialogOpen(true);
		setDeleteDisabled(true);
		deleteForm.reset(); // Limpa o formulário do modal ao abrir
		let timeLeft = 5;

		const timer = setInterval(() => {
			timeLeft -= 1;
			setCountdown(timeLeft);
			if (timeLeft <= 0) {
				clearInterval(timer);
				setDeleteDisabled(false);
			}
		}, 1000);
	};
	const handleConfirmDeletion = async (data: DeleteAccountSchema) => {
		try {
			const response = await userService.deleteAccount(
				data.email,
				data.passwordConfirmation,
			); // Envia email e senha
			if (response.isSuccess) {
				show("Conta excluída com sucesso.", "success");
				signOut();
			} else {
				show(response.errorMessage || "Falha ao excluir a conta.", "error");
			}
		} catch (error) {
			show("Ocorreu um erro inesperado.", "error");
		}
	};
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
		isDeleteDialogOpen,
		setDeleteDialogOpen,
		countdown,
		isDeleteDisabled,
		initiateAccountDeletion,
		deleteFormControl: deleteForm.control, 
		handleDeleteSubmit: deleteForm.handleSubmit(handleConfirmDeletion), 
		isDeleteFormValid: deleteForm.formState.isValid,
	};
};

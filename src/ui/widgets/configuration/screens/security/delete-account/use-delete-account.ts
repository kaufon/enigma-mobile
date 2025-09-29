import { useRest } from "@/src/hooks";
import { useToast } from "@/src/hooks/use-toast";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const deleteAccountSchema = z.object({
	email: z.string().email("Por favor, insira um email válido para confirmar."),
	passwordConfirmation: z
		.string()
		.min(1, "A senha é obrigatória para confirmar a exclusão."),
});
export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;

export const useDeleteAccount = () => {
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [isDeleteDisabled, setDeleteDisabled] = useState(true);
	const { signOut } = useAuthContext();
  const { show } = useToast();

	const { userService } = useRest();
	const deleteForm = useForm<DeleteAccountSchema>({
		resolver: zodResolver(deleteAccountSchema),
		mode: "onChange",
		defaultValues: { email: "", passwordConfirmation: "" },
	});

	const initiateAccountDeletion = () => {
		setDeleteDialogOpen(true);
		setDeleteDisabled(true);
		deleteForm.reset(); 
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
			); 
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
	return {
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

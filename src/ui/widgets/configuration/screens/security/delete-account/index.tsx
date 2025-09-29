import DeleteAccountScreenView from "@/src/ui/widgets/configuration/screens/security/delete-account/delete-account-view";
import { useDeleteAccount } from "@/src/ui/widgets/configuration/screens/security/delete-account/use-delete-account";

export const DeleteAccountScreen = () => {
	const {
		isDeleteDisabled,
		isDeleteFormValid,
		isDeleteDialogOpen,
		setDeleteDialogOpen,
		countdown,
		initiateAccountDeletion,
		deleteFormControl,
		handleDeleteSubmit,
	} = useDeleteAccount();
	return (
		<DeleteAccountScreenView
			isDeleteDialogOpen={isDeleteDialogOpen}
			setDeleteDialogOpen={setDeleteDialogOpen}
			countdown={countdown}
			isDeleteDisabled={isDeleteDisabled}
			initiateAccountDeletion={initiateAccountDeletion}
			deleteFormControl={deleteFormControl}
			handleDeleteSubmit={handleDeleteSubmit}
			isDeleteFormValid={isDeleteFormValid}
		/>
	);
};

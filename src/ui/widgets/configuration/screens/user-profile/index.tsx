import { useUserProfileViewModel } from "@/src/ui/widgets/configuration/screens/user-profile/use-user-profile";
import UserProfileScreenView from "@/src/ui/widgets/configuration/screens/user-profile/user-profile-screen-view";

export const UserProfileScreen = () => {
	const {
		control,
		handleSubmit,
		isLoadingData,
		isValid,
		isSubmitting,
		reset,
		initialEmail,
		isDeleteDisabled,
		isDeleteFormValid,
		isDeleteDialogOpen,
		countdown,
		setDeleteDialogOpen,
		initiateAccountDeletion,
		deleteFormControl,
		handleDeleteSubmit,
	} = useUserProfileViewModel();
	return (
		<UserProfileScreenView
			control={control}
			handleSubmit={handleSubmit}
			isLoadingData={isLoadingData}
			isValid={isValid}
			isSubmitting={isSubmitting}
			initialEmail={initialEmail}
			reset={reset}
			isDeleteDisabled={isDeleteDisabled}
			isDeleteFormValid={isDeleteFormValid}
			isDeleteDialogOpen={isDeleteDialogOpen}
			countdown={countdown}
			setDeleteDialogOpen={setDeleteDialogOpen}
			initiateAccountDeletion={initiateAccountDeletion}
      deleteFormControl={deleteFormControl}
      handleDeleteSubmit={handleDeleteSubmit}
		/>
	);
};

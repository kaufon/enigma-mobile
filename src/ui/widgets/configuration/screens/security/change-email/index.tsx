import ChangeEmailScreenView from "@/src/ui/widgets/configuration/screens/security/change-email/change-email-screen";
import { useEmailChange } from "@/src/ui/widgets/configuration/screens/security/change-email/use-email-change";

export const ChangeEmailScreen = () => {
	const {
		control,
		handleSubmit,
		isLoadingData,
		isValid,
		isSubmitting,
		reset,
		initialEmail,
	} = useEmailChange();
	return (
		<ChangeEmailScreenView
			control={control}
			handleSubmit={handleSubmit}
			isLoadingData={isLoadingData}
			isValid={isValid}
			isSubmitting={isSubmitting}
			initialEmail={initialEmail}
			reset={reset}
		/>
	);
};

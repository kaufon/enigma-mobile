import { SetEmergencyPasswordScreenView } from "@/src/ui/widgets/configuration/screens/security/emergency-vault/set-emergency-vault-password-screen-view";
import { useSetEmergencyPasswordForm } from "@/src/ui/widgets/configuration/screens/security/emergency-vault/use-emergency-vault";

export const SetEmergencyVaultScreen = () => {
	const { control, handleSubmit, isSubmitting, isValid } =
		useSetEmergencyPasswordForm();
	return (
		<SetEmergencyPasswordScreenView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
		/>
	);
};

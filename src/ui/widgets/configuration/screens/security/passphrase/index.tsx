import RecoveryPhraseScreenView from "@/src/ui/widgets/configuration/screens/security/passphrase/passphrase-screen-view";
import { useRecoveryPhraseForm } from "@/src/ui/widgets/configuration/screens/security/passphrase/use-passphrase-form";

export const RecoveryPhraseScreen = () => {
	const { control, isSubmitting, isValid, handleSubmit } =
		useRecoveryPhraseForm();
	return (
		<RecoveryPhraseScreenView
			control={control}
			isSubmitting={isSubmitting}
			isValid={isValid}
			handleSubmit={handleSubmit}
		/>
	);
};

import ResetPasswordWithPhraseScreenView from "@/src/ui/widgets/auth/screens/reset-password-passphrase/reset-password-passphrase-view";
import { useResetWithPhraseForm } from "@/src/ui/widgets/auth/screens/reset-password-passphrase/use-reset-password-passphrase";

type Props = {
	email: string;
};

export const ResetPasswordWithPassphrase = ({ email }: Props) => {
	const { control, handleSubmit, isSubmitting, isValid, passwordRequirements } =
		useResetWithPhraseForm(email);
	return (
		<ResetPasswordWithPhraseScreenView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
			passwordRequirements={passwordRequirements}
		/>
	);
};

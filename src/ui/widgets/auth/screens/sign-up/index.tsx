import SignUpScreenView from "@/src/ui/widgets/auth/screens/sign-up/sign-up-screen-view";
import { useSignUpForm } from "@/src/ui/widgets/auth/screens/sign-up/use-sign-up-form";

export const SignUpScreen = () => {
	const { control, isValid, isSubmitting, handleSubmit, passwordRequirements } =
		useSignUpForm();
	return (
		<SignUpScreenView
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
			control={control}
			passwordRequirements={passwordRequirements}
		/>
	);
};

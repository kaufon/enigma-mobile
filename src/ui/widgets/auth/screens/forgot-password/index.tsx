import ForgotPasswordScreenView from "@/src/ui/widgets/auth/screens/forgot-password/forgot-password-view";
import { useForgotPasswordForm } from "@/src/ui/widgets/auth/screens/forgot-password/use-forgot-password-form";

export const ForgotPasswordScreen = () => {
	const { control, handleSubmit, isSubmitting } = useForgotPasswordForm();
	return (
		<ForgotPasswordScreenView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
		/>
	);
};

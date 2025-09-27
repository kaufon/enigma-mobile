import { ResetPasswordScreenView } from "@/src/ui/widgets/auth/screens/reset-password-token/reset-password-token-view";
import { useResetPasswordTokenForm } from "@/src/ui/widgets/auth/screens/reset-password-token/use-reset-password-token";
import { useRouter } from "expo-router";

type Props = {
	token: string;
};

export const ResetPasswordTokenScreen = ({ token }: Props) => {
	const router = useRouter();
	const { control, handleSubmit, isValid, isSubmitting,passwordRequirements } =
		useResetPasswordTokenForm(token);
	if (!token) {
		router.push("/auth/sign-in");
	}
	return (
		<ResetPasswordScreenView
			control={control}
			handleSubmit={handleSubmit}
			isValid={isValid}
			isSubmitting={isSubmitting}
      passwordRequirements={passwordRequirements}
		/>
	);
};

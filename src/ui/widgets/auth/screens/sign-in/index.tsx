import { SignInScreenView } from "@/src/ui/widgets/auth/screens/sign-in/sign-in-view";
import { useAuthContext } from "@/src/ui/widgets/global/hooks";

export const SignInScreen = () => {
	const { signIn } = useAuthContext();

	return <SignInScreenView />;
};

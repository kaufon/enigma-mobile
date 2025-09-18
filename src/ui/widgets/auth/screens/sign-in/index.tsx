import { useAuthContext } from "@/src/ui/widgets/global/hooks";
import { SignInScreenView } from "./sign-in-view";
import { useSignInScreen } from "./use-sign-in-screen";
import { Redirect } from "expo-router";

export const SignInScreen = () => {
	const { signIn, authenticated } = useAuthContext();
	const { handleSignIn } = useSignInScreen({
		signInAccount: signIn,
	});

	if (authenticated) {
		return <Redirect href="/(protected)/credential/test" />;
	}

	return <SignInScreenView onSignIn={handleSignIn} />;
};

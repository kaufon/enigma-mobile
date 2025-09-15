import { ScreenContainer } from "@/src/ui/widgets/global/components/screen-container";
import { SignInFormView } from "./sign-in-form/sign-in-form-view";

export const SignInScreenView = (props) => {
	return (
		<ScreenContainer>
			<SignInFormView {...props} />
		</ScreenContainer>
	);
};

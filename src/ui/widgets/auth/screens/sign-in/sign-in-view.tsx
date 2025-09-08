import { ScreenContainer } from "@/src/ui/widgets/global/components/screen-container";
import { Text } from "react-native";

type Props = {
	onSignIn: (email: string, password: string) => Promise<void>;
};

export const SignInScreenView = () => {
	return (
		<ScreenContainer>
			<Text>oia</Text>
		</ScreenContainer>
	);
};

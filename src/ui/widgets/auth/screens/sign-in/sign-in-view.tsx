import { Box } from "@/src/ui/gluestack/box";
import { SignInForm } from "@/src/ui/widgets/auth/screens/sign-in/sign-in-form";
import { ScreenContainer } from "@/src/ui/widgets/global/components/screen-container";
import { Text } from "@/src/ui/widgets/global/components/Themed";

type Props = {
	onSignIn: (email: string, password: string) => Promise<void>;
};

export const SignInScreenView = ({ onSignIn }: Props) => {
	return (
		<ScreenContainer>
			<Box className="flex flex-row items-center justify-center gap-3">
        <Text className="text-3xl font-black">Enigma</Text>
      </Box>
			<Box className="mt-12">
				<SignInForm onSignIn={onSignIn} />
			</Box>
		</ScreenContainer>
	);
};

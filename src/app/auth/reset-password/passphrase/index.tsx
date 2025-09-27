import { ResetPasswordWithPassphrase } from "@/src/ui/widgets/auth/screens/reset-password-passphrase";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
	const { email } = useLocalSearchParams<{ email: string }>();
	return <ResetPasswordWithPassphrase email={email} />;
}

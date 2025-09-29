import { ResetPasswordTokenScreen } from "@/src/ui/widgets/auth/screens/reset-password-token";
import { useLocalSearchParams } from "expo-router";

export default function ResetPasswordToken() {
	const { token } = useLocalSearchParams<{ token: string }>();
	return <ResetPasswordTokenScreen token={token} />;
}

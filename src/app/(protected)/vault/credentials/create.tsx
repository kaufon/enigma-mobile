import { View } from "react-native";
import { Stack, useNavigation, useRouter } from "expo-router";
import { useRegisterCredentialForm } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/register-credential-form/use-register-credential-form";
import { RegisterCredentialFormView } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/register-credential-form/register-credential-form-view";

export default function CreateCredentialScreen() {
	const router = useRouter();
	const onSuccess = () => {
		router.push("/vault/credentials");
	};
	const {
		isSubmitting,
		handleSubmit,
		isValid,
		control,
		folders,
		isLoadingFolders,
	} = useRegisterCredentialForm({onSuccess});
	return (
		<View className="flex-1 bg-background-500 p-4">
			<Stack.Screen options={{ title: "Nova Credencial" }} />

			<RegisterCredentialFormView
				handleSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				isValid={isValid}
				control={control}
				folders={folders}
				isLoadingFolders={isLoadingFolders}
			/>
		</View>
	);
}

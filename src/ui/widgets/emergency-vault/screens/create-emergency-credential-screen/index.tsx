import { CreateEmergencyCreatentialScreenView } from "@/src/ui/widgets/emergency-vault/screens/create-emergency-credential-screen/create-emergency-credential-screen-view";
import { useRegisterCredentialForm } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/register-credential-form/use-register-credential-form";
import { useRouter } from "expo-router";

export const CreateEmergencyCredentialScreen = () => {
	const router = useRouter();
	const { control, handleSubmit, isSubmitting, isValid, folders } =
		useRegisterCredentialForm({
			isEmergency: true,
			onSuccess: () => router.back(),
		});
	return (
		<CreateEmergencyCreatentialScreenView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
			folders={folders}
		/>
	);
};

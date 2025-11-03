import type { FolderDto } from "@/src/core/dtos/folder";
import { View } from "@/src/ui/widgets/global/components/Themed";
import { RegisterCredentialFormView } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/register-credential-form/register-credential-form-view";
import { Stack } from "expo-router";

type Props = {
	control: any;
	handleSubmit: VoidFunction;
	isSubmitting: boolean;
	isValid: boolean;
	folders: FolderDto[];
};

export const CreateEmergencyCreatentialScreenView = ({
	control,
	handleSubmit,
	isSubmitting,
	isValid,
	folders,
}: Props) => {
	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen options={{ title: "Nova Credencial de Emergência",headerTitleStyle:{"fontSize": 18} }} />
			<RegisterCredentialFormView
				control={control}
				handleSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				isValid={isValid}
				folders={folders}
				isLoadingFolders={false} 
			/>
		</View>
	);
};

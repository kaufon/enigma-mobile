import CreateFolderFormView from "@/src/ui/widgets/vault/screens/folders/create-folder-form/create-folder-form-view";
import { useCreateFolderForm } from "@/src/ui/widgets/vault/screens/folders/create-folder-form/use-create-folder-form";

export const CreateFolderFormScreen = () => {
	const { isValid, isSubmitting, control, handleSubmit } =
		useCreateFolderForm();
	return (
		<CreateFolderFormView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
		/>
	);
};

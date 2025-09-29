import EditFolderScreenView from "@/src/ui/widgets/vault/screens/folders/edit-folder-form/edit-folder-form-view";
import { useEditFolderForm } from "@/src/ui/widgets/vault/screens/folders/edit-folder-form/use-edit-folder-form";

type Props = {
	id: string;
};
export const EditFolderFormScreen = ({ id }: Props) => {
	const { control, handleSubmit, isLoadingData, isSubmitting, isValid } =
		useEditFolderForm(id);
	return (
		<EditFolderScreenView
			control={control}
			handleSubmit={handleSubmit}
			isValid={isValid}
			isSubmitting={isSubmitting}
			isLoadingData={isLoadingData}
		/>
	);
};

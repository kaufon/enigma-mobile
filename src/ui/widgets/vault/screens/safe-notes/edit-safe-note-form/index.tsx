import { Text, View } from "@/src/ui/widgets/global/components/Themed";
import { EditSafeNoteFormView } from "@/src/ui/widgets/vault/screens/safe-notes/edit-safe-note-form/edit-safe-note-form-view";
import { useEditSecureNoteForm } from "@/src/ui/widgets/vault/screens/safe-notes/edit-safe-note-form/use-edit-safe-note-form";

type Props = {
	id: string;
};
export const EditSafeNoteForm = ({ id }: Props) => {
	if (!id) {
		return (
			<View>
				<Text>ID da nota não encontrado.</Text>
			</View>
		);
	}

	const { control, handleSubmit, isSubmitting, isValid, isLoadingData } =
		useEditSecureNoteForm(id);
	return (
		<EditSafeNoteFormView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
			isLoadingData={isLoadingData}
		/>
	);
};

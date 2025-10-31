import CreateSafeNoteFormView from "@/src/ui/widgets/vault/screens/safe-notes/create-safe-note-form/create-safe-note-form-view";
import { useCreateSecureNoteForm } from "@/src/ui/widgets/vault/screens/safe-notes/create-safe-note-form/use-create-safe-note-form";

export const CreateSafeNoteScreen = () => {
	const { control, isSubmitting, isValid, handleSubmit } =
		useCreateSecureNoteForm();
	return (
		<CreateSafeNoteFormView
			control={control}
			isSubmitting={isSubmitting}
			isValid={isValid}
			handleSubmit={handleSubmit}
		/>
	);
};

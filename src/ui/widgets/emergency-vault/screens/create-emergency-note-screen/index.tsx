import { CreateEmergencySafeNoteView } from "@/src/ui/widgets/emergency-vault/screens/create-emergency-note-screen/create-emergency-note-screen-view";
import { useCreateSecureNoteForm } from "@/src/ui/widgets/vault/screens/safe-notes/create-safe-note-form/use-create-safe-note-form";
import { useRouter } from "expo-router";

export const CreateEmergencySafeNoteScreen = () => {
	const router = useRouter();

	const { control, handleSubmit, isSubmitting, isValid } =
		useCreateSecureNoteForm({
			isEmergency: true,
			onSuccess: () => router.back(),
		});
	return (
		<CreateEmergencySafeNoteView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
		/>
	);
};

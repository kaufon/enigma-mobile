import { View } from "@/src/ui/widgets/global/components/Themed";
import CreateSafeNoteFormView from "@/src/ui/widgets/vault/screens/safe-notes/create-safe-note-form/create-safe-note-form-view";
import { useCreateSecureNoteForm } from "@/src/ui/widgets/vault/screens/safe-notes/create-safe-note-form/use-create-safe-note-form";
import { Stack, useRouter } from "expo-router";

export const CreateSafeNoteScreen = () => {
	const router = useRouter();
	const { control, isSubmitting, isValid, handleSubmit } =
		useCreateSecureNoteForm({ onSuccess: () => router.back() });
	return (
		<View>
			<Stack.Screen options={{ title: "Nova Nota Segura" }} />
			<CreateSafeNoteFormView
				control={control}
				isSubmitting={isSubmitting}
				isValid={isValid}
				handleSubmit={handleSubmit}
			/>
		</View>
	);
};

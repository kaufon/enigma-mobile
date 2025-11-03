import type { FolderDto } from "@/src/core/dtos/folder";
import { View } from "@/src/ui/widgets/global/components/Themed";
import CreateSafeNoteFormView from "@/src/ui/widgets/vault/screens/safe-notes/create-safe-note-form/create-safe-note-form-view";
import { Stack } from "expo-router";

type Props = {
	control: any;
	handleSubmit: VoidFunction;
	isSubmitting: boolean;
	isValid: boolean;
};

export const CreateEmergencySafeNoteView = ({
	control,
	handleSubmit,
	isSubmitting,
	isValid,
}: Props) => {
	return (
		<View className="flex-1 bg-background-500">
			<Stack.Screen options={{ title: "Nova Nota de Emergência" }} />
			<CreateSafeNoteFormView
				control={control}
				handleSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				isValid={isValid}
			/>
		</View>
	);
};

import {  View } from "@/src/ui/widgets/global/components/Themed";
import { SafeNoteList } from "@/src/ui/widgets/vault/screens/safe-notes/safe-notes-list";
import { Stack } from "expo-router";

export const SafeNoteScreenView = () => {
	return (
		<View className="flex-1 ">
			<Stack.Screen options={{ title: "Nota seguras" }} />
			<SafeNoteList />
		</View>
	);
};

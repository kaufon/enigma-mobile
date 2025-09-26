import { EditFolderFormScreen } from "@/src/ui/widgets/vault/screens/folders/edit-folder-form";
import { useLocalSearchParams } from "expo-router";

export default function EditFolderForm(){
  const { id } = useLocalSearchParams<{ id: string }>();
  return <EditFolderFormScreen id={id} />
}

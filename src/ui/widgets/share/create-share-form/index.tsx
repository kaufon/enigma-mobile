import { CreateShareFormView } from "@/src/ui/widgets/share/create-share-form/create-share-form-view";
import { useCreateShareForm } from "@/src/ui/widgets/share/create-share-form/use-create-share-form";
import { useRouter } from "expo-router";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	credentialId: string;
};

export const CreateShareForm = ({ isOpen, onClose, credentialId }: Props) => {
  const router = useRouter()
  const onSucess = () => {
    onClose()
    router.push("/share")
  }
	const { control, handleSubmit, isSubmitting, isValid, generatedLink } =
		useCreateShareForm(credentialId,onSucess);
	return (
		<CreateShareFormView
			control={control}
			handleSubmit={handleSubmit}
			isOpen={isOpen}
			onClose={onClose}
			isSubmitting={isSubmitting}
			isValid={isValid}
			generatedLink={generatedLink}
		/>
	);
};

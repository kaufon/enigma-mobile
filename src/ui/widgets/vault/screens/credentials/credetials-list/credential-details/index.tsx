import { CredentialDto } from "@/src/core/dtos/credentials";
import { CredentialDetailsView } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/credential-details/credential-details-view";
import { useCredentialDetailsViewModel } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/credential-details/use-credetial-details-view-mode";

type Props = {
	id: string;
};

export const CredentialDetails = ({ id }: Props) => {
	const { isLoading, credential, folder } = useCredentialDetailsViewModel(id);
	return (
		<CredentialDetailsView
			id={id}
			isLoading={isLoading}
			folderName={folder?.name || ""}
			credential={credential as CredentialDto}
		/>
	);
};

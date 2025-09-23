import { CredentialsListView } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/credentials-list-view";
import { useCredentialsListViewModel } from "@/src/ui/widgets/vault/screens/credentials/credetials-list/use-credentials-list";

export const CredentialsList = () => {
	const {
		credentials,
		loadCredentials,
		isLoading,
		handleSelectCredential,
		handleDeleteCredential,
		handleEditCredential,
	} = useCredentialsListViewModel();
	return (
		<CredentialsListView
			credentials={credentials}
			isLoading={isLoading}
			onSucess={loadCredentials}
			onSelectCredential={handleSelectCredential}
			onDeleteCredential={handleDeleteCredential}
			onEditCredential={handleEditCredential}
		/>
	);
};

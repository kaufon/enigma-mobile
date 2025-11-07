import { ImportVaultScreenView } from "@/src/ui/widgets/configuration/screens/vault/import-vault/import-vault-screen-view";
import { useImportVaultForm } from "@/src/ui/widgets/configuration/screens/vault/import-vault/use-import-vault-screen";

export const ImportVaultScreen = () => {
	const {
		control,
		handleSubmit,
		isSubmitting,
		isValid,
		fileName,
		handlePickDocument,
	} = useImportVaultForm();
	return (
		<ImportVaultScreenView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
			fileName={fileName}
			handlePickDocument={handlePickDocument}
		/>
	);
};

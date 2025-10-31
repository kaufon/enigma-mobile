import { ExportVaultScreenView } from "@/src/ui/widgets/configuration/screens/vault/export-vault/export-vault-screen-view";
import { useExportVaultScreen } from "@/src/ui/widgets/configuration/screens/vault/export-vault/use-export-vault-screen";

export const ExportVaultScreen = () => {
	const { control, handleSubmit, isSubmitting, isValid } =
		useExportVaultScreen();
	return (
		<ExportVaultScreenView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
		/>
	);
};

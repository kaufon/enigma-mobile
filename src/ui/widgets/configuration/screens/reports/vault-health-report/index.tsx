import { useVaultHealthReport } from "@/src/ui/widgets/configuration/screens/reports/vault-health-report/use-vault-healt-report";
import { VaultHealthReportView } from "@/src/ui/widgets/configuration/screens/reports/vault-health-report/vault-health-report-view";

export const VaultHealtReportScreen = () => {
	const { handleGenerateReport, isSubmitting } = useVaultHealthReport();
	return (
		<VaultHealthReportView
			handleGenerateReport={handleGenerateReport}
			isSubmitting={isSubmitting}
		/>
	);
};

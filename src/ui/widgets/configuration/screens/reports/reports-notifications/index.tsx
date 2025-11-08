import { ReportsNotificationScreenView } from "@/src/ui/widgets/configuration/screens/reports/reports-notifications/reports-notifications-view";
import { useReportSettingsForm } from "@/src/ui/widgets/configuration/screens/reports/reports-notifications/use-reports-notifications";

export const ReportsNotificationScreen = () => {
	const { control, handleSubmit, isSubmitting, isValid } =
		useReportSettingsForm();
	return (
		<ReportsNotificationScreenView
			control={control}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isValid={isValid}
		/>
	);
};

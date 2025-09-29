import AutoLockScreenView from "@/src/ui/widgets/configuration/screens/security/autolock-timeout/autolock-timeout-view";
import { useAutoLockSettings } from "@/src/ui/widgets/configuration/screens/security/autolock-timeout/use-autolock-timeout";

export const AutoLockScreen = () => {
	const { currentTimeout, handleUpdateTime } = useAutoLockSettings();
	return (
		<AutoLockScreenView
			currentTimeout={currentTimeout}
			handleUpdateTime={handleUpdateTime}
		/>
	);
};

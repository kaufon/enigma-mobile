import { useEmergencyVault } from "@/src/ui/widgets/emergency-vault/contexts/emergency-vault-context";
import { EmergencyVaultScreenView } from "@/src/ui/widgets/emergency-vault/screens/emergency-vault-screen/emergency-vault-screen-view";

export const EmergencyVaultScreen = () => {
	const { isUnlocked, isLoading } = useEmergencyVault();
	return (
		<EmergencyVaultScreenView isLoading={isLoading} isUnlocked={isUnlocked} />
	);
};

import { EmergencyVaultLoginScreenView } from "@/src/ui/widgets/emergency-vault/screens/emergency-vault-login-screen/emergency-vault-login-screen-view";
import { useEmergencyLoginForm } from "@/src/ui/widgets/emergency-vault/screens/emergency-vault-login-screen/use-emergency-vault-login-screen";

export const EmergencyVaultLoginScreen = () => {
const { control, handleSubmit, isSubmitting } = useEmergencyLoginForm();
  return <EmergencyVaultLoginScreenView control={control} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}

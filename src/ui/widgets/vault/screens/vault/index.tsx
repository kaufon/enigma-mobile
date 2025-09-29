import { useVaultScreenViewModel } from "@/src/ui/widgets/vault/screens/vault/use-vault-screen";
import { VaultScreenView } from "@/src/ui/widgets/vault/screens/vault/vault-screen-view";

export const VaultScreen = () => {
  const {folders,isLoading} = useVaultScreenViewModel()
  return <VaultScreenView folders={folders} isLoading={isLoading} />;
}
